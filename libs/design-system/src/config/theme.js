const plugin = require('tailwindcss/plugin')
const { colors } = require('./colors')

module.exports = {
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: [
        'PlexSans',
        'Untitled Sans',
        '-apple-system',
        'system-ui',
        'sans-serif',
      ],
      mono: ['PlexMono', 'menlo', 'monospace'],
    },
    extend: {
      fontSize: {
        xxs: '0.625rem',
      },
      borderWidth: {
        3: '3px',
      },
      colors,
      boxShadow: {
        border: 'inset 0 0 0 1px rgba(0, 0, 0, 0.3)',
        active: '0 0 0 2px rgba(0, 0, 0, 0.3)',
        focus: '0 0 0 1px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        jiggle: 'jiggle 3s infinite',
        pingslow: 'pingslow 3s infinite',
      },
      keyframes: {
        scalein: {
          '0%': { opacity: 0, transform: 'scale(0.8)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        scaleout: {
          '0%': { opacity: 1, transform: 'scale(1)' },
          '100%': { opacity: 0, transform: 'scale(0.8)' },
        },
        jiggle: {
          '0%': { top: '0' },
          '10%': { top: '0' },
          '15%': { top: '5px' },
          '20%': { top: '0' },
          '30%': { top: '0' },
          '35%': { top: '5px' },
          '40%': { top: '0' },
          '100%': { top: '0' },
        },
        pingslow: {
          '0%': {
            transform: 'scale(1)',
            opacity: 1,
          },
          '60%': {
            transform: 'scale(1)',
            opacity: 1,
          },
          '90%': {
            transform: 'scale(2)',
            opacity: 0,
          },
          '100%': {
            transform: 'scale(2)',
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('open', '&[data-state="open"]')
    }),
    require('tailwind-scrollbar'),
  ],
}
