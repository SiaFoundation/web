import nx from '@nx/eslint-plugin'
import baseConfig from '../../eslint.config.mjs'

export default [
  ...baseConfig,
  ...nx.configs['flat/react'],
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
