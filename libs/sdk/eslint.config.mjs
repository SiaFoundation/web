import baseConfig from '../../eslint.config.mjs'

export default [
  ...baseConfig,
  {
    // Ignore the wasm_exec.js files
    ignores: ['src/utils'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {},
  },
  {
    ignores: [
      'node_modules',
      '**/dist',
      '**/.next',
      '**/.next-*',
      'libs/sdk/src/utils/wasm_exec.js',
    ],
  },
]
