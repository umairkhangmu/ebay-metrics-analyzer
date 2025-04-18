import Header from '@/components/header';
import { Package, AlertCircle, CheckCircle, RefreshCw, ArrowDown, ArrowUp } from 'lucide-react';

export default function Inventory() {
  return (
    <div>
      <Header 
        title="Inventory Tracker" 
        subtitle="Monitor and manage your eBay inventory" 
      />
      
      {/* Inventory Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search inventory by title, SKU, or ID..."
              className="w-full rounded-md border border-gray-300 px-4 py-2"
            />
          </div>
          <select className="rounded-md border border-gray-300 px-3 py-2 text-sm">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Home & Garden</option>
            <option>Clothing</option>
            <option>Toys & Games</option>
          </select>
          <select className="rounded-md border border-gray-300 px-3 py-2 text-sm">
            <option>All Status</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
          <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 text-sm">
            Search
          </button>
        </div>
      </div>
      
      {/* Inventory Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard 
          title="Total Items" 
          value="124" 
          subtitle="in inventory" 
          icon={<Package className="h-8 w-8 text-blue-500" />} 
        />
        <StatCard 
          title="Low Stock" 
          value="12" 
          subtitle="items below threshold" 
          icon={<AlertCircle className="h-8 w-8 text-amber-500" />} 
        />
        <StatCard 
          title="Out of Stock" 
          value="5" 
          subtitle="items to restock" 
          icon={<RefreshCw className="h-8 w-8 text-red-500" />} 
        />
        <StatCard 
          title="Healthy Stock" 
          value="107" 
          subtitle="items with good levels" 
          icon={<CheckCircle className="h-8 w-8 text-green-500" />} 
        />
      </div>
      
      {/* Inventory Table */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Inventory Items</h2>
          <div className="flex space-x-2">
            <button className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">
              Export
            </button>
            <button className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">
              Add Item
            </button>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales Trend</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { name: "Wireless Earbuds", sku: "SKU-1001", category: "Electronics", price: "$59.99", quantity: 24, status: "In Stock", trend: "up" },
                { name: "Smart Watch", sku: "SKU-1002", category: "Electronics", price: "$89.99", quantity: 18, status: "In Stock", trend: "up" },
                { name: "Bluetooth Speaker", sku: "SKU-1003", category: "Electronics", price: "$45.99", quantity: 5, status: "Low Stock", trend: "down" },
                { name: "Phone Case", sku: "SKU-1004", category: "Accessories", price: "$19.99", quantity: 0, status: "Out of Stock", trend: "up" },
                { name: "USB-C Cable", sku: "SKU-1005", category: "Accessories", price: "$12.99", quantity: 32, status: "In Stock", trend: "same" },
                { name: "Desk Lamp", sku: "SKU-1006", category: "Home & Garden", price: "$34.99", quantity: 7, status: "Low Stock", trend: "down" },
                { name: "Coffee Mug", sku: "SKU-1007", category: "Home & Garden", price: "$14.99", quantity: 42, status: "In Stock", trend: "same" },
                { name: "Yoga Mat", sku: "SKU-1008", category: "Sports", price: "$29.99", quantity: 15, status: "In Stock", trend: "up" }
              ].map((item, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded bg-gray-200"></div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === 'In Stock' ? 'bg-green-100 text-green-800' : 
                      item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.trend === 'up' ? (
                      <ArrowUp className="h-5 w-5 text-green-500" />
                    ) : item.trend === 'down' ? (
                      <ArrowDown className="h-5 w-5 text-red-500" />
                    ) : (
                      <div className="h-5 w-5 rounded-full bg-gray-200"></div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-2">Edit</button>
                    <button className="text-blue-600 hover:text-blue-900">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Showing 1-8 of 124 items
          </div>
          <div className="flex space-x-1">
            <button className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">Previous</button>
            <button className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">1</button>
            <button className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">2</button>
            <button className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">3</button>
            <button className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, icon }) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        {icon}
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}
