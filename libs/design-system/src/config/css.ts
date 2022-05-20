import { globalCss } from './theme'
import { fontStyles } from './fonts'
import { comboBoxGlobalCss } from '../core/ComboBox'

// Reset, normalize, fonts css
const globalStyles = globalCss({
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },

  body: {
    margin: 0,
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    lineHeight: 1,
    overflow: 'hidden',
  },

  'html, body, #root, #__next, #__next > div, .theme-0': {
    height: '100%',
  },

  '#__next': {
    position: 'relative',
    zIndex: 0,
  },

  'h1, h2, h3, h4, h5, h6, p, span, ul, li': {
    padding: 0,
    margin: 0,
  },
})

export function useGlobalStyles() {
  globalStyles()
  fontStyles()
  comboBoxGlobalCss()
}
