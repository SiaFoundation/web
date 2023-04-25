import {
  ChartConfig,
  ChartData,
  ChartStats,
} from '@siafoundation/design-system'

export type Chart = {
  data: ChartData
  stats: ChartStats
  config: ChartConfig
}

export type TimeRange = {
  start: number
  end: number
}

export type DataInterval =
  | '15m'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'

export const dataItervalOptions: { label: string; value: DataInterval }[] = [
  {
    label: '15m',
    value: '15m',
  },
  {
    label: 'hourly',
    value: 'hourly',
  },
  {
    label: 'daily',
    value: 'daily',
  },
  {
    label: 'weekly',
    value: 'weekly',
  },
  {
    label: 'monthly',
    value: 'monthly',
  },
  {
    label: 'yearly',
    value: 'yearly',
  },
]

export type DataTimeSpan = '7' | '30' | '90' | '365' | 'all'

export const dataTimeSpanOptions: {
  label: string
  value: DataTimeSpan
  interval: DataInterval
}[] = [
  {
    label: '7D',
    interval: 'hourly',
    value: '7',
  },
  {
    label: '1M',
    interval: 'daily',
    value: '30',
  },
  {
    label: '3M',
    interval: 'weekly',
    value: '90',
  },
  {
    label: '1Y',
    interval: 'weekly',
    value: '365',
  },
  {
    label: 'ALL',
    interval: 'monthly',
    value: 'all',
  },
]
