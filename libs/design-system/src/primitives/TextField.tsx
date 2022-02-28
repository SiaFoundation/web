import { styled } from '../config/theme'

export const TextField = styled('input', {
  appearance: 'none',
  borderWidth: '0',
  boxSizing: 'border-box',
  fontFamily: '$sans',
  '&[type=number]': {
    fontFamily: '$mono',
  },
  margin: '0',
  outline: 'none',
  padding: '0',
  width: '100%',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  '&::before': {
    boxSizing: 'border-box',
  },
  '&::after': {
    boxSizing: 'border-box',
  },

  // Custom
  backgroundColor: '$loContrast',
  boxShadow: 'inset 0 0 0 1px $colors$slate7',
  color: '$hiContrast',
  fontVariantNumeric: 'tabular-nums',

  '&:-webkit-autofill': {
    boxShadow:
      'inset 0 0 0 1px $colors$blue6, inset 0 0 0 100px $colors$primary4',
  },

  '&:-webkit-autofill::first-line': {
    fontFamily: '$untitled',
    color: '$hiContrast',
  },

  '&:focus': {
    boxShadow:
      'inset 0px 0px 0px 1px $colors$inputShadow, 0px 0px 0px 1px $colors$inputShadow',
    '&:-webkit-autofill': {
      boxShadow:
        'inset 0px 0px 0px 1px $colors$inputShadow, 0px 0px 0px 1px $colors$inputShadow, inset 0 0 0 100px $colors$primary4',
    },
  },
  '&::placeholder': {
    color: '$slate9',
  },
  '&:disabled': {
    pointerEvents: 'none',
    backgroundColor: '$slate2',
    color: '$slate8',
    cursor: 'not-allowed',
    '&::placeholder': {
      color: '$slate7',
    },
  },
  '&:read-only': {
    backgroundColor: '$slate2',
    '&:focus': {
      boxShadow: 'inset 0px 0px 0px 1px $colors$slate7',
    },
  },

  variants: {
    size: {
      '1': {
        borderRadius: '$1',
        height: '$5',
        fontSize: '$1',
        padding: '0 $1',
        lineHeight: '$sizes$5',
        '&:-webkit-autofill::first-line': {
          fontSize: '$1',
        },
        '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
          position: 'relative',
          right: '-4px',
        },
      },
      '2': {
        borderRadius: '$1',
        height: '$6',
        fontSize: '$3',
        padding: '0 $2',
        lineHeight: '$sizes$6',
        '&:-webkit-autofill::first-line': {
          fontSize: '$3',
        },
        '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
          position: 'relative',
          right: '-8px',
        },
      },
      '3': {
        borderRadius: '$1',
        height: '$7',
        fontSize: '$6',
        padding: '0 $2',
        lineHeight: '$sizes$7',
        '&:-webkit-autofill::first-line': {
          fontSize: '$7',
        },
        '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
          position: 'relative',
          right: '-8px',
        },
      },
    },
    noSpin: {
      true: {
        '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
        },

        '&[type=number]': {
          '-moz-appearance': 'textfield',
        },
      },
    },
    variant: {
      totalGhost: {
        padding: 0,
        boxShadow: 'none',
        backgroundColor: 'transparent',
        '@hover': {
          '&:hover': {
            boxShadow: 'none',
          },
        },
        '&:focus': {
          backgroundColor: 'none',
          boxShadow: 'none',
        },
        '&:disabled': {
          backgroundColor: 'transparent',
        },
        '&:read-only': {
          backgroundColor: 'transparent',
        },
      },
      ghost: {
        boxShadow: 'none',
        backgroundColor: 'transparent',
        '@hover': {
          '&:hover': {
            boxShadow: 'inset 0 0 0 1px $colors$slateA7',
          },
        },
        '&:focus': {
          backgroundColor: '$loContrast',
          boxShadow:
            'inset 0px 0px 0px 1px $colors$inputShadow, 0px 0px 0px 1px $colors$inputShadow',
        },
        '&:disabled': {
          backgroundColor: 'transparent',
        },
        '&:read-only': {
          backgroundColor: 'transparent',
        },
      },
    },
    state: {
      invalid: {
        boxShadow: 'inset 0 0 0 1px $colors$red7',
        '&:focus': {
          boxShadow:
            'inset 0px 0px 0px 1px $colors$red8, 0px 0px 0px 1px $colors$red8',
        },
      },
      valid: {
        boxShadow: 'inset 0 0 0 1px $colors$primary8',
        '&:focus': {
          boxShadow:
            'inset 0px 0px 0px 1px $colors$inputShadow, 0px 0px 0px 1px $colors$inputShadow',
        },
      },
    },
    cursor: {
      default: {
        cursor: 'default',
        '&:focus': {
          cursor: 'text',
        },
      },
      text: {
        cursor: 'text',
      },
    },
  },
  defaultVariants: {
    size: '1',
  },
})
