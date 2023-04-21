import {
  ChartConfig,
  ChartData,
  ChartStats,
} from '@siafoundation/design-system'
import { getDaysInMs } from '@siafoundation/design-system'

export type Chart = {
  data: ChartData
  stats: ChartStats
  config: ChartConfig
}

type TimeRange = {
  start: number
  end: number
}

export type TimeSpan = 7 | 30 | 90 | 365 | 'all'

export function getTimeRange(span: TimeSpan, futureSpan: number): TimeRange {
  const now = new Date().getTime()
  if (span === 'all') {
    return {
      start: 0,
      end: now,
    }
  }
  return {
    start: now - getDaysInMs(span),
    end: now + getDaysInMs(futureSpan),
  }
}

export function potentialConfig(config: { color: string }) {
  return {
    ...config,
    pattern: true,
  }
}
