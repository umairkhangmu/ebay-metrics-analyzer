import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database';
import { D1Database } from '@cloudflare/workers-types';
import * as jwt from 'jsonwebtoken';

// Secret key for JWT signing
const JWT_SECRET = process.env.JWT_SECRET || 'ebay-metrics-analyzer-secret-key';

// eBay OAuth configuration
const EBAY_CLIENT_ID = process.env.EBAY_CLIENT_ID || 'your-ebay-client-id';
const EBAY_CLIENT_SECRET = process.env.EBAY_CLIENT_SECRET || 'your-ebay-client-secret';
const EBAY_REDIRECT_URI = process.env.EBAY_REDIRECT_URI || 'https://your-app-url.com/api/auth/ebay/callback';

// eBay OAuth endpoints
const EBAY_AUTH_URL = 'https://auth.ebay.com/oauth2/authorize';
const EBAY_TOKEN_URL = 'https://api.ebay.com/identity/v1/oauth2/token';

// Handler for initiating eBay OAuth flow
export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    
    // Validate required parameters
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    
    // Generate state parameter to prevent CSRF
    const state = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
    
    // Construct eBay authorization URL
    const authUrl = new URL(EBAY_AUTH_URL);
    authUrl.searchParams.append('client_id', EBAY_CLIENT_ID);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('redirect_uri', EBAY_REDIRECT_URI);
    authUrl.searchParams.append('scope', 'https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/sell.analytics.readonly https://api.ebay.com/oauth/api_scope/sell.inventory https://api.ebay.com/oauth/api_scope/sell.fulfillment');
    authUrl.searchParams.append('state', state);
    
    // Return the authorization URL
    return NextResponse.json({
      authUrl: authUrl.toString(),
      state,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error initiating eBay OAuth flow:', error);
    return NextResponse.json({ error: 'Failed to initiate eBay OAuth flow' }, { status: 500 });
  }
}
