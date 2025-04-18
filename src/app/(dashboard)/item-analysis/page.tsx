import Header from '@/components/header';
import { BarChart, LineChart, TrendingUp, TrendingDown, DollarSign, ShoppingCart } from 'lucide-react';

export default function ItemAnalysis() {
  return (
    <div>
      <Header 
        title="Item Analysis" 
        subtitle="Detailed analysis of your eBay item performance" 
      />
      
      {/* Item Search */}
      <div className="mb-6">
        <div className="flex space-x-2">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search items by title, SKU, or ID..."
              className="w-full rounded-md border border-gray-300 px-4 py-2"
            />
          </div>
          <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Search
          </button>
        </div>
      </div>
      
      {/* Item Performance Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard 
          title="Total Items" 
          value="124" 
          change="+5" 
          icon={<ShoppingCart className="h-8 w-8 text-blue-500" />} 
        />
        <StatCard 
          title="Avg. Sale Price" 
          value="$48.75" 
          change="+$3.25" 
          icon={<DollarSign className="h-8 w-8 text-green-500" />} 
        />
        <StatCard 
          title="Best Performer" 
          value="+32.5%" 
          change="vs last month" 
          icon={<TrendingUp className="h-8 w-8 text-purple-500" />} 
        />
        <StatCard 
          title="Worst Performer" 
          value="-12.3%" 
          change="vs last month" 
          isNegative={true}
          icon={<TrendingDown className="h-8 w-8 text-red-500" />} 
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-6">
        <ChartCard 
          title="Top Selling Items" 
          subtitle="By revenue in the last 30 days" 
          icon={<BarChart className="h-5 w-5 text-gray-500" />} 
        />
        <ChartCard 
          title="Item Price Trends" 
          subtitle="Average price over time" 
          icon={<LineChart className="h-5 w-5 text-gray-500" />} 
        />
      </div>
      
      {/* Item List */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Item Performance</h2>
          <div className="flex space-x-2">
            <select className="rounded-md border border-gray-300 px-3 py-1 text-sm">
              <option>Sort by Revenue</option>
              <option>Sort by Units Sold</option>
              <option>Sort by Conversion Rate</option>
              <option>Sort by Views</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units Sold</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { name: "Wireless Earbuds", sku: "SKU-1001", price: "$59.99", sold: 32, revenue: "$1,919.68", views: 845, conversion: "3.8%", trend: "up" },
                { name: "Smart Watch", sku: "SKU-1002", price: "$89.99", sold: 28, revenue: "$2,519.72", views: 1023, conversion: "2.7%", trend: "up" },
                { name: "Bluetooth Speaker", sku: "SKU-1003", price: "$45.99", sold: 24, revenue: "$1,103.76", views: 756, conversion: "3.2%", trend: "down" },
                { name: "Phone Case", sku: "SKU-1004", price: "$19.99", sold: 56, revenue: "$1,119.44", views: 1245, conversion: "4.5%", trend: "up" },
                { name: "USB-C Cable", sku: "SKU-1005", price: "$12.99", sold: 78, revenue: "$1,013.22", views: 1567, conversion: "5.0%", trend: "same" }
              ].map((item, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded bg-gray-200"></div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.sold}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.revenue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.views}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.conversion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.trend === 'up' ? 'bg-green-100 text-green-800' : 
                      item.trend === 'down' ? 'bg-red-100 text-red-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '→'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon, isNegative = false }) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        {icon}
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold">{value}</p>
        <p className={`text-sm ${isNegative ? 'text-red-600' : 'text-green-600'}`}>
          {change}
        </p>
      </div>
    </div>
  );
}

function ChartCard({ title, subtitle, icon }) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        {icon}
      </div>
      <div className="h-64 w-full bg-gray-100 rounded flex items-center justify-center">
        <p className="text-gray-400">Chart will be rendered here</p>
      </div>
    </div>
  );
}
