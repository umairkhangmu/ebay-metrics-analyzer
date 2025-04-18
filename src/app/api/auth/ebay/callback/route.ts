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

// eBay OAuth token endpoint
const EBAY_TOKEN_URL = 'https://api.ebay.com/identity/v1/oauth2/token';

// Handler for eBay OAuth callback
export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    
    // Validate required parameters
    if (!code || !state) {
      return NextResponse.json({ error: 'Authorization code and state are required' }, { status: 400 });
    }
    
    // Verify state parameter to prevent CSRF
    let decodedState;
    try {
      decodedState = jwt.verify(state, JWT_SECRET) as { userId: string };
    } catch (error) {
      return NextResponse.json({ error: 'Invalid state parameter' }, { status: 400 });
    }
    
    const userId = decodedState.userId;
    
    // Exchange authorization code for access token
    const tokenResponse = await fetch(EBAY_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${EBAY_CLIENT_ID}:${EBAY_CLIENT_SECRET}`).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: EBAY_REDIRECT_URI
      })
    });
    
    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error('eBay token exchange error:', errorData);
      return NextResponse.json({ error: 'Failed to exchange authorization code for token' }, { status: 500 });
    }
    
    const tokenData = await tokenResponse.json();
    const { access_token, refresh_token, expires_in } = tokenData;
    
    // Calculate token expiry date
    const expiryDate = new Date();
    expiryDate.setSeconds(expiryDate.getSeconds() + expires_in);
    
    // Get database connection
    const db = request.cf?.D1 as unknown as D1Database;
    if (!db) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
    
    const dbService = new DatabaseService(db);
    
    // Update user with eBay tokens
    await dbService.updateUserToken(
      parseInt(userId),
      access_token,
      refresh_token,
      expiryDate.toISOString()
    );
    
    // Redirect to frontend with success message
    const redirectUrl = new URL('/settings', request.nextUrl.origin);
    redirectUrl.searchParams.append('ebayConnected', 'true');
    
    return NextResponse.redirect(redirectUrl.toString());
  } catch (error) {
    console.error('Error handling eBay OAuth callback:', error);
    
    // Redirect to frontend with error message
    const redirectUrl = new URL('/settings', request.nextUrl.origin);
    redirectUrl.searchParams.append('error', 'Failed to connect eBay account');
    
    return NextResponse.redirect(redirectUrl.toString());
  }
}
