import { globalCss } from './theme'

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

  '@font-face': [
    {
      fontFamily: 'Metropolis',
      src: `url('fonts/Metropolis/metropolis-regular-webfont.woff2') format('woff2'), url('fonts/Metropolis/metropolis-regular-webfont.woff') format('woff')`,
      fontWeight: '400',
      fontStyle: 'normal',
    },
    {
      fontFamily: 'Metropolis',
      src: `url('fonts/Metropolis/metropolis-medium-webfont.woff2') format('woff2'), url('fonts/Metropolis/metropolis-medium-webfont.woff') format('woff')`,
      fontWeight: '500',
      fontStyle: 'normal',
    },
    {
      fontFamily: 'Metropolis',
      src: `url('fonts/Metropolis/metropolis-semibold-webfont.woff2') format('woff2'), url('fonts/Metropolis/metropolis-semibold-webfont.woff') format('woff')`,
      fontWeight: '600',
      fontStyle: 'normal',
    },
  ],
})

// !important is necessary to override the packages default styles (above)
const globalToastStyles = globalCss({
  '@import': 'react-toastify/dist/ReactToastify.minimal.css',

  '.Toastify__toast-container--bottom-right': {
    bottom: '20px !important',
    right: '36px !important',
  },

  '.Toastify__toast--default': {
    backgroundColor: '$panel !important',
    border: '1px solid $panel !important',
    minHeight: 'inherit !important',
    /* box-shadow: 0 1px 10px 0 var(--colors-panel), 0 2px 15px 0 var(--colors-panel); */
  },

  '.Toastify__toast--warning': {
    backgroundColor: '$yellow4 !important',
    border: '1px solid $yellow8 !important',
    minHeight: 'inherit !important',
    /* box-shadow: 0 1px 10px 0 var(--colors-panel), 0 2px 15px 0 var(--colors-panel); */
  },

  '.Toastify__toast--error': {
    backgroundColor: '$red10 !important',
    border: '1px solid $panel !important',
    minHeight: 'inherit !important',
    /* box-shadow: 0 1px 10px 0 var(--colors-panel), 0 2px 15px 0 var(--colors-panel); */
  },

  '.Toastify__toast:last-of-type': {
    marginBottom: '0 !important',
  },

  '.Toastify__toast-body': {
    // some reason $ color does not work
    color: 'var(--colors-hiContrast) !important',
    opacity: '0.7 !important',
  },

  '.Toastify__close-button--default': {
    // some reason $ color does not work
    color: 'var(--colors-gray-5) !important',
  },
})

export function initGlobalStyles() {
  globalStyles()
  globalToastStyles()
}
