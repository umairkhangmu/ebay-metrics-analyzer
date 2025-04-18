import Header from '@/components/header';
import { Settings, User, Key, Bell, Database, Shield, HelpCircle } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div>
      <Header 
        title="Settings" 
        subtitle="Configure your eBay Metrics Analyzer account and preferences" 
      />
      
      {/* Settings Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="md:col-span-1">
          <nav className="space-y-1">
            {[
              { name: 'Account', icon: <User className="h-5 w-5" />, current: true },
              { name: 'eBay API', icon: <Key className="h-5 w-5" />, current: false },
              { name: 'Notifications', icon: <Bell className="h-5 w-5" />, current: false },
              { name: 'Data Management', icon: <Database className="h-5 w-5" />, current: false },
              { name: 'Privacy & Security', icon: <Shield className="h-5 w-5" />, current: false },
              { name: 'Help & Support', icon: <HelpCircle className="h-5 w-5" />, current: false },
            ].map((item) => (
              <a
                key={item.name}
                href="#"
                className={`
                  flex items-center px-3 py-2 text-sm font-medium rounded-md
                  ${item.current ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <span className="mr-3 text-gray-500">{item.icon}</span>
                {item.name}
              </a>
            ))}
          </nav>
        </div>
        
        <div className="md:col-span-3">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Account Settings</h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Update your account information and preferences.</p>
              </div>
              <div className="mt-5">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="you@example.com"
                        defaultValue="user@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="John Doe"
                        defaultValue="eBay Seller"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                      Company name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="company"
                        id="company"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                      Timezone
                    </label>
                    <div className="mt-1">
                      <select
                        id="timezone"
                        name="timezone"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option>Pacific Time (US & Canada)</option>
                        <option>Mountain Time (US & Canada)</option>
                        <option>Central Time (US & Canada)</option>
                        <option>Eastern Time (US & Canada)</option>
                        <option>UTC</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="pt-5">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">eBay API Connection</h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Connect your eBay seller account to enable data synchronization.</p>
              </div>
              <div className="mt-5">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Key className="mr-2 h-5 w-5" />
                  Connect eBay Account
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Data Synchronization</h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Configure how often your eBay data is synchronized.</p>
              </div>
              <div className="mt-5">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="sync_frequency" className="block text-sm font-medium text-gray-700">
                      Sync frequency
                    </label>
                    <div className="mt-1">
                      <select
                        id="sync_frequency"
                        name="sync_frequency"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option>Every hour</option>
                        <option>Every 6 hours</option>
                        <option>Every 12 hours</option>
                        <option>Once a day</option>
                        <option>Manual only</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="data_retention" className="block text-sm font-medium text-gray-700">
                      Data retention period
                    </label>
                    <div className="mt-1">
                      <select
                        id="data_retention"
                        name="data_retention"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option>30 days</option>
                        <option>90 days</option>
                        <option>180 days</option>
                        <option>1 year</option>
                        <option>Forever</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="pt-5">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
