'use client'

import { useSearchParams } from '@siafoundation/next'

export function usePaginationOffset(defaultLimit: number) {
  const searchParams = useSearchParams()
  const limit = Number(searchParams.get('limit') || defaultLimit)
  const offset = Number(searchParams.get('offset') || 0)
  return { limit, offset }
}
