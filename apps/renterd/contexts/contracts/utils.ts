import {
  daysToBlocks,
  getDaysInMs,
  getMonthsInMs,
  getNowInMs,
  getWeeksInMs,
  getYearsInMs,
} from '@siafoundation/design-system'

export function getContractsTimeRangeBlockHeight(
  currentHeight: number,
  contracts: { startHeight: number; endHeight: number }[]
) {
  const range = contracts.reduce(
    (acc, item) => {
      let accStartHeight = acc.startHeight
      let accEndHeight = acc.endHeight
      // let end = acc.end

      if (item.startHeight < accStartHeight) {
        accStartHeight = item.startHeight
      }
      if (item.endHeight > accEndHeight) {
        accEndHeight = item.endHeight
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

  range.endHeight = Math.max(range.endHeight, currentHeight) + daysToBlocks(5)
  range.startHeight = range.startHeight - daysToBlocks(5)

  // calculate points with timestamps for graphing
  const allDates = []

  let current = range.startHeight
  while (current <= range.endHeight) {
    allDates.push(current)
    current += getDaysInMs(1)
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
  const now = getNowInMs()
  if (range === 'month') {
    return [now - getMonthsInMs(1), now]
  }
  if (range === 'week') {
    return [now - getWeeksInMs(1), now]
  }
  if (range === 'year') {
    return [now - getYearsInMs(1), now]
  }
  if (range === 'day') {
    return [now - getDaysInMs(1), now]
  }
}
