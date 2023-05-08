import { daysToBlocks } from './blockTime'
import {
  daysInMilliseconds,
  monthsInMilliseconds,
  nowInMilliseconds,
  weeksInMilliseconds,
  yearsInMilliseconds,
} from './time'

export function getContractsTimeRangeBlockHeight(
  currentHeight: number,
  contracts: { contractHeightStart: number; contractHeightEnd: number }[]
) {
  const range = contracts.reduce(
    (acc, item) => {
      let accStartHeight = acc.startHeight
      let accEndHeight = acc.endHeight
      // let end = acc.end

      if (item.contractHeightStart < accStartHeight) {
        accStartHeight = item.contractHeightStart
      }
      if (item.contractHeightEnd > accEndHeight) {
        accEndHeight = item.contractHeightEnd
      }
      return {
        startHeight: accStartHeight,
        endHeight: accEndHeight,
      }
    },
    {
      startHeight: currentHeight,
      endHeight: 0,
    }
  )

  // pad it out, also gives space for 1 day proof window
  range.endHeight = Math.max(range.endHeight, currentHeight) + daysToBlocks(5)
  range.startHeight = range.startHeight - daysToBlocks(5)

  // calculate points with timestamps for graphing
  const allDates = []

  let current = range.startHeight
  while (current <= range.endHeight) {
    allDates.push(current)
    current += daysInMilliseconds(1)
  }
  const allDatesMap = allDates.reduce(
    (acc, date) => ({
      ...acc,
      [date]: {
        total: null,
        timestamp: date,
      },
    }),
    {}
  )

  return {
    allDatesMap,
    range,
  }
}

export function getTimeRange(range: 'day' | 'week' | 'month' | 'year') {
  const now = nowInMilliseconds()
  if (range === 'month') {
    return [now - monthsInMilliseconds(1), now]
  }
  if (range === 'week') {
    return [now - weeksInMilliseconds(1), now]
  }
  if (range === 'year') {
    return [now - yearsInMilliseconds(1), now]
  }
  // if (range === 'day') {
  return [now - daysInMilliseconds(1), now]
  // }
}
