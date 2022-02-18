import * as colorsExt from './colorsExt'

export const colors = {
  ...colorsExt.colors,

  // TODO: Below is a temporary translation of the Sia brand colors,
  // these are not properly selected palettes and do not work for dark mode.
  // Existing colors from: https://support.sia.tech/sia-integrations/sia-brand-guidelines

  // Primary
  siaGreenA1: 'rgba(30, 214, 96, 0.05)',
  siaGreenA2: 'rgba(30, 214, 96, 0.1)',
  siaGreenA3: 'rgba(30, 214, 96, 0.2)',
  siaGreenA4: 'rgba(30, 214, 96, 0.3)',
  siaGreenA5: 'rgba(30, 214, 96, 0.4)',
  siaGreenA6: 'rgba(30, 214, 96, 0.5)',
  siaGreenA7: 'rgba(30, 214, 96, 0.6)',
  siaGreenA8: 'rgba(30, 214, 96, 0.7)',
  siaGreenA9: 'rgba(30, 214, 96, 0.8)',
  siaGreenA10: 'rgba(30, 214, 96, 0.9)',
  siaGreenA11: 'rgba(30, 214, 96, 0.95)',
  siaGreenA12: 'rgba(30, 214, 96, 1)',

  // Secondary
  siaGray1: '#F7F9F8', // very light gray
  siaGray2: '#ECF1F1', // light gray
  siaGray3: '#BFC9C9', // medium gray
  siaGray4: '#93A5A5', // dark gray
  siaGray5: '#7F8C8D', // Sia gray
  siaGray6: '#404647', // darker gray
  siaGray7: '#202323', // darkest gray

  // Semantic
  hiContrast: '$slate12',
  // loContrast: '$slate1',
  loContrast: 'white',
  canvas: 'hsl(0 0% 93%)',
  panel: '$mauve3',
  transparentPanel: 'hsl(0 0% 0% / 97%)',
  shadowLight: 'hsl(206 22% 7% / 35%)',
  shadowDark: 'hsl(206 22% 7% / 20%)',
  inputShadow: '$siaGreenA10',
  frame: 'black',
}

export const colorsDark = {
  ...colorsExt.colorsDark,

  // Semantic
  hiContrast: '$slate12',
  loContrast: '$slate1',
  canvas: 'hsl(0 0% 15%)',
  panel: '$mauve3',
  transparentPanel: 'hsl(0 100% 100% / 97%)',
  shadowLight: 'hsl(206 22% 7% / 35%)',
  shadowDark: 'hsl(206 22% 7% / 20%)',
  inputShadow: '$siaGreenA10',
  frame: '$blackA6',
}
