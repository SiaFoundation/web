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
        py: '$2',
      },
      3: {
        py: '$3',
      },
    },
    sticky: {
      true: {
        // Sticky was a tiny bit janky on scroll so going with fixed for now
        position: 'fixed',
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
      loContrast: {
        backgroundColor: '$loContrast',
      },
      plain: {
        backgroundColor: '$gray2',
      },
      accent: {
        backgroundColor: '$siaGreenA8',
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
      color: 'accent',
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
      color: 'plain',
      css: {
        borderColor: '$slate6',
      },
    },
    {
      border: 'true',
      color: 'accent',
      css: {
        borderColor: '$siaGreenA10',
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
