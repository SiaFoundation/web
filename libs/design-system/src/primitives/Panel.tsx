import { css, styled } from '../config/theme'

export const panelStyles = css({
  backgroundColor: '$panel',

  transition: 'border 0.3s ease-in-out, box-shadow 0.3s ease-in-out',

  boxShadow: 'inset 0 0 0 1px $colors$accentInactive',
  color: '$hiContrast',
  '@hover': {
    '&:hover': {
      boxShadow: 'inset 0 0 0 1px $colors$accentActive',
    },
  },
})

export const Panel = styled('div', panelStyles)
