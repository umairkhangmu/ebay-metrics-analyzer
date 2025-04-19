/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export
  output: 'export',
  
  // Disable image optimization since it requires a server
  images: {
    unoptimized: true,
  },
  
  // Next.js 14 compatible experimental features
  // Note: appDir is now standard in Next.js 14, so it's removed
  experimental: {
    // Keep only compatible experimental features
    serverComponentsExternalPackages: ['bcrypt', 'jsonwebtoken'],
  },
  
  // Needed for static export with proper path handling
  trailingSlash: true,
  
  // Handle environment variables for static build
  env: {
    NEXT_PUBLIC_DISABLE_DYNAMIC: 'true',
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  
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
  
  // Security headers
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
