import { blockHeightToTime, humanDate } from '@siafoundation/units'

export function blockHeightToHumanDate(
  currentHeight: number,
  timeInMS: number
) {
  return humanDate(blockHeightToTime(currentHeight, timeInMS), {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}
