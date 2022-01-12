const webpack = require('webpack')
const env = require('dotenv').config()

// MDX support
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

module.exports = withMDX({
  pageExtensions: ['tsx', 'md', 'mdx'],
  webpack(config) {
    // Inject .env variables
    config.plugins.push(new webpack.EnvironmentPlugin(env.parsed))
    return config
  },
})
