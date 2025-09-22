'use client'

import { useStableArrayBy, useStableObjectBy } from '../hooks/useStableCompare'

// Stable compare remotes in case the caller is not memoizing the prop.
export function useStableRemotes<
  Remotes extends Record<
    string,
    { data: unknown; isLoading?: boolean; isValidating: boolean }
  >,
>(remotes: Remotes): Remotes {
  return useStableObjectBy(remotes, (a, b) => {
    const av = a as {
      data: unknown
      isLoading?: boolean
      isValidating: boolean
    }
    const bv = b as {
      data: unknown
      isLoading?: boolean
      isValidating: boolean
    }
    return (
      av.data === bv.data &&
      (av.isLoading ?? false) === (bv.isLoading ?? false) &&
      av.isValidating === bv.isValidating
    )
  })
}

// Stable compare filters in case the caller is not memoizing the prop.
export function useStableFilters(filters: unknown[]) {
  return useStableArrayBy(filters)
}
