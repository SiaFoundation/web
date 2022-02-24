import { styled } from '../config/theme'
import * as SeparatorPrimitive from '@radix-ui/react-separator'

export const Separator = styled(SeparatorPrimitive.Root, {
  border: 'none',
  margin: 0,
  flexShrink: 0,
  backgroundColor: '$slate4',
  cursor: 'default',

  variants: {
    size: {
      '1': {
        '&[data-orientation="horizontal"]': {
          height: '1px',
          width: '$3',
        },

        '&[data-orientation="vertical"]': {
          width: '1px',
          height: '$3',
        },
      },
      '2': {
        '&[data-orientation="horizontal"]': {
          height: '1px',
          width: '$7',
        },

        '&[data-orientation="vertical"]': {
          width: '1px',
          height: '$7',
        },
      },
      '3': {
        '&[data-orientation="horizontal"]': {
          height: '1px',
          width: '100%',
          my: '$3',
        },

        '&[data-orientation="vertical"]': {
          width: '1px',
          mx: '$3',
        },
      },
      '4': {
        '&[data-orientation="horizontal"]': {
          height: '1px',
          width: '100%',
          my: '$8',
        },

        '&[data-orientation="vertical"]': {
          width: '1px',
          mx: '$8',
        },
      },
    },
  },
  defaultVariants: {
    size: '1',
  },
})
