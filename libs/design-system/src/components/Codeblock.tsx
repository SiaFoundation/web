import { styled } from '../config/theme'

export const Codeblock = styled('code', {
  fontFamily: '$mono',
  fontSize: 'max(12px, 85%)',
  display: 'block',
  padding: '$2',
  backgroundColor: '$canvas',
  color: '$hiContrast',
  textAlign: 'left',
  borderRadius: '$2',
})
