import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database';
import { D1Database } from '@cloudflare/workers-types';
import { calculateSellerMetrics } from '@/lib/ebay-api';

// Handler for generating analytics data
export async function GET(request: NextRequest, { params }: { params: { sellerId: string } }) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get('period') || '30'; // Default to 30 days
    
    // Get database connection
    const db = request.cf?.D1 as unknown as D1Database;
    if (!db) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
    
    const dbService = new DatabaseService(db);
    const sellerId = parseInt(params.sellerId);
    
    // Calculate date range
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - parseInt(period) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    // Get seller summary from database
    const summary = await dbService.getSellerSummary(sellerId, parseInt(period));
    
    // Return the analytics data
    return NextResponse.json({
      sellerId,
      period: parseInt(period),
      summary,
      dateRange: {
        startDate,
        endDate
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error generating analytics:', error);
    return NextResponse.json({ error: 'Failed to generate analytics' }, { status: 500 });
  }
}
