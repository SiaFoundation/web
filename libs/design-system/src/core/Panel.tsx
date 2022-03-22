import { css, styled } from '../config/theme'

export const panelStyles = css({
  backgroundColor: '$panel',

  transition: 'border 0.3s ease-in-out, box-shadow 0.3s ease-in-out',

  boxShadow: '$colors$border, $colors$shadow',
  color: '$hiContrast',
  '@hover': {
    '&:hover': {
      boxShadow: '$colors$borderActive, $colors$shadowActive',
    },
  },

  variants: {
    radius: {
      0: {
        borderRadius: 0,
      },
      1: {
        borderRadius: '$1',
      },
      2: {
        borderRadius: '$2',
      },
      3: {
        borderRadius: '$3',
      },
    },
  },
  defaultVariants: {
    radius: '1',
  },
})

export const Panel = styled('div', panelStyles)
