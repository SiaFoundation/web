import { styled } from '../config/theme'

export const Box = styled('div', {
  boxSizing: 'border-box',

  variants: {
    debug: {
      true: {
        border: '1px solid $brandAccent9',
        borderRadius: '$1',
      },
    },
    fill: {
      true: {
        backgroundColor: '$brandAccent9',
        borderRadius: '$1',
      },
    },
  },
})
