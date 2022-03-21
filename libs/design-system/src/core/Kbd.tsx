import { styled } from '../config/theme'
import { Text } from './Text'

export const Kbd = styled('kbd', {
  boxSizing: 'border-box',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$loContrast',
  flexShrink: 0,
  color: '$hiContrast',
  userSelect: 'none',
  cursor: 'default',
  whiteSpace: 'nowrap',
  fontFamily: '$sans',
  fontWeight: 400,
  lineHeight: '1.5',
  mx: '2px',
  borderRadius: '$sizes$0-5',
  fontSize: '$16',

  [`${Text} &`]: {
    color: 'inherit',
    fontSize: 'inherit',
  },
})
