/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable app directory features
  experimental: {
    appDir: true,
    // Support for external packages in server components
    serverComponentsExternalPackages: ['bcrypt', 'jsonwebtoken'],
  },
  
  // Enable image optimization
  images: {
    domains: ['ebay.com', 'i.ebayimg.com'],
    // Optional: Configure image sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  
  // Enable SWC minification for better performance
  swcMinify: true,
  
  // Configure webpack for compatibility with certain packages
  webpack: (config, { isServer }) => {
    // Handle server-side packages that need special treatment
    if (isServer) {
      config.externals = [...config.externals, 'bcrypt'];
    }
    
    // Optimize bundle size
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
  
  // API route configuration
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
    responseLimit: '4mb',
  },
  
  // Optional: Configure headers for security
  headers: async ()  => {
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
