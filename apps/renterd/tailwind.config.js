const { join } = require('node:path')

module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,hooks,contexts,dialogs}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
    'node_modules/@siafoundation/**/**/*.js',
  ],
  presets: [require('../../libs/design-system/src/style/theme.js')],
}
