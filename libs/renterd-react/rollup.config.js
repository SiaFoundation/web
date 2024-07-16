import preserveDirectives from 'rollup-plugin-preserve-directives'

// https://github.com/rollup/rollup/issues/4699#issuecomment-1465302665
function getRollupOptions(options) {
  return {
    ...options,
    output: {
      ...options.output,
      preserveModules: true,
      format: 'esm',
      sourcemap: true,
    },
    plugins: options.plugins.concat(preserveDirectives()),
  }
}

export default getRollupOptions
