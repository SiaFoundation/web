import * as colorsExt from './colorsExt'

export const colors = {
  ...colorsExt.colors,

  // accent - light mode

  accent1: '#F6FFF9',
  accent2: '#E9FBEF',
  accent3: '#D5F2DE',
  accent4: '#C9EED4',
  accent5: '#BBE8C9',
  accent6: '#9BDAAE',
  accent7: '#71C48A',
  accent8: '#3EAA5F',
  accent9: '#05872D',
  accent10: '#056B24',
  accent11: '#04511B',
  accent12: '#011F0A',

  // Semantic
  waves: '#FAF8F7',
  hiContrast: '$slate12',
  loContrast: 'white',
  loContrastA: '$whiteA12',
  canvas: 'hsl(0 0% 93%)',
  panel: 'white',
  accentInactive: '$slate4',
  accentActive: '$slate5',
  accentInput: '$accent7',
  frame: 'black',

  textVerySubtle: '$slate8',
  textSubtle: '$slate11',
  textSubtleActive: '$slate12',
  textSubtleHover: '$slate12',
  textContrast: '$slate12',
  textDisabled: '$slate9',
  textExtraSubtle: '$slate9',

  control: 'white',
  controlActive: '$slate4',
  controlHover: '$slate5',

  separator: '$slate3',

  borderFocus: '0 0 0 1px $blue8',

  border: 'inset 0 0 0 1px $slate4',
  borderActive: 'inset 0 0 0 1px $slate5',
  borderHover: 'inset 0 0 0 1px $slate6',

  borderAccent: 'inset 0 0 0 1px $accent6',
  borderAccentActive: 'inset 0 0 0 1px $accent7',
  borderAccentHover: 'inset 0 0 0 1px $accent8',

  borderInput: 'inset 0 0 0 1px $slate4',
  borderInputActive: 'inset 0 0 0 1px $blue7',
  borderInputHover: 'inset 0 0 0 1px $blue8',

  borderGreen: 'inset 0 0 0 1px $accent6',
  borderGreenActive: 'inset 0 0 0 1px $accent7',
  borderGreenHover: 'inset 0 0 0 1px $accent8',

  borderRed: 'inset 0 0 0 1px $red6',
  borderRedActive: 'inset 0 0 0 1px $red7',
  borderRedHover: 'inset 0 0 0 1px $red8',

  selectableBorder: 'inset 0 0 0 1px $slate4',
  selectableBorderHover: 'inset 0 0 0 1px $slate6',
  selectableBorderActive: 'inset 0 0 0 3px $accent7',

  shadow: 'rgb(0 0 0 / 6%) 0px 1px 1px',
  shadowActive: 'rgb(0 0 0 / 7%) 0px 1px 1px',

  shadowButton: 'rgb(0 0 0 / 6%) 0px 1px 1px',
  shadowButtonFocus: 'rgb(0 0 0 / 7%) 0px 1px 1px',

  shadowPopup: 'rgb(0 0 0 / 9%) 0px 3px 12px',
  shadowPopupFocus: 'rgb(0 0 0 / 10%) 0px 3px 12px',

  shadowDialog: 'rgb(0 0 0 / 40%) 0px 16px 70px',
  shadowDialogFocus: 'rgb(0 0 0 / 50%) 0px 16px 70px',

  transparent: 'rgba(255,255,255,0)',
}

export const colorsDark = {
  ...colorsExt.colorsDark,

  // accent - dark mode
  accent1: '#05150A',
  accent2: '#051C0C',
  accent3: '#062811',
  accent4: '#073515',
  accent5: '#064018',
  accent6: '#075820',
  accent7: '#056824',
  accent8: '#077A2A',
  accent9: '#05872D',
  accent10: '#069F35',
  accent11: '#2FA052',
  accent12: '#D9F4E1',

  // Semantic
  waves: '$slate3',
  hiContrast: '$slate12',
  loContrast: '$slate1',
  loContrastA: '$slateA1',
  canvas: 'hsl(0 0% 15%)',
  panel: '$mauve3',
  accentInactive: '$slate6',
  accentActive: '$slate7',
  accentInput: '$accent8',
  frame: '$slate12',

  textVerySubtle: '$slate8',
  textSubtle: '$slate11',
  textSubtleActive: '$slate12',
  textSubtleHover: '$slate12',
  textContrast: '$slate12',
  textDisabled: '$slate9',

  control: '$slate3',
  controlActive: '$slate4',
  controlHover: '$slate5',

  separator: '$slate4',

  borderFocus: '0 0 0 1px $blue8',

  border: 'inset 0 0 0 1px $slate4',
  borderActive: 'inset 0 0 0 1px $slate5',
  borderHover: 'inset 0 0 0 1px $slate6',

  borderAccent: 'inset 0 0 0 1px $accent6',
  borderAccentActive: 'inset 0 0 0 1px $accent7',
  borderAccentHover: 'inset 0 0 0 1px $accent8',

  borderInput: 'inset 0 0 0 1px $slate4',
  borderInputActive: 'inset 0 0 0 1px $blue7',
  borderInputHover: 'inset 0 0 0 1px $blue8',

  borderGreen: 'inset 0 0 0 1px $accent6',
  borderGreenActive: 'inset 0 0 0 1px $accent7',
  borderGreenHover: 'inset 0 0 0 1px $accent8',

  borderRed: 'inset 0 0 0 1px $red6',
  borderRedActive: 'inset 0 0 0 1px $red7',
  borderRedHover: 'inset 0 0 0 1px $red8',

  selectableBorder: 'inset 0 0 0 1px $slate4',
  selectableBorderHover: 'inset 0 0 0 1px $slate6',
  selectableBorderActive: 'inset 0 0 0 3px $accent7',

  shadow: 'rgb(0 0 0 / 22%) 0px 1px 1px',
  shadowActive: 'rgb(0 0 0 / 25%) 0px 1px 1px',

  shadowButton: 'rgb(0 0 0 / 22%) 0px 1px 1px',
  shadowButtonFocus: 'rgb(0 0 0 / 25%) 0px 1px 1px',

  shadowPopup: 'rgb(0 0 0 / 18%) 0px 4px 24px',
  shadowPopupFocus: 'rgb(0 0 0 / 20%) 0px 4px 24px',

  shadowDialog: 'rgb(0 0 0 / 45%) 0px 16px 70px',
  shadowDialogFocus: 'rgb(0 0 0 / 50%) 0px 16px 70px',

  transparent: 'rgba(255,255,255,0)',
}
