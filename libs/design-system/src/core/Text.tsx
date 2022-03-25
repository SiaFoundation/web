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
      accent: {
        color: '$brandAccent11',
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
      '10': {
        fontSize: '$10',
      },
      '12': {
        fontSize: '$12',
      },
      '14': {
        fontSize: '$14',
      },
      '16': {
        fontSize: '$16',
      },
      '18': {
        fontSize: '$18',
      },
      '20': {
        fontSize: '$20',
      },
      '24': {
        fontSize: '$24',
      },
      '32': {
        fontSize: '$32',
      },
      '40': {
        fontSize: '$40',
      },
      '64': {
        fontSize: '$64',
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
    size: '14',
  },
})
