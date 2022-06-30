import { styled } from '../config/theme'

export const Container = styled('div', {
  boxSizing: 'border-box',
  flexShrink: 0,
  margin: '0 auto',
  width: '100%',
  padding: '0 $2-5',
  '@bp2': {
    padding: '0 $5',
  },

  variants: {
    size: {
      '1': {
        maxWidth: '450px',
      },
      '2': {
        maxWidth: '715px',
      },
      '3': {
        maxWidth: '1145px',
      },
      '4': {
        maxWidth: '1920px',
      },
      flush: {
        maxWidth: 'none',
        padding: '0',
        '@bp2': {
          padding: '0',
        },
      },
    },
  },
  defaultVariants: {
    size: '3',
  },
})
