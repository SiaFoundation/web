import { styled } from '../config/theme'

export const Button = styled('button', {
  all: 'unset',
  boxSizing: 'border-box',
  display: 'inline-block',
  borderRadius: '$2',
  color: '$hiContrast',
  fontFamily: '$sans',
  fontWeight: '500',
  cursor: 'pointer',
  textAlign: 'center',

  variants: {
    variant: {
      primary: {
        backgroundColor: '$siaGreen',
        color: '$loContrast',

        '&:hover': {
          background:
            'linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.12)), $siaGreen',
        },
      },
      secondary: {
        backgroundColor: '$loContrast',
        border: '1px solid $gray5',
        color: '$hiContrast',
        '&:hover': {
          borderColor: '$siaGreenLight',
        },
      },
      link: {
        backgroundColor: 'none',
        border: '1px solid $canvas',
      },
    },

    size: {
      '1': {
        fontSize: '$1',
        padding: '$2 $3',
      },
      '2': {
        fontSize: '$5',
        padding: '$4 $6',
      },
    },
  },
  defaultVariants: {
    variant: 'secondary',
    size: '1',
  },
})
