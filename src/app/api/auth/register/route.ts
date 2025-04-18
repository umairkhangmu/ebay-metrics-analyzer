import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService, User } from '@/lib/database';
import { D1Database } from '@cloudflare/workers-types';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

// Secret key for JWT signing
const JWT_SECRET = process.env.JWT_SECRET || 'ebay-metrics-analyzer-secret-key';

// Handler for user registration
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
    
    // Check if user already exists
    const existingUser = await dbService.getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user
    const userId = await dbService.createUser({
      email,
      password_hash: hashedPassword,
      subscription_status: 'free'
    });
    
    // Generate JWT token
    const token = jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '7d' });
    
    // Return success response
    return NextResponse.json({
      success: true,
      userId,
      email,
      token,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
  }
}
