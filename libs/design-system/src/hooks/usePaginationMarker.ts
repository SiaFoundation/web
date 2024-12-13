'use client'

import { useSearchParams } from '@siafoundation/next'

export function usePaginationMarker(defaultLimit: number) {
  const searchParams = useSearchParams()
  const limit = Number(searchParams.get('limit') || defaultLimit)
  const marker = searchParams.get('marker') || null
  return { limit, marker }
}
