import Link from 'next/link';
import { navItems } from '@/lib/navigation';

export default function Sidebar() {
  return (
    <div className="flex h-screen w-64 flex-col border-r bg-white">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center font-bold text-xl">
          <span className="text-blue-600">eBay</span>
          <span className="ml-1">Metrics</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
              >
                <span className="mr-3 text-gray-500">{item.icon}</span>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t p-4">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-200"></div>
          <div className="ml-3">
            <p className="text-sm font-medium">eBay Seller</p>
            <p className="text-xs text-gray-500">Manage Account</p>
          </div>
        </div>
      </div>
    </div>
  );
}
