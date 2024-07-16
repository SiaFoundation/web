import { humanDate } from '@siafoundation/units'
import { omit } from '@technically/lodash'
import type { ChartPoint } from '../components/ChartXY'
import {
  daysInMilliseconds,
  hoursInMilliseconds,
  minutesInMilliseconds,
} from './time'

type TransformMode = 'delta' | 'none'

export function formatChartData<Key extends string>(
  dataset: ChartPoint<Key>[] | undefined,
  transformMode: TransformMode,
) {
  if (!dataset || !dataset.length) {
    return []
  }
  const keys = Object.keys(omit(dataset[0], 'timestamp')) as Key[]

  // prep
  dataset.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))

  let result: ChartPoint<Key>[] = []

  if (transformMode === 'delta') {
    dataset.forEach((datum, i) => {
      const point: ChartPoint<Key> = {
        ...datum,
      }
      if (i === 0) {
        // drop first datum, only use it for the delta from the second
        return
      }
      keys.forEach((key) => {
        const currVal = datum[key]!
        const prevVal = dataset[i - 1]![key]!
        const delta = currVal - prevVal
        point[key] = delta
      })
      result.push(point)
    })
  } else {
    result = dataset
  }
  return result
}

type TimeRange = {
  start: number
  end: number
}

type DataTimeSpan = '1' | '7' | '30' | '90' | '365' | 'all'

export function getTimeRange(span: DataTimeSpan, now: number): TimeRange {
  if (span === 'all') {
    return {
      start: new Date(2022, 1, 1).getTime(),
      end: now,
    }
  }
  return {
    start: now - daysInMilliseconds(Number(span)),
    end: now,
  }
}

const dataIntervalLabelFormatters: Record<
  DataInterval | 'default',
  (timestamp: number) => string
> = {
  '5m': (timestamp: number) => {
    const endTimestamp = timestamp + minutesInMilliseconds(5)
    return `5m interval from ${humanDate(timestamp, {
      timeStyle: 'short',
      hour12: false,
    })} to ${humanDate(endTimestamp, {
      timeStyle: 'short',
      hour12: false,
    })}`
  },
  '15m': (timestamp: number) => {
    const endTimestamp = timestamp + minutesInMilliseconds(15)
    return `15m interval from ${humanDate(timestamp, {
      timeStyle: 'short',
      hour12: false,
    })} to ${humanDate(endTimestamp, {
      timeStyle: 'short',
      hour12: false,
    })}`
  },
  hourly: (timestamp: number) => {
    const endTimestamp = timestamp + hoursInMilliseconds(1)
    return `Hour interval from ${humanDate(timestamp, {
      timeStyle: 'short',
      hour12: false,
    })} to ${humanDate(endTimestamp, {
      timeStyle: 'short',
      hour12: false,
    })}`
  },
  daily: (timestamp: number) => {
    const endTimestamp = timestamp + hoursInMilliseconds(24)
    return `Day interval from ${humanDate(timestamp)} to ${humanDate(
      endTimestamp,
    )}`
  },
  weekly: (timestamp: number) => {
    const endTimestamp = timestamp + daysInMilliseconds(7)
    return `Week interval from ${humanDate(timestamp)} to ${humanDate(
      endTimestamp,
    )}`
  },
  monthly: (timestamp: number) => {
    const endTimestamp = timestamp + daysInMilliseconds(30)
    return `Month interval from ${humanDate(timestamp)} to ${humanDate(
      endTimestamp,
    )}`
  },
  yearly: (timestamp: number) => {
    const endTimestamp = timestamp + daysInMilliseconds(365)
    return `Year interval from ${humanDate(timestamp)} to ${humanDate(
      endTimestamp,
    )}`
  },
  default: (timestamp: number) => {
    return `${humanDate(timestamp)}`
  },
} as const

export type DataInterval =
  | '5m'
  | '15m'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'

export function getDataIntervalLabelFormatter(
  dataInterval: DataInterval | 'default',
) {
  return (
    dataIntervalLabelFormatters[dataInterval] ||
    dataIntervalLabelFormatters['default']
  )
}
