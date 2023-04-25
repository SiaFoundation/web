const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind')
const { join } = require('path')

// This file provides tailwind intellisense within design-system src files.
module.exports = {
  content: [
    join(
      __dirname,
      'src/{core,components,app,hooks}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  presets: [require('./src/config/theme.js')],
}
