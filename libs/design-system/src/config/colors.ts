import * as colorsExt from './colorsExt'

export const colors = {
  ...colorsExt.colors,

  // TODO: Below is a temporary translation of the Sia brand colors,
  // these are not properly selected palettes and do not work for dark mode.
  // Existing colors from: https://support.sia.tech/sia-integrations/sia-brand-guidelines

  // Primary
  primary1: 'rgba(30, 214, 96, 0.05)',
  primary2: 'rgba(30, 214, 96, 0.1)',
  primary3: 'rgba(30, 214, 96, 0.2)',
  primary4: 'rgba(30, 214, 96, 0.3)',
  primary5: 'rgba(30, 214, 96, 0.4)',
  primary6: 'rgba(30, 214, 96, 0.5)',
  primary7: 'rgba(30, 214, 96, 0.6)',
  primary8: 'rgba(30, 214, 96, 0.7)',
  primary9: 'rgba(30, 214, 96, 0.8)',
  primary10: 'rgba(30, 214, 96, 0.9)',
  primary11: 'rgba(30, 214, 96, 0.95)',
  primary12: 'rgba(30, 214, 96, 1)',

  // Secondary
  secondary1: '#F7F9F8', // very light gray
  secondary2: '#ECF1F1', // light gray
  secondary3: '#BFC9C9', // medium gray
  secondary4: '#93A5A5', // dark gray
  secondary5: '#7F8C8D', // Sia gray
  secondary6: '#404647', // darker gray
  secondary7: '#202323', // darkest gray

  // Semantic
  hiContrast: '$slate12',
  // loContrast: '$slate1',
  loContrast: 'white',
  canvas: 'hsl(0 0% 93%)',
  panel: 'white',
  transparentPanel: 'hsl(0 0% 0% / 97%)',
  shadowLight: 'hsl(206 22% 7% / 35%)',
  shadowDark: 'hsl(206 22% 7% / 20%)',
  raisedShadow: '$slate3',
  raisedShadowHover: '$slate4',
  inputShadow: '$primary10',
  frame: 'black',
}

export const colorsDark = {
  ...colorsExt.colorsDark,

  // Semantic
  hiContrast: '$slate12',
  loContrast: '$slate1',
  canvas: 'hsl(0 0% 15%)',
  panel: '$mauve3',
  raisedShadow: '$mauve3',
  raisedShadowHover: '$mauve4',
  transparentPanel: 'hsl(0 100% 100% / 97%)',
  shadowLight: 'hsl(206 22% 7% / 35%)',
  shadowDark: 'hsl(206 22% 7% / 20%)',
  inputShadow: '$primary10',
  frame: '$blackA6',
}
