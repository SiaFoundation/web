const Dotenv = require('dotenv-webpack')
const { composePlugins, withNx } = require('@nx/next')

// MDX support
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Use downstream webserver compression in production
  compress: process.env.NODE_ENV === 'development',
  pageExtensions: ['tsx', 'ts', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'beta.sia.tech',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sia.tech',
        pathname: '/**',
      },
    ],
  },
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  webpack: (config) => {
    config.plugins = config.plugins || []

    // NextJS automatically inlines process.env.VAR references at build time
    // but the env var is undefined in /api routes - for some reason this fixes that.
    config.plugins = [...config.plugins, new Dotenv()]

    return config
  },
}

const plugins = [withMDX, withNx]

module.exports = composePlugins(...plugins)(nextConfig)
