const plugin = require('tailwindcss/plugin')

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
      colors: {
        mask: 'rgba(30, 169, 76, .3)',
        accent: {
          50: '#F6FFF9',
          100: '#E9FBEF',
          200: '#D5F2DE',
          300: '#C9EED4',
          400: '#BBE8C9',
          500: '#9BDAAE',
          600: '#71C48A',
          700: '#3EAA5F',
          800: '#05872D',
          900: '#056B24',
          1000: '#04511B',
          1100: '#011F0A',
        },
        accentdark: {
          50: '#05150A',
          100: '#051C0C',
          200: '#062811',
          300: '#073515',
          400: '#064018',
          500: '#075820',
          600: '#056824',
          700: '#077A2A',
          800: '#05872D',
          900: '#069F35',
          1000: '#2FA052',
          1100: '#D9F4E1',
        },
        gray: {
          50: 'hsl(206, 30.0%, 98.8%)',
          100: 'hsl(210, 16.7%, 97.6%)',
          200: 'hsl(209, 13.3%, 95.3%)',
          300: 'hsl(209, 12.2%, 93.2%)',
          400: 'hsl(208, 11.7%, 91.1%)',
          500: 'hsl(208, 11.3%, 88.9%)',
          600: 'hsl(207, 11.1%, 85.9%)',
          700: 'hsl(205, 10.7%, 78.0%)',
          800: 'hsl(206, 6.0%, 56.1%)',
          900: 'hsl(206, 5.8%, 52.3%)',
          1000: 'hsl(206, 6.0%, 43.5%)',
          1100: 'hsl(206, 24.0%, 9.0%)',
        },
        graydark: {
          50: 'hsl(200, 7.0%, 8.8%)',
          100: 'hsl(195, 7.1%, 11.0%)',
          200: 'hsl(197, 6.8%, 13.6%)',
          300: 'hsl(198, 6.6%, 15.8%)',
          400: 'hsl(199, 6.4%, 17.9%)',
          500: 'hsl(201, 6.2%, 20.5%)',
          600: 'hsl(203, 6.0%, 24.3%)',
          700: 'hsl(207, 5.6%, 31.6%)',
          800: 'hsl(206, 6.0%, 43.9%)',
          900: 'hsl(206, 5.2%, 49.5%)',
          1000: 'hsl(206, 6.0%, 63.0%)',
          1100: 'hsl(210, 6.0%, 93.0%)',
        },
      },
      boxShadow: {
        border: 'inset 0 0 0 1px rgba(0, 0, 0, 0.3)',
        active: '0 0 0 2px rgba(0, 0, 0, 0.3)',
        focus: '0 0 0 1px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        jiggle: 'jiggle 3s infinite',
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
