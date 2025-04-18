/**
 * eBay API Integration Service
 * 
 * This module provides functions to interact with eBay's APIs for seller metrics analysis.
 */

import axios from 'axios';

// API Base URLs
const ANALYTICS_API_URL = 'https://api.ebay.com/sell/analytics/v1';
const INVENTORY_API_URL = 'https://api.ebay.com/sell/inventory/v1';
const FULFILLMENT_API_URL = 'https://api.ebay.com/sell/fulfillment/v1';

// API Client with authentication
const createApiClient = (token: string) => {
  const client = axios.create({
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  // Add response interceptor for error handling
  client.interceptors.response.use(
    response => response,
    error => {
      console.error('eBay API Error:', error.response?.data || error.message);
      return Promise.reject(error);
    }
  );
  
  return client;
};

/**
 * Analytics API Functions
 */

// Get traffic report for seller listings
export const getTrafficReport = async (token: string, params: {
  dimension: 'DAY' | 'LISTING',
  metric: string[],
  filter: {
    date_range: string,
    listing_ids?: string[],
    marketplace_ids: string
  }
}) => {
  const client = createApiClient(token);
  const response = await client.get(`${ANALYTICS_API_URL}/traffic_report`, { params });
  return response.data;
};

// Get seller standards profile
export const getSellerStandardsProfiles = async (token: string) => {
  const client = createApiClient(token);
  const response = await client.get(`${ANALYTICS_API_URL}/seller_standards_profile`);
  return response.data;
};

// Get customer service metrics
export const getCustomerServiceMetric = async (token: string, params: {
  evaluation_type: string,
  evaluation_marketplace_id: string,
  customer_service_metric_type: string
}) => {
  const client = createApiClient(token);
  const response = await client.get(`${ANALYTICS_API_URL}/customer_service_metric`, { params });
  return response.data;
};

/**
 * Inventory API Functions
 */

// Get inventory items
export const getInventoryItems = async (token: string, limit = 100, offset = 0) => {
  const client = createApiClient(token);
  const response = await client.get(`${INVENTORY_API_URL}/inventory_item`, { 
    params: { limit, offset } 
  });
  return response.data;
};

// Get specific inventory item
export const getInventoryItem = async (token: string, sku: string) => {
  const client = createApiClient(token);
  const response = await client.get(`${INVENTORY_API_URL}/inventory_item/${sku}`);
  return response.data;
};

/**
 * Fulfillment API Functions
 */

// Get orders
export const getOrders = async (token: string, params: {
  filter?: string,
  orderIds?: string[],
  fieldGroups?: string[]
} = {}) => {
  const client = createApiClient(token);
  const response = await client.get(`${FULFILLMENT_API_URL}/order`, { params });
  return response.data;
};

// Get specific order
export const getOrder = async (token: string, orderId: string) => {
  const client = createApiClient(token);
  const response = await client.get(`${FULFILLMENT_API_URL}/order/${orderId}`);
  return response.data;
};

/**
 * Helper Functions
 */

// Format date range for eBay API
export const formatDateRange = (startDate: Date, endDate: Date): string => {
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0].replace(/-/g, '');
  };
  
  return `[${formatDate(startDate)}..${formatDate(endDate)}]`;
};

// Calculate metrics for a seller
export const calculateSellerMetrics = (orders: any[]) => {
  if (!orders.length) return null;
  
  const totalSales = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.totalAmount), 0);
  const totalItemsSold = orders.reduce((sum, order) => {
    return sum + order.lineItems.reduce((itemSum: number, item: any) => itemSum + item.quantity, 0);
  }, 0);
  
  return {
    totalSales,
    totalRevenue,
    totalItemsSold,
    averageSalePrice: totalRevenue / totalItemsSold
  };
};
