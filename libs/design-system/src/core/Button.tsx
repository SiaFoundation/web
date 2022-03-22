import { styled } from '../config/theme'

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

  fontFamily: '$mono',
  fontWeight: 500,
  fontVariantNumeric: 'tabular-nums',
  textTransform: 'uppercase',
  cursor: 'pointer',
  transition: 'background-color 50ms linear',

  boxShadow: 'rgb(0 0 0 / 9%) 0px 3px 12px',

  variants: {
    size: {
      '1': {
        borderRadius: '$1',
        height: '$3-5',
        px: '$1-5',
        fontSize: '$12',
        lineHeight: '$sizes$3-5',
      },
      '2': {
        borderRadius: '$1',
        height: '$5',
        px: '$2-5',
        fontSize: '$16',
        lineHeight: '$sizes$5',
      },
      '3': {
        borderRadius: '$1',
        height: '$6',
        px: '$3',
        fontSize: '$20',
        lineHeight: '$sizes$6',
      },
    },
    variant: {
      gray: {
        backgroundColor: '$control',
        boxShadow: '$colors$border, $colors$shadow',
        color: '$hiContrast',
        '@hover': {
          '&:hover': {
            backgroundColor: '$controlHover',
            boxShadow: '$colors$borderHover, $colors$shadow',
          },
        },
        '&:focus': {
          boxShadow: '$colors$border, $colors$borderFocus, $colors$shadow',
        },
        '&:active': {
          backgroundColor: '$controlActive',
          boxShadow: '$colors$borderActive $colors$shadow',
        },
        '&[data-state="open"]': {
          backgroundColor: '$controlActive',
          boxShadow: '$colors$borderActive, $colors$shadow',
        },

        '&:disabled': {
          backgroundColor: '$control',
          boxShadow: '$colors$border, $colors$shadow',
          color: '$slate8',
          pointerEvents: 'none',
        },
      },
      accent: {
        backgroundColor: '$brandAccent9',
        boxShadow: '$colors$borderAccent, $colors$shadow',
        color: '$whiteA12',
        '@hover': {
          '&:hover': {
            backgroundColor: '$brandAccent10',
            boxShadow: '$colors$borderAccentHover, $colors$shadow',
          },
        },
        '&:focus': {
          backgroundColor: '$brandAccent10',
          boxShadow:
            '$colors$borderAccent, $colors$borderFocus, $colors$shadow',
        },
        '&:active': {
          backgroundColor: '$brandAccent9',
          boxShadow: '$colors$borderAccentActive, $colors$shadow',
        },
        '&[data-state="open"]': {
          backgroundColor: '$brandAccent10',
          boxShadow:
            '$colors$borderAccent, $colors$borderFocus, $colors$shadow',
        },
        '&:disabled': {
          backgroundColor: '$brandAccent6',
          boxShadow: '$colors$brandAccent6, $colors$shadow',
        },
      },
      red: {
        color: '$red12',
        backgroundColor: '$red3',
        boxShadow: '$colors$borderRed',
        '@hover': {
          '&:hover': {
            boxShadow: '$colors$borderRedHover, $colors$shadow',
          },
        },
        '&:focus': {
          boxShadow: '$colors$borderRed, $colors$borderFocus, $colors$shadow',
        },
        '&:active': {
          backgroundColor: '$red4',
          boxShadow: '$colors$borderRedActive, $colors$shadow',
        },
        '&:disabled': {
          color: '$red8',
        },
        '&[data-state="open"]': {
          backgroundColor: '$red4',
          boxShadow: '$colors$borderRed, $colors$borderFocus, $colors$shadow',
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
    flat: {
      true: {
        borderRadius: '0',
        boxShadow: 'none',
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
        '&:focus': {
          backgroundColor: '$slateA3',
          boxShadow: '$colors$borderFocus, $colors$shadowActive',
        },
        '&:active': {
          backgroundColor: '$slateA4',
        },
        '&:disabled': {
          backgroundColor: 'transparent',
        },
        '&[data-state="open"]': {
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
        '&:focus': {
          backgroundColor: '$brandAccent3',
          boxShadow: '$colors$borderFocus, $colors$shadowActive',
        },
        '&:active': {
          backgroundColor: '$brandAccent4',
        },
        '&:disabled': {
          color: '$brandAccent6',
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
        '&[data-state="open"]': {
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
        '&:focus': {
          boxShadow: '$colors$borderFocus, $colors$shadowActive',
        },
        '&:active': {
          backgroundColor: '$redA4',
        },
        '&[data-state="open"]': {
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
