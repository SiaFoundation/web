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
          width: '$2',
        },

        '&[data-orientation="vertical"]': {
          width: '1px',
          height: '$2',
        },
      },
      '2': {
        '&[data-orientation="horizontal"]': {
          height: '1px',
          width: '$4',
        },

        '&[data-orientation="vertical"]': {
          width: '1px',
          height: '$4',
        },
      },
      '3': {
        '&[data-orientation="horizontal"]': {
          height: '1px',
          width: '100%',
          my: '$2',
        },

        '&[data-orientation="vertical"]': {
          width: '1px',
          mx: '$2',
        },
      },
      '4': {
        '&[data-orientation="horizontal"]': {
          height: '1px',
          width: '100%',
          my: '$5',
        },

        '&[data-orientation="vertical"]': {
          width: '1px',
          mx: '$5',
        },
      },
    },
  },
  defaultVariants: {
    size: '1',
  },
})
