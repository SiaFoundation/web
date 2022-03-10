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

  display: 'inline-flex',
  flexShrink: 0,
  justifyContent: 'center',
  lineHeight: '1',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',

  height: '$5',
  px: '$2',
  fontFamily: '$mono',
  fontSize: '$2',
  fontWeight: 500,
  fontVariantNumeric: 'tabular-nums',
  textTransform: 'uppercase',

  variants: {
    size: {
      '1': {
        borderRadius: '$1',
        height: '$5',
        px: '$2',
        fontSize: '$0',
        lineHeight: '$sizes$5',
      },
      '2': {
        borderRadius: '$2',
        height: '$7',
        px: '$4',
        fontSize: '$2',
        lineHeight: '$sizes$7',
      },
      '3': {
        borderRadius: '$2',
        height: '$8',
        px: '$5',
        fontSize: '$4',
        lineHeight: '$sizes$8',
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
      accent: {
        backgroundColor: '$brandAccent9',
        // boxShadow: 'inset 0 0 0 1px $colors$brandAccent6',
        // color: '$brandAccent12',
        color: '$whiteA12',
        '@hover': {
          '&:hover': {
            backgroundColor: '$brandAccent10',
            // boxShadow: 'inset 0 0 0 1px $colors$brandAccent7',
          },
        },
        '&:active': {
          backgroundColor: '$brandAccent10',
          boxShadow: 'inset 0 0 0 1px $colors$brandAccent7',
        },
        '&:focus': {
          backgroundColor: '$brandAccent10',
          // boxShadow:
          //   'inset 0 0 0 1px $colors$brandAccent7, 0 0 0 1px $colors$brandAccent7',
        },
        '&:focus:active': {
          backgroundColor: '$brandAccent11',
        },
        '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
          {
            backgroundColor: '$brandAccent10',
            // boxShadow: 'inset 0 0 0 1px $colors$brandAccent7',
          },
        '&:disabled': {
          backgroundColor: '$brandAccent6',
          // boxShadow: 'inset 0 0 0 1px $colors$brandAccent4',
        },
        [`${ControlGroupBase} > &`]: {
          // same as green+ghost compound variant
          color: '$brandAccent12',
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          '@hover': {
            '&:hover': {
              backgroundColor: '$brandAccent3',
              boxShadow: 'none',
            },
          },
          '&:active': {
            backgroundColor: '$brandAccent4',
          },
          '&:focus': {
            boxShadow:
              'inset 0 0 0 1px $colors$brandAccent8, 0 0 0 1px $colors$brandAccent8',
          },
          '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
            {
              backgroundColor: '$brandAccent8',
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
      variant: 'accent',
      ghost: 'true',
      css: {
        color: '$brandAccent12',
        borderColor: 'transparent',
        boxShadow: 'none',
        backgroundColor: 'transparent',
        '@hover': {
          '&:hover': {
            backgroundColor: '$brandAccent3',
            boxShadow: 'none',
          },
        },
        '&:active': {
          backgroundColor: '$brandAccent3',
        },
        '&:focus': {
          backgroundColor: '$brandAccent3',
          boxShadow:
            'inset 0 0 0 1px $colors$brandAccent7, 0 0 0 1px $colors$brandAccent7',
        },
        '&:focus:active': {
          backgroundColor: '$brandAccent5',
        },
        '&:disabled': {
          color: '$brandAccent6',
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
        '&[data-radix-popover-trigger][data-state="open"], &[data-radix-dropdown-menu-trigger][data-state="open"]':
          {
            backgroundColor: '$brandAccent4',
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
