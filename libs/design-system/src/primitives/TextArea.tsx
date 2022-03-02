import { styled } from '../config/theme'

export const TextArea = styled('textarea', {
  appearance: 'none',
  borderWidth: '0',
  fontFamily: '$sans',
  margin: '0',
  outline: 'none',
  padding: '$1',
  width: '100%',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  backgroundColor: '$loContrast',
  boxShadow: 'inset 0 0 0 1px $colors$accentInactive',
  color: '$hiContrast',
  fontVariantNumeric: 'tabular-nums',
  position: 'relative',
  minHeight: 80,
  resize: 'vertical',

  '&:focus': {
    boxShadow:
      'inset 0px 0px 0px 1px $colors$accentInput, 0px 0px 0px 1px $colors$accentInput',
    zIndex: '1',
  },
  '&::placeholder': {
    color: '$slate7',
  },
  '&:disabled': {
    pointerEvents: 'none',
    backgroundColor: '$slate2',
    color: '$accentActive',
    cursor: 'not-allowed',
    resize: 'none',
    '&::placeholder': {
      color: '$slate7',
    },
  },
  '&:read-only': {
    backgroundColor: '$slate2',
    '&:focus': {
      boxShadow: 'inset 0px 0px 0px 1px $colors$accentInactive',
    },
  },

  variants: {
    size: {
      '1': {
        borderRadius: '$1',
        fontSize: '$1',
        lineHeight: '16px',
        px: '$1',
      },
      '2': {
        borderRadius: '$1',
        fontSize: '$2',
        lineHeight: '20px',
        px: '$1',
      },
      '3': {
        borderRadius: '$1',
        fontSize: '$3',
        lineHeight: '23px',
        px: '$2',
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
