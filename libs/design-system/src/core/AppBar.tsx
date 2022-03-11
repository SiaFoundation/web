import { styled } from '../config/theme'

export const AppBar = styled('div', {
  boxSizing: 'border-box',
  zIndex: '1',

  variants: {
    size: {
      1: {
        py: '$1',
      },
      2: {
        py: '$3',
      },
      3: {
        py: '$5',
      },
    },
    sticky: {
      true: {
        // TODO: for some reason sticky is a tiny bit janky on scroll
        position: 'sticky',
        width: '100%',
        top: 0,
        left: 0,
      },
    },
    glass: {
      true: {
        backdropFilter: 'blur(12px) saturate(160%)',
      },
    },
    border: {
      true: {
        borderBottom: '1px solid',
      },
    },
    color: {
      none: {
        backgroundColor: 'transparent',
      },
      loContrast: {
        backgroundColor: '$loContrast',
      },
      plain: {
        backgroundColor: '$gray2',
      },
    },
  },
  compoundVariants: [
    {
      glass: 'true',
      color: 'plain',
      css: {
        opacity: '.9',
      },
    },
    {
      glass: 'true',
      color: 'loContrast',
      css: {
        opacity: '.9',
      },
    },
    {
      border: 'true',
      color: 'none',
      css: {
        borderColor: 'transparent',
      },
    },
    {
      border: 'true',
      color: 'plain',
      css: {
        borderColor: '$slate6',
      },
    },
    {
      border: 'true',
      color: 'loContrast',
      css: {
        borderColor: '$slate6',
      },
    },
  ],
  defaultVariants: {
    size: '1',
    color: 'loContrast',
  },
})
