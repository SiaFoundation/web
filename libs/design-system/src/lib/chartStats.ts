import { omit } from '@technically/lodash'
import type { ChartPoint } from '../components/ChartXY'

type KeyStats = {
  average: number
  change: number | undefined
  diff: number
  total: number
  latest: number
}

export function computeChartStats<Key extends string>(
  dataset: ChartPoint<Key>[] | undefined,
): Record<string, KeyStats> {
  if (!dataset || !dataset.length) {
    return {}
  }

  const keys = Object.keys(omit(dataset[0], 'timestamp')) as Key[]

  // prep
  dataset.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))

  const map = keys.reduce(
    (acc, key) => ({
      ...acc,
      [key]: getStatsForKey(key, dataset),
    }),
    {},
  )
  return {
    ...map,
    total: getStatsTotal(keys, dataset),
  }
}

function getStatsForKey<Key extends string>(key: Key, data: ChartPoint<Key>[]) {
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

function getStatsTotal<Key extends string>(
  keys: Key[],
  data: ChartPoint<Key>[],
) {
  const start = getTotalForPoint(keys, data[0])
  const end = getTotalForPoint(keys, data[data.length - 1])
  const total = data.reduce(
    (acc, point) => acc + getTotalForPoint(keys, point),
    0,
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

function getTotalForPoint<Key extends string>(
  keys: Key[],
  point?: ChartPoint<Key>,
) {
  return keys.reduce((acc, key) => acc + (point?.[key] || 0), 0)
}
