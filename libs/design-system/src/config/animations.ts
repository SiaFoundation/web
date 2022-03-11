import { keyframes } from './theme'

export const pulse = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: '100%' },
})

export const scaleIn = keyframes({
  '0%': { opacity: 0, transform: 'scale(0.8)' },
  '100%': { opacity: 1, transform: 'scale(1)' },
})

export const scaleOut = keyframes({
  '0%': { opacity: 1, transform: 'scale(1)' },
  '100%': { opacity: 0, transform: 'scale(0.8)' },
})
