import { NextRequest, NextResponse } from 'next/server';
import { getTrafficReport, getSellerStandardsProfiles, getCustomerServiceMetric } from '@/lib/ebay-api';
import { DatabaseService } from '@/lib/database';
import { D1Database } from '@cloudflare/workers-types';

// Handler for getting seller metrics
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
    
    // Format date range for eBay API
    const dateRange = formatDateRange(startDate, endDate);
    
    // Get seller metrics from eBay API
    const trafficReportPromise = getTrafficReport(token, {
      dimension: 'DAY',
      metric: [
        'LISTING_IMPRESSION_TOTAL',
        'LISTING_VIEWS_TOTAL',
        'TRANSACTION',
        'SALES_CONVERSION_RATE'
      ],
      filter: {
        date_range: dateRange,
        marketplace_ids: 'EBAY_US'
      }
    });
    
    const sellerStandardsPromise = getSellerStandardsProfiles(token);
    
    // Wait for all API calls to complete
    const [trafficReport, sellerStandards] = await Promise.all([
      trafficReportPromise,
      sellerStandardsPromise
    ]);
    
    // Process and return the combined data
    return NextResponse.json({
      sellerId: params.sellerId,
      period: parseInt(period),
      trafficReport,
      sellerStandards,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching seller metrics:', error);
    return NextResponse.json({ error: 'Failed to fetch seller metrics' }, { status: 500 });
  }
}

// Helper function to format date range for eBay API
function formatDateRange(startDate: Date, endDate: Date): string {
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0].replace(/-/g, '');
  };
  
  return `[${formatDate(startDate)}..${formatDate(endDate)}]`;
}
