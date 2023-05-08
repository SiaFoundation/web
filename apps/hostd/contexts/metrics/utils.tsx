import { daysInMilliseconds } from '@siafoundation/design-system'
import { DataTimeSpan, TimeRange } from './types'

export function getTimeRange(span: DataTimeSpan): TimeRange {
  const now = new Date().getTime()
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
