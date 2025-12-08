import baseConfig from '../../eslint.config.mjs'

export default [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {},
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
          ignoredDependencies: ['@react-spring/web'],
        },
      ],
    },
  },
]
