import { css, styled } from '../config/theme'

export const panelStyles = css({
  backgroundColor: '$panel',

  transition: 'border 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  borderRadius: '$1',

  boxShadow: '$colors$border, $colors$shadow',
  color: '$hiContrast',
  '@hover': {
    '&:hover': {
      boxShadow: '$colors$borderActive, $colors$shadowActive',
    },
  },

  variants: {
    flat: {
      true: {
        borderRadius: '0',
      },
    },
  },
})

export const Panel = styled('div', panelStyles)
