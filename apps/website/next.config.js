// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx')

const webpack = require('webpack')
const env = require('dotenv').config()

// MDX support
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  pageExtensions: ['tsx', 'md', 'mdx'],
  webpack(config) {
    // Inject .env variables
    config.plugins.push(new webpack.EnvironmentPlugin(env.parsed))
    return config
  },
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
}

module.exports = withMDX(withNx(nextConfig))
