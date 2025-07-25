import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import js from '@eslint/js'
import { fixupConfigRules } from '@eslint/compat'
import nx from '@nx/eslint-plugin'
import baseConfig from '../../eslint.config.mjs'

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
  recommendedConfig: js.configs.recommended,
})

const config = [
  ...fixupConfigRules(compat.extends('next')),
  ...fixupConfigRules(compat.extends('next/core-web-vitals')),
  ...baseConfig,
  ...nx.configs['flat/react-typescript'],
  {
    rules: {
      '@next/next/no-html-link-for-pages': ['error', 'apps/indexd/pages'],
    },
  },
]

export default config
