import { styled } from '../config/theme'
import * as SeparatorPrimitive from '@radix-ui/react-separator'

export const Separator = styled(SeparatorPrimitive.Root, {
  border: 'none',
  margin: 0,
  flexShrink: 0,
  backgroundColor: '$slate4',
  cursor: 'default',

  variants: {
    pad: {
      '0': {
        '&[data-orientation="horizontal"]': {
          my: 0,
        },

        '&[data-orientation="vertical"]': {
          mx: 0,
        },
      },
      '0-5': {
        '&[data-orientation="horizontal"]': {
          my: '$0-5',
        },

        '&[data-orientation="vertical"]': {
          mx: '$0-5',
        },
      },
      '1': {
        '&[data-orientation="horizontal"]': {
          my: '$1',
        },

        '&[data-orientation="vertical"]': {
          mx: '$1',
        },
      },
      '1-5': {
        '&[data-orientation="horizontal"]': {
          my: '$1-5',
        },

        '&[data-orientation="vertical"]': {
          mx: '$1-5',
        },
      },
      '2': {
        '&[data-orientation="horizontal"]': {
          my: '$2',
        },

        '&[data-orientation="vertical"]': {
          mx: '$2',
        },
      },
      '3': {
        '&[data-orientation="horizontal"]': {
          my: '$3',
        },

        '&[data-orientation="vertical"]': {
          mx: '$3',
        },
      },
      '4': {
        '&[data-orientation="horizontal"]': {
          my: '$4',
        },

        '&[data-orientation="vertical"]': {
          mx: '$4',
        },
      },
    },
    size: {
      '1': {
        '&[data-orientation="horizontal"]': {
          height: '1px',
          width: '$1',
        },

        '&[data-orientation="vertical"]': {
          width: '1px',
          height: '$1',
        },
      },
      '95': {
        '&[data-orientation="horizontal"]': {
          height: '1px',
          width: '95%',
        },

        '&[data-orientation="vertical"]': {
          width: '1px',
          height: '95%',
        },
      },
      '100': {
        '&[data-orientation="horizontal"]': {
          height: '1px',
          width: '100%',
        },

        '&[data-orientation="vertical"]': {
          width: '1px',
          height: '100%',
        },
      },
    },
  },
  defaultVariants: {
    pad: '1',
    size: '1',
  },
})
