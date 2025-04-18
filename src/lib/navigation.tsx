import { BarChart, LineChart, PieChart, Activity, Users, Package, Settings, Home } from 'lucide-react';

export type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: 'Seller Analysis',
    href: '/seller-analysis',
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: 'Item Analysis',
    href: '/item-analysis',
    icon: <BarChart className="h-5 w-5" />,
  },
  {
    title: 'Revenue Reports',
    href: '/revenue',
    icon: <LineChart className="h-5 w-5" />,
  },
  {
    title: 'Inventory Tracker',
    href: '/inventory',
    icon: <Package className="h-5 w-5" />,
  },
  {
    title: 'Performance Metrics',
    href: '/metrics',
    icon: <Activity className="h-5 w-5" />,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: <Settings className="h-5 w-5" />,
  },
];
