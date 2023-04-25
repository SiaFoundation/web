import { groupBy, omit } from 'lodash'
import { ChartPoint } from '../components/ChartXY'
import { getDaysInMs } from './time'
import { format, startOfMonth, startOfWeek } from 'date-fns'

type RollupMode = 'auto' | 90 | 30 | 'none'
type AggregationMode = 'total' | 'average' | 'none'

type TimeRange = {
  start: number
  end: number
}

export function formatChartData(
  data: ChartPoint[],
  timeRange: TimeRange,
  rollupMode: RollupMode,
  aggregationMode: AggregationMode,
  futureSpan = 90
) {
  const { start, end } = timeRange
  const keys = Object.keys(omit(data[0], 'timestamp'))

  // prep
  data.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))

  // TODO: explore filling in missing data points
  let aggregated: ChartPoint[] = []
  if (aggregationMode === 'none') {
    aggregated = data
  } else {
    // aggregate
    const { normalize } = getTimeRangeRollup(timeRange, rollupMode, futureSpan)
    const grouped = groupBy(data, (point) => {
      const normalizedTimestamp = normalize(point.timestamp)
      return normalizedTimestamp
    })
    aggregated = Object.entries(grouped).reduce((acc, [timestamp, group]) => {
      const aggregatedPoint: ChartPoint = {
        timestamp: Number(timestamp),
      }
      keys.forEach((key) => {
        for (let i = 0; i < group.length; i++) {
          const val = aggregatedPoint[key] || 0
          aggregatedPoint[key] = val + (group[i][key] || 0)
        }
      })
      if (aggregationMode === 'average') {
        keys.forEach((key) => {
          const val = aggregatedPoint[key]
          aggregatedPoint[key] = val / group.length
        })
      }
      return acc.concat(aggregatedPoint)
    }, [] as ChartPoint[])
  }

  // filter
  return aggregated.filter(
    (point) => point.timestamp >= start && point.timestamp <= end
  )
}

export function getTimeRangeRollup(
  timeRange: TimeRange,
  rollupMode: RollupMode,
  futureSpan = 90
) {
  const { start, end } = timeRange
  const range = end - start

  if (rollupMode === 'auto') {
    return range > getDaysInMs(90 + futureSpan)
      ? {
          normalize: (timestamp: number) => startOfMonth(timestamp).getTime(),
          label: (timestamp: number) => {
            const ts = startOfMonth(timestamp).getTime()
            return `Month starting ${format(ts, 'PP')}`
          },
        }
      : range > getDaysInMs(30 + futureSpan)
      ? {
          normalize: (timestamp: number) => startOfWeek(timestamp).getTime(),
          label: (timestamp: number) => {
            const ts = startOfWeek(timestamp).getTime()
            return `Week starting ${format(ts, 'PP')}`
          },
        }
      : {
          normalize: (timestamp: number) => timestamp,
          label: (timestamp: number) => {
            return `Day of ${format(timestamp, 'PP')}`
          },
        }
  }
  return rollupMode === 90
    ? {
        normalize: (timestamp: number) => startOfMonth(timestamp).getTime(),
        label: (timestamp: number) => {
          const ts = startOfMonth(timestamp).getTime()
          return `Month starting ${format(ts, 'PP')}`
        },
      }
    : rollupMode === 30
    ? {
        normalize: (timestamp: number) => startOfWeek(timestamp).getTime(),
        label: (timestamp: number) => {
          const ts = startOfWeek(timestamp).getTime()
          return `Week starting ${format(ts, 'PP')}`
        },
      }
    : {
        normalize: (timestamp: number) => timestamp,
        label: (timestamp: number) => {
          return `Day of ${format(timestamp, 'PP')}`
        },
      }
}

const dataIntervalLabelFormatters: Record<
  DataInterval | 'default',
  (timestamp: number) => string
> = {
  '15m': (timestamp: number) => {
    return `15m window ending at ${format(timestamp, 'Pp')}`
  },
  hourly: (timestamp: number) => {
    return `Hour ending at ${format(timestamp, 'Pp')}`
  },
  daily: (timestamp: number) => {
    return `Day ending on ${format(timestamp, 'P')}`
  },
  weekly: (timestamp: number) => {
    return `Week ending on ${format(timestamp, 'P')}`
  },
  monthly: (timestamp: number) => {
    return `Month ending on ${format(timestamp, 'P')}`
  },
  yearly: (timestamp: number) => {
    return `Year ending on ${format(timestamp, 'P')}`
  },
  default: (timestamp: number) => {
    return `${format(timestamp, 'P')}`
  },
} as const

export type DataInterval =
  | '15m'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'

export function getDataIntervalLabelFormatter(
  dataInterval: DataInterval | 'default'
) {
  return (
    dataIntervalLabelFormatters[dataInterval] ||
    dataIntervalLabelFormatters['default']
  )
}
