import Header from '@/components/header';
import { BarChart, LineChart, Activity, DollarSign, Package, ShoppingCart } from 'lucide-react';

export default function Dashboard() {
  return (
    <div>
      <Header 
        title="Dashboard" 
        subtitle="Overview of your eBay seller metrics and performance" 
      />
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard 
          title="Total Revenue" 
          value="$12,345.67" 
          change="+12.5%" 
          icon={<DollarSign className="h-8 w-8 text-blue-500" />} 
        />
        <StatCard 
          title="Items Sold" 
          value="256" 
          change="+8.2%" 
          icon={<ShoppingCart className="h-8 w-8 text-green-500" />} 
        />
        <StatCard 
          title="Conversion Rate" 
          value="3.2%" 
          change="-0.5%" 
          isNegative={true}
          icon={<Activity className="h-8 w-8 text-purple-500" />} 
        />
        <StatCard 
          title="Active Listings" 
          value="124" 
          change="+5" 
          icon={<Package className="h-8 w-8 text-orange-500" />} 
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-6">
        <ChartCard 
          title="Revenue Trend" 
          subtitle="Last 30 days" 
          icon={<LineChart className="h-5 w-5 text-gray-500" />} 
        />
        <ChartCard 
          title="Top Selling Items" 
          subtitle="By revenue" 
          icon={<BarChart className="h-5 w-5 text-gray-500" />} 
        />
      </div>
      
      {/* Recent Sales */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Sales</h2>
          <button className="text-sm text-blue-600 hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded bg-gray-200"></div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Product Name Example</div>
                        <div className="text-sm text-gray-500">SKU-{1000 + i}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Apr {i + 5}, 2025
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${(Math.random() * 100 + 20).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Completed
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
          {change} from last period
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
