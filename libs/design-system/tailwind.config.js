const { createGlobPatternsForDependencies } = require('@nx/react/tailwind')
const { join } = require('path')

// This file provides tailwind intellisense within design-system src files.
module.exports = {
  content: [
    join(__dirname, 'src/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  presets: [require('./src/config/theme.js')],
}
