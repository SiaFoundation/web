import { omit } from 'lodash'
import { ChartPoint } from '../components/ChartXY'
import { format } from 'date-fns'

type TransformMode = 'diff' | 'none'

export function formatChartData<Key extends string>(
  dataset: ChartPoint<Key>[] | undefined,
  transformMode: TransformMode
) {
  if (!dataset || !dataset.length) {
    return []
  }
  const keys = Object.keys(omit(dataset[0], 'timestamp')) as Key[]

  // prep
  dataset.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))

  let result: ChartPoint<Key>[] = []

  if (transformMode === 'diff') {
    dataset.forEach((datum, i) => {
      const point: ChartPoint<Key> = {
        ...datum,
      }
      if (i === 0) {
        result.push(point)
        return
      }
      keys.forEach((key) => {
        const currVal = datum[key]
        const prevVal = dataset[i - 1][key]
        const diff = currVal - prevVal
        point[key] = diff
      })
      result.push(point)
    })
  } else {
    result = dataset
  }
  return result
}

const dataIntervalLabelFormatters: Record<
  DataInterval | 'default',
  (timestamp: number) => string
> = {
  '15m': (timestamp: number) => {
    return `15m window ending at ${format(timestamp, 'P kk:mm')}`
  },
  hourly: (timestamp: number) => {
    return `Hour ending at ${format(timestamp, 'P kk:mm')}`
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
