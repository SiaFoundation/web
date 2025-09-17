import nx from '@nx/eslint-plugin'

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['node_modules', '**/dist', '**/.next', '**/.next-*', '**/output'],
  },
  {
    files: ['**/*.json'],
    languageOptions: {
      parser: await import('jsonc-eslint-parser').then((m) => m.default),
    },
    rules: {
      '@nx/dependency-checks': 'error',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  {
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: [
            '**/eslint.config.mjs',
            '**/rollup.config.js',
            '**/tailwind.config.js',
            '**/next.config.js',
            '**/jest.config.ts',
            '**/project.json',
          ],
          // Ignore this for now because the dist import in tsconfig.base.json
          // breaks the nx dependency check lint rule.
          ignoredDependencies: ['@siafoundation/sdk'],
        },
      ],
    },
  },
  {
    files: ['**/next-env.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': ['off'],
    },
  },
  {
    rules: {
      // Our data fetching hooks often require non-null assertions.
      '@typescript-eslint/no-non-null-assertion': ['off'],
    },
  },
]
