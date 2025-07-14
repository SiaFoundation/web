const preserveDirectives = require('rollup-plugin-preserve-directives')

// https://github.com/rollup/rollup/issues/4699#issuecomment-1465302665
function getRollupOptions(options) {
  return {
    ...options,
    output: options.output.map((output) => ({
      ...output,
      preserveModules: true,
      sourcemap: true,
    })),
    plugins: options.plugins.concat(preserveDirectives.default()),
  }
}

module.exports = getRollupOptions
