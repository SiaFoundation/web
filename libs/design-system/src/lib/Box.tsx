import { styled } from '../config/theme'

export const Box = styled('div', {
  boxSizing: 'border-box',

  variants: {
    debug: {
      true: {
        border: '1px solid $siaGreenA12',
        borderRadius: '$1',
      },
    },
    fill: {
      true: {
        backgroundColor: '$siaGreenA12',
        borderRadius: '$1',
      },
    },
  },
})
