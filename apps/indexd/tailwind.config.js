/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './{src,app,pages,components,hooks,contexts,dialogs,config,lib}/**/*.{ts,tsx,html}',
    '!./{src,app,pages,components,hooks,contexts,dialogs,config,lib}/**/*.stories.{ts,tsx,html}',
    '!./{src,app,pages,components,hooks,contexts,dialogs,config,lib}/**/*.spec.{ts,tsx,html}',
    '../../libs/design-system/src/**/*.{ts,tsx,html}',
    '!../../libs/design-system/src/**/*.stories.{ts,tsx,html}',
    '!../../libs/design-system/src/**/*.spec.{ts,tsx,html}',
  ],
  presets: [require('../../libs/design-system/src/style/theme.js')],
}
