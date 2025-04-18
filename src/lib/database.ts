import { D1Database } from '@cloudflare/workers-types';

/**
 * Database service for eBay Metrics Analyzer
 * Provides functions to interact with the D1 database
 */

export interface User {
  id?: number;
  email: string;
  password_hash: string;
  created_at?: string;
  last_login?: string;
  subscription_status?: string;
  ebay_token?: string;
  ebay_refresh_token?: string;
  ebay_token_expiry?: string;
}

export interface Seller {
  id?: number;
  user_id: number;
  ebay_seller_id: string;
  seller_name: string;
  country?: string;
  joined_date?: string;
  last_synced?: string;
}

export interface Item {
  id?: number;
  seller_id: number;
  ebay_item_id: string;
  title: string;
  category?: string;
  price?: number;
  quantity?: number;
  condition?: string;
  created_date?: string;
  last_updated?: string;
}

export interface Sale {
  id?: number;
  item_id: number;
  order_id: string;
  sale_date: string;
  quantity: number;
  sale_price: number;
  buyer_id?: string;
  shipping_cost?: number;
  tax?: number;
  total_amount: number;
}

export interface Metric {
  id?: number;
  seller_id: number;
  date: string;
  total_sales?: number;
  total_revenue?: number;
  total_items_sold?: number;
  average_sale_price?: number;
  conversion_rate?: number;
  page_views?: number;
  unique_visitors?: number;
}

export class DatabaseService {
  private db: D1Database;

  constructor(db: D1Database) {
    this.db = db;
  }

  // User methods
  async createUser(user: User): Promise<number> {
    const result = await this.db.prepare(
      'INSERT INTO users (email, password_hash, subscription_status) VALUES (?, ?, ?)'
    )
    .bind(user.email, user.password_hash, user.subscription_status || 'free')
    .run();
    
    return result.meta.last_row_id as number;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const result = await this.db.prepare(
      'SELECT * FROM users WHERE email = ?'
    )
    .bind(email)
    .first<User>();
    
    return result || null;
  }

  async updateUserToken(userId: number, token: string, refreshToken: string, expiryDate: string): Promise<void> {
    await this.db.prepare(
      'UPDATE users SET ebay_token = ?, ebay_refresh_token = ?, ebay_token_expiry = ? WHERE id = ?'
    )
    .bind(token, refreshToken, expiryDate, userId)
    .run();
  }

  // Seller methods
  async createSeller(seller: Seller): Promise<number> {
    const result = await this.db.prepare(
      'INSERT INTO sellers (user_id, ebay_seller_id, seller_name, country, joined_date) VALUES (?, ?, ?, ?, ?)'
    )
    .bind(seller.user_id, seller.ebay_seller_id, seller.seller_name, seller.country || null, seller.joined_date || null)
    .run();
    
    return result.meta.last_row_id as number;
  }

  async getSellersByUserId(userId: number): Promise<Seller[]> {
    const result = await this.db.prepare(
      'SELECT * FROM sellers WHERE user_id = ?'
    )
    .bind(userId)
    .all<Seller>();
    
    return result.results;
  }

  // Item methods
  async createItem(item: Item): Promise<number> {
    const result = await this.db.prepare(
      'INSERT INTO items (seller_id, ebay_item_id, title, category, price, quantity, condition, created_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    )
    .bind(
      item.seller_id, 
      item.ebay_item_id, 
      item.title, 
      item.category || null, 
      item.price || null, 
      item.quantity || null, 
      item.condition || null, 
      item.created_date || null
    )
    .run();
    
    return result.meta.last_row_id as number;
  }

  async getItemsBySellerId(sellerId: number, limit = 100, offset = 0): Promise<Item[]> {
    const result = await this.db.prepare(
      'SELECT * FROM items WHERE seller_id = ? LIMIT ? OFFSET ?'
    )
    .bind(sellerId, limit, offset)
    .all<Item>();
    
    return result.results;
  }

  // Sale methods
  async createSale(sale: Sale): Promise<number> {
    const result = await this.db.prepare(
      'INSERT INTO sales (item_id, order_id, sale_date, quantity, sale_price, buyer_id, shipping_cost, tax, total_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    )
    .bind(
      sale.item_id,
      sale.order_id,
      sale.sale_date,
      sale.quantity,
      sale.sale_price,
      sale.buyer_id || null,
      sale.shipping_cost || null,
      sale.tax || null,
      sale.total_amount
    )
    .run();
    
    return result.meta.last_row_id as number;
  }

  async getSalesByItemId(itemId: number): Promise<Sale[]> {
    const result = await this.db.prepare(
      'SELECT * FROM sales WHERE item_id = ? ORDER BY sale_date DESC'
    )
    .bind(itemId)
    .all<Sale>();
    
    return result.results;
  }

  async getSalesByDateRange(sellerId: number, startDate: string, endDate: string): Promise<Sale[]> {
    const result = await this.db.prepare(
      `SELECT s.* FROM sales s
       JOIN items i ON s.item_id = i.id
       WHERE i.seller_id = ? AND s.sale_date BETWEEN ? AND ?
       ORDER BY s.sale_date DESC`
    )
    .bind(sellerId, startDate, endDate)
    .all<Sale>();
    
    return result.results;
  }

  // Metric methods
  async saveMetrics(metric: Metric): Promise<number> {
    const result = await this.db.prepare(
      `INSERT INTO metrics 
       (seller_id, date, total_sales, total_revenue, total_items_sold, average_sale_price, conversion_rate, page_views, unique_visitors)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(seller_id, date) DO UPDATE SET
       total_sales = excluded.total_sales,
       total_revenue = excluded.total_revenue,
       total_items_sold = excluded.total_items_sold,
       average_sale_price = excluded.average_sale_price,
       conversion_rate = excluded.conversion_rate,
       page_views = excluded.page_views,
       unique_visitors = excluded.unique_visitors`
    )
    .bind(
      metric.seller_id,
      metric.date,
      metric.total_sales || 0,
      metric.total_revenue || 0,
      metric.total_items_sold || 0,
      metric.average_sale_price || 0,
      metric.conversion_rate || 0,
      metric.page_views || 0,
      metric.unique_visitors || 0
    )
    .run();
    
    return result.meta.last_row_id as number;
  }

  async getMetricsByDateRange(sellerId: number, startDate: string, endDate: string): Promise<Metric[]> {
    const result = await this.db.prepare(
      'SELECT * FROM metrics WHERE seller_id = ? AND date BETWEEN ? AND ? ORDER BY date'
    )
    .bind(sellerId, startDate, endDate)
    .all<Metric>();
    
    return result.results;
  }

  // Summary methods
  async getSellerSummary(sellerId: number, days: number = 30): Promise<any> {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const metrics = await this.getMetricsByDateRange(sellerId, startDate, endDate);
    const sales = await this.getSalesByDateRange(sellerId, startDate, endDate);
    
    // Calculate totals
    const totalSales = sales.length;
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.total_amount, 0);
    const totalItemsSold = sales.reduce((sum, sale) => sum + sale.quantity, 0);
    
    // Get top selling items
    const itemSales = new Map<number, { quantity: number, revenue: number }>();
    for (const sale of sales) {
      if (!itemSales.has(sale.item_id)) {
        itemSales.set(sale.item_id, { quantity: 0, revenue: 0 });
      }
      const current = itemSales.get(sale.item_id)!;
      current.quantity += sale.quantity;
      current.revenue += sale.total_amount;
      itemSales.set(sale.item_id, current);
    }
    
    // Convert to array and sort by revenue
    const topItems = Array.from(itemSales.entries())
      .map(([itemId, data]) => ({ itemId, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);
    
    return {
      period: { startDate, endDate, days },
      totals: { totalSales, totalRevenue, totalItemsSold },
      topItems,
      metrics
    };
  }
}
