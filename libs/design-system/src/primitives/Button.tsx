import { styled } from '../config/theme'
import { ControlGroupBase } from './ControlGroupBase'

export const Button = styled('button', {
  all: 'unset',
  alignItems: 'center',
  boxSizing: 'border-box',
  userSelect: 'none',
  '&::before': {
    boxSizing: 'border-box',
  },
  '&::after': {
    boxSizing: 'border-box',
  },

  // Custom reset?
  display: 'inline-flex',
  flexShrink: 0,
  justifyContent: 'center',
  lineHeight: '1',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',

  // Custom
  height: '$5',
  px: '$2',
  fontFamily: '$sans',
  fontSize: '$2',
  fontWeight: 500,
  fontVariantNumeric: 'tabular-nums',

  variants: {
    size: {
      '1': {
        borderRadius: '$1',
        height: '$5',
        px: '$2',
        fontSize: '$1',
        lineHeight: '1',
      },
      '2': {
        borderRadius: '$2',
        height: '$6',
        px: '$3',
        fontSize: '$3',
        lineHeight: '1',
      },
      '3': {
        borderRadius: '$2',
        height: '$7',
        px: '$4',
        fontSize: '$4',
        lineHeight: '1',
      },
    },
    variant: {
      gray: {
        backgroundColor: '$loContrast',
        boxShadow: 'inset 0 0 0 1px $colors$accentInactive',
        color: '$hiContrast',
        '@hover': {
          '&:hover': {
            boxShadow: 'inset 0 0 0 1px $colors$accentActive',
          },
        },
        '&:active': {
          backgroundColor: '$slate2',
          boxShadow: 'inset 0 0 0 1px $colors$accentActive',
        },
        '&:focus': {
          boxShadow:
            'inset 0 0 0 1px $colors$accentActive, 0 0 0 1px $colors$accentActive',
        },
        '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
          {
            backgroundColor: '$slate4',
            boxShadow: 'inset 0 0 0 1px $colors$accentActive',
          },

        '&:disabled': {
          backgroundColor: '$slate2',
          boxShadow: 'inset 0 0 0 1px $colors$accentInactive',
          color: '$slate8',
          pointerEvents: 'none',
        },
      },
      green: {
        // backgroundColor: '$loContrast',
        backgroundColor: '$primary12',
        boxShadow: 'inset 0 0 0 1px $colors$primary7',
        // color: '$primary12',
        color: '$whiteA12',
        '@hover': {
          '&:hover': {
            boxShadow: 'inset 0 0 0 1px $colors$primary8',
          },
        },
        '&:active': {
          backgroundColor: '$primary7',
          boxShadow: 'inset 0 0 0 1px $colors$primary8',
        },
        '&:focus': {
          boxShadow:
            'inset 0 0 0 1px $colors$primary8, 0 0 0 1px $colors$primary8',
        },
        '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
          {
            backgroundColor: '$primary8',
            boxShadow: 'inset 0 0 0 1px $colors$primary9',
          },
        '&:disabled': {
          backgroundColor: '$primary6',
          boxShadow: 'inset 0 0 0 1px $colors$primary4',
        },
        [`${ControlGroupBase} > &`]: {
          // same as green+ghost compound variant
          color: '$primary12',
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          '@hover': {
            '&:hover': {
              backgroundColor: '$greenA3',
              boxShadow: 'none',
            },
          },
          '&:active': {
            backgroundColor: '$greenA4',
          },
          '&:focus': {
            boxShadow:
              'inset 0 0 0 1px $colors$greenA8, 0 0 0 1px $colors$greenA8',
          },
          '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
            {
              backgroundColor: '$primary8',
              boxShadow: 'none',
            },
        },
      },
      red: {
        backgroundColor: '$loContrast',
        boxShadow: 'inset 0 0 0 1px $colors$accentInactive',
        color: '$red11',
        '@hover': {
          '&:hover': {
            boxShadow: 'inset 0 0 0 1px $colors$accentActive',
          },
        },
        '&:active': {
          backgroundColor: '$red3',
          boxShadow: 'inset 0 0 0 1px $colors$red8',
        },
        '&:focus': {
          boxShadow: 'inset 0 0 0 1px $colors$red8, 0 0 0 1px $colors$red8',
        },
        '&:disabled': {
          color: '$red8',
        },
        '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
          {
            backgroundColor: '$red4',
            boxShadow: 'inset 0 0 0 1px $colors$red8',
          },
      },
      transparentWhite: {
        backgroundColor: 'hsla(0,100%,100%,.2)',
        color: 'white',
        '@hover': {
          '&:hover': {
            backgroundColor: 'hsla(0,100%,100%,.25)',
          },
        },
        '&:active': {
          backgroundColor: 'hsla(0,100%,100%,.3)',
        },
        '&:focus': {
          boxShadow:
            'inset 0 0 0 1px hsla(0,100%,100%,.35), 0 0 0 1px hsla(0,100%,100%,.35)',
        },
      },
      transparentBlack: {
        backgroundColor: 'hsla(0,0%,0%,.2)',
        color: 'black',
        '@hover': {
          '&:hover': {
            backgroundColor: 'hsla(0,0%,0%,.25)',
          },
        },
        '&:active': {
          backgroundColor: 'hsla(0,0%,0%,.3)',
        },
        '&:focus': {
          boxShadow:
            'inset 0 0 0 1px hsla(0,0%,0%,.35), 0 0 0 1px hsla(0,0%,0%,.35)',
        },
      },
    },
    state: {
      waiting: {
        pointerEvents: 'none',
      },
    },
    ghost: {
      true: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        '&:disabled': {
          boxShadow: 'none',
        },
      },
    },
  },
  compoundVariants: [
    {
      variant: 'gray',
      ghost: 'true',
      css: {
        backgroundColor: 'transparent',
        color: '$hiContrast',
        '@hover': {
          '&:hover': {
            backgroundColor: '$slateA3',
            boxShadow: 'none',
          },
        },
        '&:active': {
          backgroundColor: '$slateA4',
        },
        '&:focus': {
          boxShadow:
            'inset 0 0 0 1px $colors$slateA8, 0 0 0 1px $colors$slateA8',
        },
        '&:disabled': {
          backgroundColor: 'transparent',
        },
        '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
          {
            backgroundColor: '$slateA4',
            boxShadow: 'none',
          },
      },
    },
    {
      variant: 'green',
      ghost: 'true',
      css: {
        color: '$primary12',
        borderColor: 'transparent',
        boxShadow: 'none',
        backgroundColor: 'transparent',
        '@hover': {
          '&:hover': {
            backgroundColor: '$primary3',
            boxShadow: 'none',
          },
        },
        '&:active': {
          backgroundColor: '$primary4',
        },
        '&:focus': {
          boxShadow:
            'inset 0 0 0 1px $colors$primary8, 0 0 0 1px $colors$primary8',
        },
        '&:disabled': {
          color: '$primary6',
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
        '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
          {
            backgroundColor: '$primary4',
            boxShadow: 'none',
          },
      },
    },
    {
      variant: 'red',
      ghost: 'true',
      css: {
        backgroundColor: 'transparent',
        '@hover': {
          '&:hover': {
            backgroundColor: '$redA3',
            boxShadow: 'none',
          },
        },
        '&:active': {
          backgroundColor: '$redA4',
        },
        '&:focus': {
          boxShadow: 'inset 0 0 0 1px $colors$redA8, 0 0 0 1px $colors$redA8',
        },
        '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
          {
            backgroundColor: '$redA4',
            boxShadow: 'none',
          },
      },
    },
  ],
  defaultVariants: {
    size: '1',
    variant: 'gray',
  },
})
