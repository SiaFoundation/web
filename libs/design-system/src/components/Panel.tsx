import { css, darkTheme, styled } from '../config/theme'

export const panelStyles = css({
  backgroundColor: '$panel',
  borderRadius: '$3',
  // border: '1px solid transparent',
  border: '1px solid $siaGreenA2',
  boxShadow:
    '$colors$shadowLight 0px 10px 38px -10px, $colors$shadowDark 0px 10px 20px -15px',
  transition: 'border 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    border: '1px solid $siaGreenA4',
    boxShadow:
      '$colors$siaGreenA1 0px 0px 38px -10px, $colors$shadowLight 0px 10px 38px -10px, $colors$shadowDark 0px 10px 20px -15px',
  },
  [`.${darkTheme} &`]: {
    '&:hover': {
      border: '1px solid $siaGreenA3',
      boxShadow:
        '$colors$siaGreenA1 0px 0px 38px -10px, $colors$shadowLight 0px 10px 38px -10px, $colors$shadowDark 0px 10px 20px -15px',
    },
  },
})

export const Panel = styled('div', panelStyles)
