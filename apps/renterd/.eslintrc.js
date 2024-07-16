/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@siafoundation/eslint-config/next.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  env: {
    jest: true,
  },
}
