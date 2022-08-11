import { css } from '../config/theme'

export const baseItemCss = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: '$textSubtle',
  fontFamily: '$sans',
  fontSize: '$12',
  fontVariantNumeric: 'tabular-nums',
  textDecoration: 'none !important',
  lineHeight: '1',
  cursor: 'pointer',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  height: '$4',
  padding: '0 $1-5',
})

export const itemCss = css(baseItemCss, {
  position: 'relative',
  fontWeight: '500',
  borderRadius: '$1',

  color: '$textSubtle',

  '&:focus': {
    outline: 'none',
    color: '$textSubtleActive',
  },

  '&[data-disabled]': {
    color: '$textDisabled',
  },
})

export const labelCss = css(baseItemCss, {
  color: '$textExtraSubtle',
  fontWeight: '500',
})

export const menuCss = css({
  boxSizing: 'border-box',
  minWidth: 120,
  py: '$1',
})

export const separatorCss = css({
  height: 1,
  my: '$1',
  backgroundColor: '$separator',
})
