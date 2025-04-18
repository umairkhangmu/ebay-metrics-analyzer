-- Initialize database tables for eBay Metrics Analyzer

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  subscription_status TEXT DEFAULT 'free',
  ebay_token TEXT,
  ebay_refresh_token TEXT,
  ebay_token_expiry TIMESTAMP
);

-- Sellers table
CREATE TABLE IF NOT EXISTS sellers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  ebay_seller_id TEXT UNIQUE NOT NULL,
  seller_name TEXT NOT NULL,
  country TEXT,
  joined_date TIMESTAMP,
  last_synced TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Items table
CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  seller_id INTEGER NOT NULL,
  ebay_item_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT,
  price REAL,
  quantity INTEGER,
  condition TEXT,
  created_date TIMESTAMP,
  last_updated TIMESTAMP,
  FOREIGN KEY (seller_id) REFERENCES sellers(id) ON DELETE CASCADE
);

-- Sales table
CREATE TABLE IF NOT EXISTS sales (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  item_id INTEGER NOT NULL,
  order_id TEXT NOT NULL,
  sale_date TIMESTAMP NOT NULL,
  quantity INTEGER NOT NULL,
  sale_price REAL NOT NULL,
  buyer_id TEXT,
  shipping_cost REAL,
  tax REAL,
  total_amount REAL NOT NULL,
  FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
);

-- Metrics table
CREATE TABLE IF NOT EXISTS metrics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  seller_id INTEGER NOT NULL,
  date DATE NOT NULL,
  total_sales INTEGER DEFAULT 0,
  total_revenue REAL DEFAULT 0,
  total_items_sold INTEGER DEFAULT 0,
  average_sale_price REAL DEFAULT 0,
  conversion_rate REAL DEFAULT 0,
  page_views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  FOREIGN KEY (seller_id) REFERENCES sellers(id) ON DELETE CASCADE,
  UNIQUE(seller_id, date)
);

-- API Logs table
CREATE TABLE IF NOT EXISTS api_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  api_endpoint TEXT NOT NULL,
  request_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  response_status INTEGER,
  response_time_ms INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_sales_sale_date ON sales(sale_date);
CREATE INDEX IF NOT EXISTS idx_items_seller_id ON items(seller_id);
CREATE INDEX IF NOT EXISTS idx_metrics_seller_date ON metrics(seller_id, date);
