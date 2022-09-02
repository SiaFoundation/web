import { styled } from '../config/theme'

export const Alert = styled('div', {
  boxSizing: 'border-box',
  '&::before': {
    boxSizing: 'border-box',
  },
  '&::after': {
    boxSizing: 'border-box',
  },

  border: '1px solid',
  borderRadius: '$1',

  variants: {
    size: {
      '1': {
        p: '$2',
      },
    },
    variant: {
      loContrast: {
        backgroundColor: '$loContrast',
        borderColor: '$slate6',
      },
      gray: {
        backgroundColor: '$slate2',
        borderColor: '$slate6',
      },
      green: {
        backgroundColor: '$accent2',
        borderColor: '$accent8',
      },
      red: {
        backgroundColor: '$red2',
        borderColor: '$red6',
      },
    },
  },
  defaultVariants: {
    size: '1',
    variant: 'gray',
  },
})
