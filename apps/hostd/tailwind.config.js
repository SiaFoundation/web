const { createGlobPatternsForDependencies } = require('@nx/react/tailwind')
const { join } = require('path')

module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,dialogs,hooks,contexts}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  presets: [require('../../libs/design-system/src/style/theme.js')],
}
