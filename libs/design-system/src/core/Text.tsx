import { styled } from '../config/theme'

export const Text = styled('span', {
  boxSizing: 'border-box',
  color: '$textContrast',
  display: 'inline-block',
  fontFamily: '$sans',
  lineHeight: '1',

  variants: {
    font: {
      mono: {
        fontFamily: '$mono',
      },
      sans: {
        fontFamily: '$sans',
      },
    },
    color: {
      subtle: {
        color: '$textSubtle',
      },
      contrast: {
        color: '$textContrast',
      },
      lo: {
        color: '$loContrast',
      },
    },
    weight: {
      bold: {
        fontWeight: '600',
      },
      semibold: {
        fontWeight: '500',
      },
      regular: {
        fontWeight: '400',
      },
    },
    size: {
      '0': {
        fontSize: '$0',
      },
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
    },
    ellipsis: {
      true: {
        width: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },
  },

  defaultVariants: {
    weight: 'regular',
    font: 'sans',
    color: 'contrast',
    size: 2,
  },
})
