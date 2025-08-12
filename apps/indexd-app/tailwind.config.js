/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    __dirname +
      '/{src,app,pages,components,hooks,contexts,dialogs,config,lib}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    '../../libs/design-system/src/**/*!(*.stories|*.spec).{ts,tsx,html}',
  ],
  presets: [require('../../libs/design-system/src/style/theme.js')],
}
