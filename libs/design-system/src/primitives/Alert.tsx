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
  borderRadius: '$2',

  variants: {
    size: {
      '1': {
        p: '$3',
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
        backgroundColor: '$primary2',
        borderColor: '$primary8',
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
