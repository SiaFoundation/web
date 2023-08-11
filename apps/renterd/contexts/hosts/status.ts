import { colors } from '@siafoundation/design-system'
import { HostData } from './types'

export function getHostStatus(h: HostData) {
  // red
  if (h.activeContractsCount.gt(0) && !h.usable) {
    return {
      status: 'activeAndUnusable',
      color: colors.red[600],
    }
  }
  // blue
  if (h.activeContractsCount.gt(0)) {
    return {
      status: 'activeAndUsable',
      color: colors.blue[600],
    }
  }
  // green
  return {
    status: 'potentialHost',
    color: colors.green[600],
  }
}

export function colorWithOpacity(hexColor: string, opacity: number) {
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)

  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}
