import { pulse } from '../config/animations'
import { styled, keyframes } from '../config/theme'

export const Skeleton = styled('div', {
  backgroundColor: '$slate4',
  position: 'relative',
  overflow: 'hidden',

  '&::after': {
    animationName: `${pulse}`,
    animationDuration: '500ms',
    animationDirection: 'alternate',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
    backgroundColor: '$slate6',
    borderRadius: 'inherit',
    bottom: 0,
    content: '""',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },

  variants: {
    variant: {
      avatar1: {
        borderRadius: '$round',
        height: '$3-5',
        width: '$3-5',
      },
      avatar2: {
        borderRadius: '$round',
        height: '$6',
        width: '$6',
      },
      avatar3: {
        borderRadius: '$round',
        height: '$8',
        width: '$8',
      },
      text: {
        height: '$1',
        borderRadius: '$1',
      },
      title: {
        height: '$3',
        borderRadius: '$1',
      },
      heading: {
        height: '$2',
        borderRadius: '$1',
      },
      button: {
        borderRadius: '$1',
        height: '$3',
        width: '$5',
      },
    },
  },
  defaultVariants: {
    variant: 'text',
  },
})
