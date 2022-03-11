import { styled } from '../config/theme'

export const IconButton = styled('button', {
  alignItems: 'center',
  appearance: 'none',
  borderWidth: '0',
  boxSizing: 'border-box',
  display: 'inline-flex',
  flexShrink: 0,
  fontFamily: 'inherit',
  fontSize: '14px',
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
  backgroundColor: '$loContrast',
  border: '1px solid $accentInactive',
  '@hover': {
    '&:hover': {
      borderColor: '$accentActive',
    },
  },
  '&:active': {
    backgroundColor: '$brandGray2',
  },
  '&:focus': {
    borderColor: '$accentActive',
    boxShadow: '0 0 0 1px $colors$accentActive',
  },
  '&:disabled': {
    pointerEvents: 'none',
    color: '$slate6',
  },

  variants: {
    size: {
      '1': {
        borderRadius: '$1',
        height: '$5',
        width: '$5',
        fontSize: '$0',
        lineHeight: '$sizes$5',
      },
      '2': {
        borderRadius: '$2',
        height: '$7',
        width: '$7',
        fontSize: '$2',
        lineHeight: '$sizes$7',
      },
      '3': {
        borderRadius: '$2',
        height: '$8',
        width: '$8',
        fontSize: '$4',
        lineHeight: '$sizes$8',
      },
    },
    variant: {
      ghost: {
        backgroundColor: 'transparent',
        borderWidth: '0',
        '@hover': {
          '&:hover': {
            // backgroundColor: '$brandGray3',
            backgroundColor: 'transparent',
          },
        },
        '&:focus': {
          boxShadow:
            'inset 0 0 0 1px $colors$brandGray8, 0 0 0 1px $colors$brandGray8',
        },
        '&:active': {
          // backgroundColor: '$brandGray4',
          backgroundColor: 'transparent',
        },
        '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
          {
            // backgroundColor: '$brandGray4',
            backgroundColor: 'transparent',
          },
      },
      raised: {
        boxShadow:
          '0 0 transparent, 0 16px 32px hsl(206deg 12% 5% / 25%), 0 3px 5px hsl(0deg 0% 0% / 10%)',
        '@hover': {
          '&:hover': {
            boxShadow:
              '0 0 transparent, 0 16px 32px hsl(206deg 12% 5% / 25%), 0 3px 5px hsl(0deg 0% 0% / 10%)',
          },
        },
        '&:focus': {
          borderColor: '$accentActive',
          boxShadow:
            '0 0 0 1px $colors$accentActive, 0 16px 32px hsl(206deg 12% 5% / 25%), 0 3px 5px hsl(0deg 0% 0% / 10%)',
        },
        '&:active': {
          backgroundColor: '$slate4',
        },
      },
    },
    state: {
      active: {
        backgroundColor: '$slate4',
        boxShadow: 'inset 0 0 0 1px hsl(206,10%,76%)',
        '@hover': {
          '&:hover': {
            boxShadow: 'inset 0 0 0 1px hsl(206,10%,76%)',
          },
        },
        '&:active': {
          backgroundColor: '$slate4',
        },
      },
      waiting: {
        backgroundColor: '$slate4',
        boxShadow: 'inset 0 0 0 1px hsl(206,10%,76%)',
        '@hover': {
          '&:hover': {
            boxShadow: 'inset 0 0 0 1px hsl(206,10%,76%)',
          },
        },
        '&:active': {
          backgroundColor: '$slate4',
        },
      },
    },
  },
  defaultVariants: {
    size: '1',
    variant: 'ghost',
  },
})
