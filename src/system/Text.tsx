import { styled } from '../config/theme'

export const Text = styled('span', {
  boxSizing: 'border-box',
  color: '$hiContrast',
  display: 'inline-block',
  fontFamily: '$sans',
  fontWeight: '500',
  lineHeight: '$2',
  fontSize: '$2',

  variants: {
    size: {
      1: {
        lineHeight: '$1',
        fontSize: '$1',
      },
      2: {
        lineHeight: '$2',
        fontSize: '$2',
      },
      3: {
        lineHeight: '$3',
        fontSize: '$3',
      },
    },
    clip: {
      true: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },
    interactive: {
      true: {
        cursor: 'pointer',
        '&:hover': {
          textDecoration: 'underline',
        },
      },
    },
  },

  defaultVariants: {
    size: 2,
  },
})
