const { createGlobPatternsForDependencies } = require('@nx/react/tailwind')
const { join } = require('path')

// This file provides tailwind intellisense within react-icons src files.
module.exports = {
  content: [
    join(
      __dirname,
      'src/{core,components,app,hooks,icons}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  presets: [require('./src/config/theme.js')],
}
