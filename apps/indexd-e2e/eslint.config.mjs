import playwright from 'eslint-plugin-playwright'
import baseConfig from '../../eslint.config.mjs'

export default [
  playwright.configs['flat/recommended'],
  ...baseConfig,
  {
    rules: {
      'playwright/no-standalone-expect': 'off',
      'playwright/expect-expect': 'off',
    },
  },
]
