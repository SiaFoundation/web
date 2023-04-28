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

export function configCategoryPattern<Cat extends string>(
  config: { label: string; color: string },
  category: Cat,
  pattern?: boolean
) {
  return {
    ...config,
    category,
    pattern,
  }
}

export function configCategoryLabel<Cat extends string>(
  config: { label?: string; color?: string },
  category: Cat,
  label?: string
) {
  return {
    ...config,
    category,
    label,
  }
}
