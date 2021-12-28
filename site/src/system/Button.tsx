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
        backgroundColor: 'blue',
      },
      secondary: {
        backgroundColor: 'gray',
      },
      link: {
        backgroundColor: 'none',
        border: '1px solid #444444',
      },
    },
  },
  defaultVariants: {
    variant: 'secondary',
  },
})
