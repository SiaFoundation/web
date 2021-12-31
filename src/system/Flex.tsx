import { styled } from '../config/theme'

export const Flex = styled('div', {
  boxSizing: 'border-box',
  display: 'flex',

  variants: {
    row: {
      true: {
        flexDirection: 'row',
      },
    },
    column: {
      true: {
        flexDirection: 'column',
      },
    },
  },
  defaultVariants: {
    row: 'true',
  },
})
