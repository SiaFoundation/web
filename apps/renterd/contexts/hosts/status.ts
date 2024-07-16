import { colors } from '@siafoundation/design-system'
import type { HostData } from './types'

export const hostColors = {
  activeAndUsable: {
    colorHex: colors.green[600],
    colorName: 'green',
  },
  activeAndUnusable: {
    colorHex: colors.amber[600],
    colorName: 'amber',
  },
  potentialHost: {
    colorHex: colors.blue[600],
    colorName: 'blue',
  },
} as const

export function getHostStatus(h: HostData) {
  // active and unusable
  if (h.activeContractsCount.gt(0) && !h.usable) {
    return {
      status: 'activeAndUnusable',
      ...hostColors.activeAndUnusable,
    }
  }
  // active and usable
  if (h.activeContractsCount.gt(0)) {
    return {
      status: 'activeAndUsable',
      ...hostColors.activeAndUsable,
    }
  }
  // potential host
  return {
    status: 'potentialHost',
    ...hostColors.potentialHost,
  }
}

export function colorWithOpacity(hexColor: string, opacity: number) {
  const r = Number.parseInt(hexColor.slice(1, 3), 16)
  const g = Number.parseInt(hexColor.slice(3, 5), 16)
  const b = Number.parseInt(hexColor.slice(5, 7), 16)

  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}
