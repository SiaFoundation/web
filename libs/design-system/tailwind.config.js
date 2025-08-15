// This file provides tailwind intellisense within design-system src files.
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx,html}',
    '!./src/**/*.stories.{ts,tsx,html}',
    '!./src/**/*.spec.{ts,tsx,html}',
  ],
  presets: [require('./src/style/theme.js')],
}
