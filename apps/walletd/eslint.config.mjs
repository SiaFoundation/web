import nextEslintPluginNext from '@next/eslint-plugin-next'
import baseConfig from '../../eslint.config.mjs'

const config = [
  ...baseConfig,
  nextEslintPluginNext.configs.recommended,
  nextEslintPluginNext.configs['core-web-vitals'],
  {
    rules: {
      '@next/next/no-html-link-for-pages': ['error', 'apps/walletd/pages'],
    },
  },
]

export default config
