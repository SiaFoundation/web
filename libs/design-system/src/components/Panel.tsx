import { css, styled } from '../config/theme'

export const panelStyles = css({
  backgroundColor: '$panel',

  transition: 'border 0.3s ease-in-out, box-shadow 0.3s ease-in-out',

  boxShadow: 'inset 0 0 0 1px $colors$slate6',
  color: '$hiContrast',
  '@hover': {
    '&:hover': {
      boxShadow: 'inset 0 0 0 1px $colors$slate7',
    },
  },

  variants: {
    size: {
      '1': {
        borderRadius: '$2',
      },
      '2': {
        borderRadius: '$3',
      },
      '3': {
        borderRadius: '$5',
      },
    },
  },

  defaultVariants: {
    size: '1',
  },
})

export const Panel = styled('div', panelStyles)
