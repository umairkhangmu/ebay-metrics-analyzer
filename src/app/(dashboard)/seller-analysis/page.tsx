import Header from '@/components/header';
import { BarChart, LineChart, TrendingUp, TrendingDown, DollarSign, Package } from 'lucide-react';

export default function SellerAnalysis() {
  return (
    <div>
      <Header 
        title="Seller Analysis" 
        subtitle="Detailed analysis of your eBay seller performance" 
      />
      
      {/* Performance Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard 
          title="Seller Rating" 
          value="98.7%" 
          change="+0.5%" 
          icon={<TrendingUp className="h-8 w-8 text-green-500" />} 
        />
        <StatCard 
          title="Response Rate" 
          value="95.2%" 
          change="-1.3%" 
          isNegative={true}
          icon={<TrendingDown className="h-8 w-8 text-amber-500" />} 
        />
        <StatCard 
          title="Avg. Sale Value" 
          value="$48.75" 
          change="+$3.25" 
          icon={<DollarSign className="h-8 w-8 text-blue-500" />} 
        />
        <StatCard 
          title="Total Inventory" 
          value="124 items" 
          change="+5" 
          icon={<Package className="h-8 w-8 text-purple-500" />} 
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-6">
        <ChartCard 
          title="Sales Performance" 
          subtitle="Last 30 days vs previous period" 
          icon={<LineChart className="h-5 w-5 text-gray-500" />} 
        />
        <ChartCard 
          title="Revenue by Category" 
          subtitle="Distribution of sales" 
          icon={<BarChart className="h-5 w-5 text-gray-500" />} 
        />
      </div>
      
      {/* Seller Metrics */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Seller Metrics</h2>
          <div className="flex space-x-2">
            <select className="rounded-md border border-gray-300 px-3 py-1 text-sm">
              <option>Last 30 days</option>
              <option>Last 60 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { metric: "On-time Shipping", value: "99.2%", change: "+0.7%", status: "Excellent" },
                { metric: "Item as Described", value: "98.5%", change: "+0.3%", status: "Excellent" },
                { metric: "Communication", value: "97.8%", change: "-0.5%", status: "Good" },
                { metric: "Return Rate", value: "2.3%", change: "+0.2%", status: "Good" },
                { metric: "Cancellation Rate", value: "1.5%", change: "-0.3%", status: "Excellent" }
              ].map((item, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.metric}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.value}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                      {item.change}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === 'Excellent' ? 'bg-green-100 text-green-800' : 
                      item.status === 'Good' ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
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
