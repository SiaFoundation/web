import { styled } from '../config/theme'

export const ControlGroup = styled('div', {
  display: 'flex',
  gap: '$1',

  // Make sure ControlGroup and its children don't affect normal stacking order
  position: 'relative',
  zIndex: 0,
})
