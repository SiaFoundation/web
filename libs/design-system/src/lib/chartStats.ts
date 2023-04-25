import { ChartPoint } from '../components/ChartXY'
import { omit } from 'lodash'

type KeyStats = {
  average: number
  change: number | undefined
  diff: number
  total: number
  latest: number
}

export type ChartStats = {
  [key: string]: KeyStats
}

type TimeRange = {
  start: number
  end: number
}

export function computeChartStats(
  data: ChartPoint[],
  timeRange: TimeRange,
  futureKeys: string[] = []
) {
  const { start, end } = timeRange
  const keys = Object.keys(omit(data[0], 'timestamp'))

  // prep
  data.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))

  // filter
  const allData = data.filter(
    (point) => point.timestamp >= start && point.timestamp < end
  )
  const onlyPastData = filterOutFuture(allData)

  const map = keys.reduce(
    (acc, key) => ({
      ...acc,
      [key]: futureKeys.includes(key)
        ? getStatsForKey(key, allData)
        : getStatsForKey(key, onlyPastData),
    }),
    {}
  )
  return {
    ...map,
    total: getStatsTotal(keys, onlyPastData),
  }
}

function getStatsForKey(key: string, data: ChartPoint[]) {
  const start = data[0]?.[key] || 0
  const end = data[data.length - 1]?.[key] || 0
  const total = data.reduce((acc, point) => acc + (point[key] || 0), 0)
  return calcStats({
    total,
    start,
    end,
    count: data.length,
  })
}

function getStatsTotal(keys: string[], data: ChartPoint[]) {
  const start = getTotalForPoint(keys, data[0])
  const end = getTotalForPoint(keys, data[data.length - 1])
  const total = data.reduce(
    (acc, point) => acc + getTotalForPoint(keys, point),
    0
  )
  return calcStats({
    total,
    start,
    end,
    count: data.length,
  })
}

function calcStats({
  total,
  start,
  end,
  count,
}: {
  total: number
  start: number
  end: number
  count: number
}) {
  const diff = end - start
  return {
    total,
    diff,
    change: start === 0 ? undefined : (diff / start) * 100,
    latest: end,
    average: total / count,
  }
}

function getTotalForPoint(keys: string[], point?: ChartPoint) {
  return keys.reduce((acc, key) => acc + (point?.[key] || 0), 0)
}

function filterOutFuture(data: ChartPoint[]) {
  const now = new Date().getTime()
  return data.filter((d) => d.timestamp < now)
}
