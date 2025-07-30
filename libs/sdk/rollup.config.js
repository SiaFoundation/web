const preserveDirectives = require('rollup-plugin-preserve-directives')
const { wasm } = require('@rollup/plugin-wasm')

// https://github.com/rollup/rollup/issues/4699#issuecomment-1465302665
function getRollupOptions(options) {
  return {
    ...options,
    output: options.output.map((output) => ({
      ...output,
      preserveModules: true,
      sourcemap: true,
    })),
    plugins: options.plugins
      .concat(
        wasm({
          targetEnv: 'auto-inline',
        }),
      )
      .concat(preserveDirectives.default()),
  }
}

module.exports = getRollupOptions
