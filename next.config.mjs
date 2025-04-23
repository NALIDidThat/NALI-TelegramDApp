/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Add CORS configuration for development
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Authorization',
          },
        ],
      },
    ]
  },
  // Configure allowed development origins
  allowedDevOrigins: [
    'peaceful-yeti-harmless.ngrok-free.app',
    'web.telegram.org',
    't.me'
  ],
  // Ensure proper viewport settings for Telegram WebApp
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
}

export default nextConfig