/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features (updated for Next.js 14)
  experimental: {
    // Remove appDir as it's now standard in Next.js 14
    serverComponentsExternalPackages: ['bcrypt', 'jsonwebtoken'],
  },
  
  // Enable image optimization
  images: {
    domains: ['ebay.com', 'i.ebayimg.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  
  // Enable SWC minification for better performance
  swcMinify: true,
  
  // Configure webpack for compatibility with certain packages
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...config.externals, 'bcrypt'];
    }
    
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
    };
    
    return config;
  },
  
  // Environment variables (optional)
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  
  // Security headers (moved from api configuration) 
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
