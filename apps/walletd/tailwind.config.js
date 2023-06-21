const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind')
const { join } = require('path')

module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,hooks,dialogs}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  presets: [require('../../libs/design-system/src/config/theme.js')],
}
