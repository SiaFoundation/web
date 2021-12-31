const webpack = require('webpack')
const env = require('dotenv').config()

module.exports = {
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(env.parsed))
    return config
  },
}
