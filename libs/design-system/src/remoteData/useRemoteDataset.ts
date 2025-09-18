'use client'

import { useMemo, useRef } from 'react'
import {
  Dep,
  ValuesOf,
  checkAnyLoading,
  checkAnyRevalidating,
  checkAnyHaveError,
  checkAllHaveData,
  getValues,
  RemoteDataset,
} from './types'

export function useRemoteDataset<TDeps extends Record<string, Dep<unknown>>, O>(
  deps: TDeps,
  transform: (values: ValuesOf<TDeps>) => O[],
  {
    marker,
    offset,
    filters,
  }: {
    marker?: string | null
    offset?: number
    filters?: unknown[]
  },
): RemoteDataset<O[]> {
  const currentState = deriveCurrentState(deps, transform, {
    marker,
    offset,
    filters,
  })
  const prevBaseState = useRef<RemoteDataset<O[]> | undefined>(undefined)
  return useMemo(() => {
    if (prevBaseState.current?.state === currentState.state) {
      return currentState
    }
    // If we are revalidating, and the previous state was an error or empty,
    // continue to show the previous state until validation completes.
    // This is to avoid a skeleton loader flickering between identical states.
    if (currentState.isValidating && prevBaseState.current) {
      if (prevBaseState.current.state === 'error') {
        return {
          state: 'error',
          data: undefined,
          error: prevBaseState.current.error,
          isValidating: currentState.isValidating,
          isLoading: currentState.isLoading,
        }
      }
      if (
        prevBaseState.current.state === 'noneYet' ||
        prevBaseState.current.state === 'noneMatchingFilters' ||
        prevBaseState.current.state === 'noneOnPage'
      ) {
        return {
          state: prevBaseState.current.state,
          data: undefined,
          isValidating: currentState.isValidating,
          isLoading: currentState.isLoading,
        }
      }
    }
    prevBaseState.current = currentState
    return currentState
  }, [currentState])
}

function deriveCurrentState<TDeps extends Record<string, Dep<unknown>>, O>(
  deps: TDeps,
  transform: (values: ValuesOf<TDeps>) => O[],
  {
    marker,
    offset,
    filters,
  }: {
    marker?: string | null
    offset?: number
    filters?: unknown[]
  },
): RemoteDataset<O[]> {
  const anyLoading = checkAnyLoading(deps)
  const anyRevalidating = checkAnyRevalidating(deps)
  const anyError = checkAnyHaveError(deps)
  const allData = checkAllHaveData(deps)
  const startState = !anyLoading && !anyRevalidating && !anyError && !allData

  if (startState) {
    return {
      state: 'loading',
      data: undefined,
      isLoading: anyLoading,
      isValidating: anyRevalidating,
    }
  }

  if (anyLoading) {
    return {
      state: 'loading',
      data: undefined,
      isLoading: anyLoading,
      isValidating: anyRevalidating,
    }
  }

  if (anyError) {
    return {
      state: 'error',
      data: undefined,
      error: anyError,
      isLoading: anyLoading,
      isValidating: anyRevalidating,
    }
  }

  if (allData) {
    const data = transform(getValues(deps))
    if (data.length > 0) {
      return {
        state: 'loaded',
        data,
        isLoading: anyLoading,
        isValidating: anyRevalidating,
      }
    }
    return {
      state: getEmptyState({ offset, marker, filters }),
      data: undefined,
      isLoading: anyLoading,
      isValidating: anyRevalidating,
    }
  }

  if (anyRevalidating) {
    return {
      state: 'loading',
      data: undefined,
      isLoading: anyLoading,
      isValidating: anyRevalidating,
    }
  }

  // Should never reach here.
  return {
    state: 'error',
    data: undefined,
    isLoading: anyLoading,
    isValidating: anyRevalidating,
  }
}

function getIsOnFirstPage({
  offset,
  marker,
}: {
  offset?: number
  marker?: string | null
}): boolean {
  // If marker is undefined it is not in use.
  if (marker !== undefined) {
    // Page marker.
    if (marker) {
      return false
    }
    // If marker is null, its the first page.
    if (marker === null) {
      return true
    }
  }
  // If both marker and offset are undefined, there is no paging.
  if (offset === undefined) {
    return true
  }
  // Offset based pagination.
  if (offset > 0) {
    return false
  }
  return true
}

function getEmptyState({
  offset,
  marker,
  filters,
}: {
  offset?: number
  marker?: string | null
  filters?: unknown[]
}): 'noneOnPage' | 'noneYet' | 'noneMatchingFilters' {
  if (!getIsOnFirstPage({ offset, marker })) {
    return 'noneOnPage'
  }
  if (!filters || filters.length === 0) {
    return 'noneYet'
  }
  return 'noneMatchingFilters'
}
