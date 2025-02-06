const plugin = require('tailwindcss/plugin')
const { fontFamily } = require('tailwindcss/defaultTheme')
const { colors } = require('./theme-colors')

module.exports = {
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['var(--font-sans)', ...fontFamily.sans],
      mono: ['var(--font-mono)', ...fontFamily.mono],
    },
    extend: {
      fontSize: {
        xxs: '0.625rem',
      },
      borderWidth: {
        3: '3px',
      },
      colors,
      containers: {
        '2xs': '18rem',
        '3xs': '16rem',
      },
      boxShadow: {
        border: 'inset 0 0 0 1px rgba(0, 0, 0, 0.3)',
        'border-2': 'inset 0 0 0 2px rgba(0, 0, 0, 0.3)',
        'border-b': 'inset 0 -1px rgba(0, 0, 0, 0.3)',
        'border-t': 'inset 0 1px rgba(0, 0, 0, 0.3)',
        'border-l': 'inset 1px 0 rgba(0, 0, 0, 0.3)',
        'border-r': 'inset -1px 0 rgba(0, 0, 0, 0.3)',
        'border-tlb':
          'inset 0 1px 0 0 rgba(0, 0, 0, 0.3), inset 1px 0 0 0 rgba(0, 0, 0, 0.3), inset 0 -1px 0 0 rgba(0, 0, 0, 0.3)',
        'border-trb':
          'inset 0 1px 0 0 rgba(0, 0, 0, 0.3), inset -1px 0 0 0 rgba(0, 0, 0, 0.3), inset 0 -1px 0 0 rgba(0, 0, 0, 0.3)',
        'border-y':
          'inset 0 1px 0 0 rgba(0, 0, 0, 0.3), inset 0 -1px 0 0 rgba(0, 0, 0, 0.3)',
        active: '0 0 0 2px rgba(0, 0, 0, 0.3)',
        focus: '0 0 0 1px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        jiggle: 'jiggle 3s infinite',
        pingslow: 'pingslow 3s infinite',
        pulselight: 'pulselight 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        // navmenu
        scaleIn: 'scaleIn 200ms ease',
        scaleOut: 'scaleOut 200ms ease',
        fadeIn: 'fadeIn 200ms ease',
        fadeOut: 'fadeOut 200ms ease',
        enterFromLeft: 'enterFromLeft 250ms ease',
        enterFromRight: 'enterFromRight 250ms ease',
        exitToLeft: 'exitToLeft 250ms ease',
        exitToRight: 'exitToRight 250ms ease',
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
        pulselight: {
          '30%': { opacity: 1 },
          '50%': { opacity: 0.2 },
          '70%': { opacity: 1 },
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
        // navmenu
        enterFromRight: {
          from: { opacity: 0, transform: 'translateX(200px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        enterFromLeft: {
          from: { opacity: 0, transform: 'translateX(-200px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        exitToRight: {
          from: { opacity: 1, transform: 'translateX(0)' },
          to: { opacity: 0, transform: 'translateX(200px)' },
        },
        exitToLeft: {
          from: { opacity: 1, transform: 'translateX(0)' },
          to: { opacity: 0, transform: 'translateX(-200px)' },
        },
        scaleIn: {
          from: { opacity: 0, transform: 'rotateX(-10deg) scale(0.9)' },
          to: { opacity: 1, transform: 'rotateX(0deg) scale(1)' },
        },
        scaleOut: {
          from: { opacity: 1, transform: 'rotateX(0deg) scale(1)' },
          to: { opacity: 0, transform: 'rotateX(-10deg) scale(0.95)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('open', '&[data-state="open"]')
    }),
    require('tailwind-scrollbar'),
    require('tailwindcss-text-fill'),
    require('tailwindcss-shadow-fill'),
    require('./plugins/animation-delay'),
    require('@tailwindcss/container-queries'),
    // navmenu
    plugin(({ matchUtilities }) => {
      matchUtilities({
        perspective: (value) => ({
          perspective: value,
        }),
      })
    }),
  ],
}
