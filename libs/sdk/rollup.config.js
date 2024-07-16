import wasm from '@rollup/plugin-wasm'
import preserveDirectives from 'rollup-plugin-preserve-directives'

// https://github.com/rollup/rollup/issues/4699#issuecomment-1465302665
export default {
  input: 'src/index.ts',
  output: {
    preserveModules: true,
    format: 'esm',
    sourcemap: true,
  },
  plugins: [wasm({ targetEnv: 'auto-inline' }), preserveDirectives()],
}
