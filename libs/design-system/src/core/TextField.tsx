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
  boxShadow: 'inset 0 0 0 1px $colors$accentInactive',
  color: '$hiContrast',
  fontVariantNumeric: 'tabular-nums',

  '&:-webkit-autofill': {
    boxShadow:
      'inset 0 0 0 1px $colors$blue6, inset 0 0 0 100px $colors$brandAccent4',
  },

  '&:-webkit-autofill::first-line': {
    fontFamily: '$untitled',
    color: '$hiContrast',
  },

  '&:focus': {
    boxShadow:
      'inset 0px 0px 0px 1px $colors$accentInput, 0px 0px 0px 1px $colors$accentInput',
    '&:-webkit-autofill': {
      boxShadow:
        'inset 0px 0px 0px 1px $colors$accentInput, 0px 0px 0px 1px $colors$accentInput, inset 0 0 0 100px $colors$brandAccent4',
    },
  },
  '&::placeholder': {
    color: '$brandGray9',
  },
  '&:disabled': {
    pointerEvents: 'none',
    backgroundColor: '$brandGray2',
    color: '$brandGray8',
    cursor: 'not-allowed',
    '&::placeholder': {
      color: '$brandGray7',
    },
  },
  '&:read-only': {
    backgroundColor: '$brandGray2',
    '&:focus': {
      boxShadow: 'inset 0px 0px 0px 1px $colors$brandGray7',
    },
  },

  variants: {
    size: {
      '1': {
        borderRadius: '$1',
        height: '$5',
        fontSize: '$0',
        padding: '0 $1',
        lineHeight: '$sizes$5',
        '&:-webkit-autofill::first-line': {
          fontSize: '$0',
        },
        '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
          position: 'relative',
          right: '-7px',
        },
      },
      '2': {
        borderRadius: '$1',
        height: '$7',
        fontSize: '$2',
        padding: '0 $2',
        lineHeight: '$sizes$7',
        '&:-webkit-autofill::first-line': {
          fontSize: '$2',
        },
        '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
          position: 'relative',
          right: '-13px',
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
            boxShadow: 'inset 0 0 0 1px $colors$brandGray7',
          },
        },
        '&:focus': {
          backgroundColor: '$loContrast',
          boxShadow:
            'inset 0px 0px 0px 1px $colors$accentInput, 0px 0px 0px 1px $colors$accentInput',
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
        boxShadow: 'inset 0 0 0 1px $colors$brandAccent8',
        '&:focus': {
          boxShadow:
            'inset 0px 0px 0px 1px $colors$accentInput, 0px 0px 0px 1px $colors$accentInput',
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
