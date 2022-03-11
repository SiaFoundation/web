import * as colorsExt from './colorsExt'

export const colors = {
  ...colorsExt.colors,

  // brandAccent - light mode

  brandAccent1: '#F6FFF9',
  brandAccent2: '#E9FBEF',
  brandAccent3: '#D5F2DE',
  brandAccent4: '#C9EED4',
  brandAccent5: '#BBE8C9',
  brandAccent6: '#9BDAAE',
  brandAccent7: '#71C48A',
  brandAccent8: '#3EAA5F',
  brandAccent9: '#05872D',
  brandAccent10: '#056B24',
  brandAccent11: '#04511B',
  brandAccent12: '#011F0A',

  // brandGray - light mode
  brandGray1: '#FAFAFA',
  brandGray2: '#F3F2F2',
  brandGray3: '#EAEAEA',
  brandGray4: '#DFDFDF',
  brandGray5: '#D1D1D1',
  brandGray6: '#C2C2C2',
  brandGray7: '#B4B4B4',
  brandGray8: '#A2A2A2',
  brandGray9: '#8F8F8F',
  brandGray10: '#787878',
  brandGray11: '#555555',
  brandGray12: '#333333',

  // Semantic
  waves: '#FAF8F7',
  hiContrast: '$slate12',
  textContrast: '$brandGray12',
  textSubtle: '$brandGray11',
  // loContrast: '$brandGray1',
  loContrast: 'white',
  canvas: 'hsl(0 0% 93%)',
  panel: 'white',
  panelDark: 'black',
  transparentPanel: 'hsl(0 0% 0% / 97%)',
  accentInactive: '$brandGray7',
  accentActive: '$brandGray8',
  accentInput: '$brandAccent8',
  frame: 'black',
}

export const colorsDark = {
  ...colorsExt.colorsDark,

  // brandAccent - dark mode
  brandAccent1: '#05150A',
  brandAccent2: '#051C0C',
  brandAccent3: '#062811',
  brandAccent4: '#073515',
  brandAccent5: '#064018',
  brandAccent6: '#075820',
  brandAccent7: '#056824',
  brandAccent8: '#077A2A',
  brandAccent9: '#05872D',
  brandAccent10: '#069F35',
  brandAccent11: '#2FA052',
  brandAccent12: '#D9F4E1',

  // brandGray - dark mode
  brandGray1: '#1B1B1B',
  brandGray2: '#232323',
  brandGray3: '#2D2D2D',
  brandGray4: '#3C3C3C',
  brandGray5: '#4D4D4D',
  brandGray6: '#636363',
  brandGray7: '#737373',
  brandGray8: '#8B8B8B',
  brandGray9: '#9E9E9E',
  brandGray10: '#B6B6B6',
  brandGray11: '#C8C8C8',
  brandGray12: '#FDFDFD',

  // Semantic
  waves: '$slate3',
  hiContrast: '$brandGray12',
  loContrast: '$brandGray1',
  textContrast: '$brandGray12',
  textSubtle: '$brandGray11',
  canvas: 'hsl(0 0% 15%)',
  panel: '$mauve3',
  panelDark: 'black',
  transparentPanel: 'hsl(0 100% 100% / 97%)',
  accentInactive: '$brandGray7',
  accentActive: '$brandGray8',
  accentInput: '$brandAccent8',
  frame: '$whiteA12',
}
