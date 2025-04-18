import { NextRequest, NextResponse } from 'next/server';
import { getInventoryItems, getInventoryItem } from '@/lib/ebay-api';
import { DatabaseService } from '@/lib/database';
import { D1Database } from '@cloudflare/workers-types';

// Handler for getting inventory data
export async function GET(request: NextRequest, { params }: { params: { sellerId: string } }) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    // Validate required parameters
    if (!token) {
      return NextResponse.json({ error: 'eBay API token is required' }, { status: 400 });
    }
    
    // Get inventory items from eBay API
    const inventoryResponse = await getInventoryItems(token, limit, offset);
    
    // Process inventory data
    const inventoryItems = inventoryResponse.inventoryItems || [];
    const processedItems = processInventoryData(inventoryItems);
    
    // Return the processed data
    return NextResponse.json({
      sellerId: params.sellerId,
      total: inventoryResponse.total || inventoryItems.length,
      limit,
      offset,
      items: processedItems,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching inventory data:', error);
    return NextResponse.json({ error: 'Failed to fetch inventory data' }, { status: 500 });
  }
}

// Handler for getting a specific inventory item
export async function POST(request: NextRequest, { params }: { params: { sellerId: string } }) {
  try {
    // Get request body
    const body = await request.json();
    const { token, items } = body;
    
    // Validate required parameters
    if (!token || !items || !Array.isArray(items)) {
      return NextResponse.json({ error: 'eBay API token and items array are required' }, { status: 400 });
    }
    
    // Update inventory items in database
    const db = request.cf?.D1 as unknown as D1Database;
    if (!db) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
    
    const dbService = new DatabaseService(db);
    const sellerId = parseInt(params.sellerId);
    
    // Process each item
    const results = await Promise.all(items.map(async (item) => {
      try {
        // Create or update item in database
        const dbItem = {
          seller_id: sellerId,
          ebay_item_id: item.sku,
          title: item.title,
          category: item.category,
          price: parseFloat(item.price),
          quantity: item.quantity,
          condition: item.condition,
          last_updated: new Date().toISOString()
        };
        
        // Check if item exists
        const existingItems = await dbService.getItemsBySellerId(sellerId);
        const existingItem = existingItems.find(i => i.ebay_item_id === item.sku);
        
        let itemId;
        if (existingItem) {
          // Update existing item
          itemId = existingItem.id;
          // Update logic would go here
        } else {
          // Create new item
          itemId = await dbService.createItem(dbItem);
        }
        
        return {
          sku: item.sku,
          success: true,
          itemId
        };
      } catch (itemError) {
        console.error(`Error processing item ${item.sku}:`, itemError);
        return {
          sku: item.sku,
          success: false,
          error: 'Failed to process item'
        };
      }
    }));
    
    return NextResponse.json({
      sellerId: params.sellerId,
      results,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating inventory data:', error);
    return NextResponse.json({ error: 'Failed to update inventory data' }, { status: 500 });
  }
}

// Process inventory items into a standardized format
function processInventoryData(items: any[]) {
  return items.map(item => {
    const sku = item.sku;
    const inventoryItem = item.inventoryItem;
    
    // Extract price information
    let price = 0;
    if (inventoryItem.product && inventoryItem.product.aspects && inventoryItem.product.aspects.price) {
      price = parseFloat(inventoryItem.product.aspects.price[0]);
    }
    
    // Extract quantity information
    let quantity = 0;
    if (inventoryItem.availability && inventoryItem.availability.availableQuantity) {
      quantity = parseInt(inventoryItem.availability.availableQuantity);
    }
    
    return {
      sku,
      title: inventoryItem.title || '',
      description: inventoryItem.description || '',
      condition: inventoryItem.condition || 'New',
      price,
      quantity,
      category: inventoryItem.categoryId || '',
      imageUrls: inventoryItem.imageUrls || [],
      status: quantity > 0 ? (quantity < 5 ? 'Low Stock' : 'In Stock') : 'Out of Stock'
    };
  });
}
