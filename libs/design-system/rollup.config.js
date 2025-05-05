const reactConfig = require('@nx/react/plugins/bundle-rollup')
const preserveDirectives = require('rollup-plugin-preserve-directives')

// https://github.com/rollup/rollup/issues/4699#issuecomment-1465302665
function getRollupOptions(config) {
  const c = reactConfig(config)
  return {
    ...c,
    output: {
      ...c.output,
      preserveModules: true,
      sourcemap: true,
    },
    plugins: c.plugins.concat(preserveDirectives.default()),
  }
}

module.exports = getRollupOptions
