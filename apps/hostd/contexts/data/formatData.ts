import { ChartPoint } from '@siafoundation/design-system'
import { groupBy, omit } from 'lodash'
import { getDaysInMs } from '@siafoundation/design-system'
import { startOfMonth, startOfWeek } from 'date-fns'
import { futureSpan } from '.'

type AggregationMode = 'total' | 'average'

type TimeRange = {
  start: number
  end: number
}

export function formatData(
  data: ChartPoint[],
  timeRange: TimeRange,
  mode: AggregationMode
) {
  const { start, end } = timeRange
  const keys = Object.keys(omit(data[0], 'timestamp'))
  const range = end - start

  // prep
  data.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))

  // aggregate
  const grouped = groupBy(data, (point) => {
    const normalizedTimestamp =
      range > getDaysInMs(90 + futureSpan)
        ? startOfMonth(point.timestamp).getTime()
        : range > getDaysInMs(30 + futureSpan)
        ? startOfWeek(point.timestamp).getTime()
        : point.timestamp
    return normalizedTimestamp
  })
  const aggregated = Object.entries(grouped).reduce(
    (acc, [timestamp, group]) => {
      const aggregatedPoint: ChartPoint = {
        timestamp: Number(timestamp),
      }
      keys.forEach((key) => {
        for (let i = 0; i < group.length; i++) {
          const val = aggregatedPoint[key] || 0
          aggregatedPoint[key] = val + (group[i][key] || 0)
        }
      })
      if (mode === 'average') {
        keys.forEach((key) => {
          const val = aggregatedPoint[key]
          aggregatedPoint[key] = val / group.length
        })
      }
      return acc.concat(aggregatedPoint)
    },
    [] as ChartPoint[]
  )

  // filter
  return aggregated.filter(
    (point) => point.timestamp >= start && point.timestamp < end
  )
}
