import { getDaysInMs } from '@siafoundation/design-system'
import { DataTimeSpan, TimeRange } from './types'

export function getTimeRange(
  span: DataTimeSpan,
  futureSpan: number
): TimeRange {
  const now = new Date().getTime()
  if (span === 'all') {
    return {
      start: new Date(2022, 1, 1).getTime(),
      end: now,
    }
  }
  return {
    start: now - getDaysInMs(Number(span)),
    end: now + getDaysInMs(futureSpan),
  }
}

export function potentialConfig(config: { label: string; color: string }) {
  return {
    ...config,
    label: `${config.label} - potential`,
    pattern: true,
  }
}
