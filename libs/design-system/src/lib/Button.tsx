import { styled } from '../config/theme'

export const Button = styled('button', {
  all: 'unset',
  boxSizing: 'border-box',
  display: 'inline-flex',
  borderRadius: '$2',
  padding: '$4 $6',
  color: '$hiContrast',
  fontFamily: '$sans',
  fontWeight: '500',
  fontSize: '$2',
  cursor: 'pointer',

  variants: {
    variant: {
      primary: {
        backgroundColor: '$blue5',
      },
      secondary: {
        backgroundColor: '$gray5',
      },
      link: {
        backgroundColor: 'none',
        border: '1px solid $canvas',
      },
    },
  },
  defaultVariants: {
    variant: 'secondary',
  },
})
