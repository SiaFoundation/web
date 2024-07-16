const nextConfigServe = {
  // Use downstream webserver compression in production
  compress: process.env.NODE_ENV === 'development',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
}

const nextConfigExport = {
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'export',
}

const nextConfig = process.env.NEXT_OUTPUT_EXPORT
  ? nextConfigExport
  : nextConfigServe

module.exports = nextConfig
