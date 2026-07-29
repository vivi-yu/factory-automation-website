/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: '/v1', destination: '/', permanent: true },
      { source: '/v1/:path*', destination: '/:path*', permanent: true },
      { source: '/requirements', destination: '/demands', permanent: true },
      { source: '/requirements/:path*', destination: '/demands/:path*', permanent: true },
    ]
  },
}

export default nextConfig
