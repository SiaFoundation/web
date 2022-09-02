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

  // brandGray - light mode
  brandGray1: '#FEFEFE',
  brandGray2: '#F9F9F9',
  brandGray3: '#F0F0F0',
  brandGray4: '#E6E6E6',
  brandGray5: '#DCDCDC',
  brandGray6: '#CFCFCF',
  brandGray7: '#C0C0C0',
  brandGray8: '#AFAFAF',
  brandGray9: '#9C9C9C',
  brandGray10: '#858585',
  brandGray11: '#555555',
  brandGray12: '#333333',

  // Semantic
  waves: '#FAF8F7',
  hiContrast: '$slate12',
  loContrast: 'white',
  canvas: 'hsl(0 0% 93%)',
  panel: 'white',
  accentInactive: '$brandGray4',
  accentActive: '$brandGray5',
  accentInput: '$accent7',
  frame: 'black',

  textVerySubtle: '$brandGray8',
  textSubtle: '$brandGray11',
  textSubtleActive: '$brandGray12',
  textSubtleHover: '$brandGray12',
  textContrast: '$brandGray12',
  textDisabled: '$brandGray9',
  textExtraSubtle: '$brandGray9',

  control: 'white',
  controlActive: '$brandGray4',
  controlHover: '$brandGray5',

  separator: '$brandGray3',

  borderFocus: '0 0 0 1px $blue8',

  border: 'inset 0 0 0 1px $brandGray4',
  borderActive: 'inset 0 0 0 1px $brandGray5',
  borderHover: 'inset 0 0 0 1px $brandGray6',

  borderAccent: 'inset 0 0 0 1px $accent6',
  borderAccentActive: 'inset 0 0 0 1px $accent7',
  borderAccentHover: 'inset 0 0 0 1px $accent8',

  borderInput: 'inset 0 0 0 1px $brandGray4',
  borderInputActive: 'inset 0 0 0 1px $blue7',
  borderInputHover: 'inset 0 0 0 1px $blue8',

  borderGreen: 'inset 0 0 0 1px $accent6',
  borderGreenActive: 'inset 0 0 0 1px $accent7',
  borderGreenHover: 'inset 0 0 0 1px $accent8',

  borderRed: 'inset 0 0 0 1px $red6',
  borderRedActive: 'inset 0 0 0 1px $red7',
  borderRedHover: 'inset 0 0 0 1px $red8',

  selectableBorder: 'inset 0 0 0 1px $brandGray4',
  selectableBorderHover: 'inset 0 0 0 1px $brandGray6',
  selectableBorderActive: 'inset 0 0 0 3px $accent7',

  shadow: 'rgb(0 0 0 / 6%) 0px 1px 1px',
  shadowActive: 'rgb(0 0 0 / 7%) 0px 1px 1px',

  shadowButton: 'rgb(0 0 0 / 6%) 0px 1px 1px',
  shadowButtonFocus: 'rgb(0 0 0 / 7%) 0px 1px 1px',

  shadowPopup: 'rgb(0 0 0 / 9%) 0px 3px 12px',
  shadowPopupFocus: 'rgb(0 0 0 / 10%) 0px 3px 12px',

  shadowDialog: 'rgb(0 0 0 / 40%) 0px 16px 70px',
  shadowDialogFocus: 'rgb(0 0 0 / 50%) 0px 16px 70px',
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

  // brandGray - dark mode
  brandGray1: '#161616',
  brandGray2: '#1E1E1E',
  brandGray3: '#272727',
  brandGray4: '#313131',
  brandGray5: '#3E3E3E',
  brandGray6: '#4D4D4D',
  brandGray7: '#5B5B5B',
  brandGray8: '#686868',
  brandGray9: '#7E7E7E',
  brandGray10: '#A9A9A9',
  brandGray11: '#D0D0D0',
  brandGray12: '#EFEFEF',

  // Semantic
  waves: '$slate3',
  hiContrast: '$brandGray12',
  loContrast: '$brandGray1',
  canvas: 'hsl(0 0% 15%)',
  panel: '$mauve3',
  accentInactive: '$brandGray6',
  accentActive: '$brandGray7',
  accentInput: '$accent8',
  frame: '$brandGray11',

  textVerySubtle: '$brandGray8',
  textSubtle: '$brandGray11',
  textSubtleActive: '$brandGray12',
  textSubtleHover: '$brandGray12',
  textContrast: '$brandGray12',
  textDisabled: '$brandGray9',

  control: '$brandGray3',
  controlActive: '$brandGray4',
  controlHover: '$brandGray5',

  separator: '$brandGray4',

  borderFocus: '0 0 0 1px $blue8',

  border: 'inset 0 0 0 1px $brandGray4',
  borderActive: 'inset 0 0 0 1px $brandGray5',
  borderHover: 'inset 0 0 0 1px $brandGray6',

  borderAccent: 'inset 0 0 0 1px $accent6',
  borderAccentActive: 'inset 0 0 0 1px $accent7',
  borderAccentHover: 'inset 0 0 0 1px $accent8',

  borderInput: 'inset 0 0 0 1px $brandGray4',
  borderInputActive: 'inset 0 0 0 1px $blue7',
  borderInputHover: 'inset 0 0 0 1px $blue8',

  borderGreen: 'inset 0 0 0 1px $accent6',
  borderGreenActive: 'inset 0 0 0 1px $accent7',
  borderGreenHover: 'inset 0 0 0 1px $accent8',

  borderRed: 'inset 0 0 0 1px $red6',
  borderRedActive: 'inset 0 0 0 1px $red7',
  borderRedHover: 'inset 0 0 0 1px $red8',

  selectableBorder: 'inset 0 0 0 1px $brandGray4',
  selectableBorderHover: 'inset 0 0 0 1px $brandGray6',
  selectableBorderActive: 'inset 0 0 0 3px $accent7',

  shadow: 'rgb(0 0 0 / 22%) 0px 1px 1px',
  shadowActive: 'rgb(0 0 0 / 25%) 0px 1px 1px',

  shadowButton: 'rgb(0 0 0 / 22%) 0px 1px 1px',
  shadowButtonFocus: 'rgb(0 0 0 / 25%) 0px 1px 1px',

  shadowPopup: 'rgb(0 0 0 / 18%) 0px 4px 24px',
  shadowPopupFocus: 'rgb(0 0 0 / 20%) 0px 4px 24px',

  shadowDialog: 'rgb(0 0 0 / 45%) 0px 16px 70px',
  shadowDialogFocus: 'rgb(0 0 0 / 50%) 0px 16px 70px',
}
