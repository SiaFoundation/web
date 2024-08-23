import { minutesInMilliseconds } from '@siafoundation/units'

export function getTimeClampedToNearest5min(t: number) {
  const granularity = minutesInMilliseconds(5)
  return Math.round(t / granularity) * granularity
}
