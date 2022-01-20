import { styled } from '../config/theme'

export const Text = styled('span', {
  boxSizing: 'border-box',
  color: '$text',
  display: 'inline-block',
  fontFamily: '$sans',
  fontWeight: 400,
  lineHeight: '1',

  variants: {
    size: {
      '1': {
        fontSize: '$1',
      },
      '2': {
        fontSize: '$2',
      },
      '3': {
        fontSize: '$3',
      },
      '4': {
        fontSize: '$4',
      },
      '5': {
        fontSize: '$5',
      },
      '6': {
        fontSize: '$6',
      },
      '7': {
        fontSize: '$7',
      },
      '8': {
        fontSize: '$8',
      },
      '9': {
        fontSize: '$9',
      },
    },
  },

  defaultVariants: {
    size: 3,
  },
})
