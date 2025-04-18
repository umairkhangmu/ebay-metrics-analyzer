import Header from '@/components/header';
import { LineChart, BarChart, PieChart, DollarSign, CreditCard, ShoppingBag } from 'lucide-react';

export default function Revenue() {
  return (
    <div>
      <Header 
        title="Revenue Reports" 
        subtitle="Financial analysis and revenue breakdown" 
      />
      
      {/* Date Range Selector */}
      <div className="mb-6">
        <div className="flex space-x-2">
          <select className="rounded-md border border-gray-300 px-3 py-2 text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Custom range</option>
          </select>
          <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 text-sm">
            Generate Report
          </button>
          <button className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm">
            Export Data
          </button>
        </div>
      </div>
      
      {/* Revenue Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-6">
        <StatCard 
          title="Total Revenue" 
          value="$12,345.67" 
          change="+12.5%" 
          icon={<DollarSign className="h-8 w-8 text-blue-500" />} 
        />
        <StatCard 
          title="Average Order Value" 
          value="$48.22" 
          change="+3.8%" 
          icon={<ShoppingBag className="h-8 w-8 text-green-500" />} 
        />
        <StatCard 
          title="Net Profit" 
          value="$5,678.90" 
          change="+8.2%" 
          icon={<CreditCard className="h-8 w-8 text-purple-500" />} 
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-6">
        <ChartCard 
          title="Revenue Trend" 
          subtitle="Daily revenue for selected period" 
          icon={<LineChart className="h-5 w-5 text-gray-500" />} 
        />
        <ChartCard 
          title="Revenue by Category" 
          subtitle="Distribution of sales by product category" 
          icon={<PieChart className="h-5 w-5 text-gray-500" />} 
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-6">
        <ChartCard 
          title="Top Revenue Items" 
          subtitle="Items generating the most revenue" 
          icon={<BarChart className="h-5 w-5 text-gray-500" />} 
        />
        <ChartCard 
          title="Revenue by Day of Week" 
          subtitle="Sales patterns throughout the week" 
          icon={<BarChart className="h-5 w-5 text-gray-500" />} 
        />
      </div>
      
      {/* Revenue Breakdown */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Revenue Breakdown</h2>
        </div>
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items Sold</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Revenue</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shipping</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Revenue</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margin</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { category: "Electronics", sold: 87, gross: "$4,325.65", fees: "$432.57", shipping: "$215.45", net: "$3,677.63", margin: "85%" },
                { category: "Home & Garden", sold: 54, gross: "$2,876.32", fees: "$287.63", shipping: "$325.78", net: "$2,262.91", margin: "79%" },
                { category: "Clothing", sold: 112, gross: "$2,234.56", fees: "$223.46", shipping: "$187.65", net: "$1,823.45", margin: "82%" },
                { category: "Toys & Games", sold: 43, gross: "$1,567.89", fees: "$156.79", shipping: "$143.21", net: "$1,267.89", margin: "81%" },
                { category: "Sports", sold: 28, gross: "$1,342.78", fees: "$134.28", shipping: "$98.76", net: "$1,109.74", margin: "83%" }
              ].map((item, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.sold}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.gross}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.fees}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.shipping}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.net}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.margin}
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
