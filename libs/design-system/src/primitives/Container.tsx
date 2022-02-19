import { styled } from '../config/theme'

export const Container = styled('div', {
  boxSizing: 'border-box',
  flexShrink: 0,
  margin: '0 auto',
  padding: '0 $3',
  '@bp2': {
    padding: '0 $5',
  },

  variants: {
    size: {
      '1': {
        maxWidth: '430px',
      },
      '2': {
        maxWidth: '715px',
      },
      '3': {
        maxWidth: '1145px',
      },
      '4': {
        maxWidth: 'none',
      },
    },
  },
  defaultVariants: {
    size: '4',
  },
})
