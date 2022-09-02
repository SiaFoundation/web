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
  boxShadow: '$colors$borderInput, $colors$shadow',
  color: '$hiContrast',
  fontVariantNumeric: 'tabular-nums',
  position: 'relative',
  minHeight: 80,
  resize: 'vertical',

  '&:focus': {
    boxShadow:
      '$colors$borderFocus, $colors$borderInputActive, $colors$shadowActive',
    zIndex: '1',
  },
  '&::placeholder': {
    color: '$gray7',
  },
  '&:disabled': {
    pointerEvents: 'none',
    backgroundColor: '$gray2',
    color: '$accentActive',
    cursor: 'not-allowed',
    resize: 'none',
    '&::placeholder': {
      color: '$gray7',
    },
  },
  '&:read-only': {
    backgroundColor: '$gray2',
    boxShadow: '$colors$borderInput, $colors$shadow',
    '&:focus': {
      boxShadow:
        '$colors$borderFocus, $colors$borderInputActive, $colors$shadowActive',
    },
  },

  variants: {
    size: {
      '1': {
        borderRadius: '$1',
        px: '$1',
        fontSize: '$12',
        lineHeight: '150%',
      },
      '2': {
        borderRadius: '$1',
        fontSize: '$16',
        lineHeight: '150%',
        px: '$1',
      },
    },
    state: {
      invalid: {
        boxShadow: '$colors$borderRed, $colors$shadow',
        '&:focus': {
          boxShadow:
            '$colors$borderFocus, $colors$borderRedActive, $colors$shadowActive',
        },
      },
      valid: {
        boxShadow: '$colors$borderGreen, $colors$shadow',
        '&:focus': {
          boxShadow:
            '$colors$borderFocus, $colors$borderGreenActive, $colors$shadowActive',
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
