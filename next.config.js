/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export
  output: 'export',
  
  // Disable image optimization since it requires a server
  images: {
    unoptimized: true,
  },
  
  // Disable server components for static export
  experimental: {
    appDir: true,
  },
  
  // Needed for static export with proper path handling
  trailingSlash: true,
  
  // Disable server actions
  serverActions: false,
  
  // Handle environment variables for static build
  env: {
    NEXT_PUBLIC_DISABLE_DYNAMIC: 'true',
  },
  
  // Ensure all dynamic routes are pre-rendered
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/dashboard': { page: '/dashboard' },
      '/seller-analysis': { page: '/seller-analysis' },
      '/item-analysis': { page: '/item-analysis' },
      '/revenue': { page: '/revenue' },
      '/inventory': { page: '/inventory' },
      '/settings': { page: '/settings' },
    };
  },
}

module.exports = nextConfig
