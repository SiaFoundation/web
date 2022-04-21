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
  pageExtensions: ['tsx', 'ts', 'md', 'mdx'],
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

module.exports = withMDX(withNx(nextConfig))
