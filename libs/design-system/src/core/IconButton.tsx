import { styled } from '../config/theme'

export const IconButton = styled('button', {
  alignItems: 'center',
  appearance: 'none',
  borderWidth: '0',
  boxSizing: 'border-box',
  display: 'inline-flex',
  flexShrink: 0,
  fontFamily: 'inherit',
  justifyContent: 'center',
  lineHeight: '1',
  outline: 'none',
  padding: '0',
  textDecoration: 'none',
  userSelect: 'none',
  WebkitTapHighlightColor: 'transparent',
  color: '$hiContrast',

  '&::before': {
    boxSizing: 'border-box',
  },
  '&::after': {
    boxSizing: 'border-box',
  },

  variants: {
    size: {
      '1': {
        borderRadius: '$1',
        height: '$3-5',
        width: '$3-5',
        fontSize: '$10',
        lineHeight: '$sizes$3-5',
      },
      '2': {
        borderRadius: '$1',
        height: '$5',
        width: '$5',
        fontSize: '$16',
        lineHeight: '$sizes$5',
      },
      '3': {
        borderRadius: '$1',
        height: '$6',
        width: '$6',
        fontSize: '$20',
        lineHeight: '$sizes$6',
      },
    },
    variant: {
      gray: {
        backgroundColor: '$control',
        boxShadow: '$colors$border, $colors$shadow',
        '@hover': {
          '&:hover': {
            backgroundColor: '$controlHover',
            boxShadow: '$colors$borderActive, $colors$shadow',
          },
        },
        '&:active': {
          backgroundColor: '$controlActive',
          boxShadow: '$colors$borderActive, $colors$shadow',
        },
        '&:focus': {
          boxShadow: '$colors$borderActive, $colors$shadowActive',
        },
        '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
          {
            backgroundColor: '$controlActive',
            boxShadow: '$colors$borderActive, $colors$shadow',
          },

        '&:disabled': {
          backgroundColor: '$control',
          boxShadow: '$colors$border, $colors$shadow',
          color: '$textDisabled',
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        '@hover': {
          '&:hover': {
            boxShadow: '$colors$borderActive, $colors$shadow',
          },
        },
        '&:active': {
          backgroundColor: '$control',
          boxShadow: '$colors$borderActive, $colors$shadow',
        },
        '&:focus': {
          boxShadow: '$colors$borderActive, $colors$shadowActive',
        },
        '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
          {
            backgroundColor: '$slate4',
            boxShadow: '$colors$borderActive, $colors$shadow',
          },
        '&:disabled': {
          boxShadow: 'none',
          color: '$textDisabled',
        },
      },
    },
  },
  defaultVariants: {
    size: '2',
    variant: 'ghost',
  },
})
