import { globalCss } from './theme'
// import MetropolisSemiBold from '../assets/fonts/Metropolis/metropolis-semibold-webfont.woff2'

// Reset and normalize css
export const resetStyles = globalCss({
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
      src: `url('assets/fonts/Metropolis/metropolis-regular-webfont.woff2')`,
      fontWeight: '400',
      fontStyle: 'normal',
    },
    {
      fontFamily: 'Metropolis',
      src: `url('assets/fonts/Metropolis/metropolis-medium-webfont.woff2')`,
      fontWeight: '500',
      fontStyle: 'normal',
    },
    {
      fontFamily: 'Metropolis',
      src: `url('assets/fonts/Metropolis/metropolis-semi-bold-webfont.woff2')`,
      fontWeight: '600',
      fontStyle: 'normal',
    },
  ],
})
