require('dotenv').config()

const path = require('path')
const Dotenv = require('dotenv-webpack')
const withNx = require('@nrwl/next/plugins/with-nx')

// MDX support
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  pageExtensions: ['tsx', 'md', 'mdx'],
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  webpack: (config) => {
    config.plugins = config.plugins || []

    // Inject .env so vars do not need NEXT_PUBLIC_ prefix
    config.plugins = [
      ...config.plugins,
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      }),
    ]

    return config
  },
}

module.exports = withMDX(withNx(nextConfig))
