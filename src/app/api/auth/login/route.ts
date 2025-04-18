import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database';
import { D1Database } from '@cloudflare/workers-types';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

// Secret key for JWT signing
const JWT_SECRET = process.env.JWT_SECRET || 'ebay-metrics-analyzer-secret-key';

// Handler for user login
export async function POST(request: NextRequest) {
  try {
    // Get request body
    const body = await request.json();
    const { email, password } = body;
    
    // Validate required parameters
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }
    
    // Get database connection
    const db = request.cf?.D1 as unknown as D1Database;
    if (!db) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }
    
    const dbService = new DatabaseService(db);
    
    // Check if user exists
    const user = await dbService.getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
    
    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    
    // Return success response
    return NextResponse.json({
      success: true,
      userId: user.id,
      email: user.email,
      token,
      ebayConnected: !!user.ebay_token,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    return NextResponse.json({ error: 'Failed to log in' }, { status: 500 });
  }
}
