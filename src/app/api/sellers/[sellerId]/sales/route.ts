import { NextRequest, NextResponse } from 'next/server';
import { getOrders } from '@/lib/ebay-api';
import { DatabaseService } from '@/lib/database';
import { D1Database } from '@cloudflare/workers-types';

// Handler for getting sales data
export async function GET(request: NextRequest, { params }: { params: { sellerId: string } }) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get('period') || '30'; // Default to 30 days
    const token = searchParams.get('token');
    
    // Validate required parameters
    if (!token) {
      return NextResponse.json({ error: 'eBay API token is required' }, { status: 400 });
    }
    
    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));
    
    // Format date range for eBay API filter
    const filter = `creationdate:[${startDate.toISOString()}..${endDate.toISOString()}]`;
    
    // Get orders from eBay API
    const ordersResponse = await getOrders(token, {
      filter,
      fieldGroups: ['TAX_BREAKDOWN']
    });
    
    // Process orders to extract sales data
    const salesData = processSalesData(ordersResponse.orders || []);
    
    // Return the processed data
    return NextResponse.json({
      sellerId: params.sellerId,
      period: parseInt(period),
      salesSummary: salesData.summary,
      salesByDay: salesData.byDay,
      salesByItem: salesData.byItem,
      totalOrders: ordersResponse.total,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching sales data:', error);
    return NextResponse.json({ error: 'Failed to fetch sales data' }, { status: 500 });
  }
}

// Process orders into sales data
function processSalesData(orders: any[]) {
  // Initialize data structures
  const salesByDay: Record<string, any> = {};
  const salesByItem: Record<string, any> = {};
  let totalRevenue = 0;
  let totalItemsSold = 0;
  
  // Process each order
  orders.forEach(order => {
    // Extract order date (YYYY-MM-DD)
    const orderDate = order.creationDate.split('T')[0];
    
    // Initialize day data if not exists
    if (!salesByDay[orderDate]) {
      salesByDay[orderDate] = {
        date: orderDate,
        orders: 0,
        revenue: 0,
        itemsSold: 0
      };
    }
    
    // Calculate order total
    const orderTotal = parseFloat(order.totalFeeBasisAmount.value);
    totalRevenue += orderTotal;
    
    // Update sales by day
    salesByDay[orderDate].orders += 1;
    salesByDay[orderDate].revenue += orderTotal;
    
    // Process line items
    order.lineItems.forEach((item: any) => {
      const itemId = item.itemId;
      const quantity = item.quantity;
      const itemPrice = parseFloat(item.lineItemCost.value);
      
      // Update total items sold
      totalItemsSold += quantity;
      salesByDay[orderDate].itemsSold += quantity;
      
      // Initialize item data if not exists
      if (!salesByItem[itemId]) {
        salesByItem[itemId] = {
          itemId,
          title: item.title,
          quantity: 0,
          revenue: 0
        };
      }
      
      // Update sales by item
      salesByItem[itemId].quantity += quantity;
      salesByItem[itemId].revenue += (itemPrice * quantity);
    });
  });
  
  // Convert to arrays for easier consumption
  const salesByDayArray = Object.values(salesByDay).sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  const salesByItemArray = Object.values(salesByItem).sort((a, b) => 
    b.revenue - a.revenue
  );
  
  // Calculate average order value
  const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
  
  return {
    summary: {
      totalOrders: orders.length,
      totalRevenue,
      totalItemsSold,
      averageOrderValue
    },
    byDay: salesByDayArray,
    byItem: salesByItemArray
  };
}
