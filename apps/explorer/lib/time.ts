import { blockHeightToTime, humanDate } from '@siafoundation/units'

export function blockHeightToHumanDate(
  currentHeight: number,
  timeInMS: number,
  dateStyle: 'full' | 'long' | 'medium' | 'short' = 'medium',
  timeStyle: 'full' | 'long' | 'medium' | 'short' = 'short'
) {
  return humanDate(blockHeightToTime(currentHeight, timeInMS), {
    dateStyle,
    timeStyle,
  })
}
