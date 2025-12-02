'use client'

import { useMemo, useRef } from 'react'
import {
  Remote,
  ValuesOf,
  checkAnyLoading,
  checkAnyValidating,
  checkAnyHaveError,
  checkAllHaveData,
  getValues,
  RemoteDataset,
} from './types'
import { useStableFilters, useStableRemotes } from './utils'

/**
 * Combines multiple Remote data sources into a single RemoteDataset state for array-based data.
 *
 * Similar to `useRemoteData`, but designed for datasets (arrays) with pagination support.
 * The hook provides context-aware empty states based on pagination position and filters,
 * making it ideal for table views, lists, and other paginated data displays.
 *
 * @param remotes - An object containing multiple Remote data sources. Each Remote must
 *   have `isValidating` (required), optionally `isLoading`, and `data` (required).
 * @param transform - A function that transforms the `data` values from all remotes
 *   into an array of items. If the array is empty, an appropriate empty state will be
 *   returned based on pagination context.
 * @param options - Configuration options for pagination and filtering
 * @param options.marker - Optional pagination marker. `null` indicates first page,
 *   `string` indicates a specific page, `undefined` means pagination is not in use.
 * @param options.offset - Optional offset-based pagination. `0` or `undefined` indicates
 *   first page, `> 0` indicates subsequent pages.
 * @param options.filters - Optional array of active filters. Used to determine if empty
 *   state should be `'noneMatchingFilters'` vs `'noneYet'`.
 *
 * @returns A RemoteDataset object with one of the following states:
 *   - `'loading'`: Initial load or any remote is loading
 *   - `'loaded'`: All remotes have data and transform returned a non-empty array
 *   - `'noneYet'`: Empty array on first page with no filters
 *   - `'noneMatchingFilters'`: Empty array on first page with active filters
 *   - `'noneOnPage'`: Empty array on a subsequent page
 *   - `'error'`: Any remote has an error
 *
 * @example
 * ```tsx
 * const result = useRemoteDataset(
 *   {
 *     contracts: { data: contractsData, isValidating: false },
 *     hosts: { data: hostsData, isValidating: false },
 *   },
 *   (values) => values.contracts.map(c => ({ ...c, host: values.hosts.find(h => h.id === c.hostId) })),
 *   { offset: 0, filters: [activeFilter] }
 * )
 *
 * if (result.state === 'loading') return <Skeleton />
 * if (result.state === 'error') return <Error error={result.error} />
 * if (result.state === 'noneYet') return <EmptyState />
 * if (result.state === 'noneMatchingFilters') return <NoMatches />
 * if (result.state === 'noneOnPage') return <EmptyPage />
 * return <DataTable data={result.data} />
 * ```
 */
export function useRemoteDataset<
  Remotes extends Record<string, Remote<unknown>>,
  O,
>(
  remotes: Remotes,
  transform: (values: ValuesOf<Remotes>) => O[],
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
  const stableRemotes = useStableRemotes(remotes)
  const stableFilters = useStableFilters(filters ?? [])
  const currentState = useMemo(
    () =>
      deriveCurrentState(stableRemotes, transform, {
        marker,
        offset,
        filters: stableFilters,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stableRemotes, marker, offset, stableFilters],
  )
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

/**
 * Derives the current RemoteDataset state from the remotes, transform function, and pagination context.
 *
 * State priority:
 * 1. If any remote is loading → 'loading'
 * 2. If any remote has an error → 'error'
 * 3. If all remotes have data:
 *    - Transform returns non-empty array → 'loaded'
 *    - Transform returns empty array → context-aware empty state:
 *      - Not on first page → 'noneOnPage'
 *      - On first page with filters → 'noneMatchingFilters'
 *      - On first page without filters → 'noneYet'
 * 4. If any remote is revalidating → 'loading'
 * 5. Initial state (no data, no loading, no error) → 'loading'
 */
function deriveCurrentState<Remotes extends Record<string, Remote<unknown>>, O>(
  remotes: Remotes,
  transform: (values: ValuesOf<Remotes>) => O[],
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
  const anyLoading = checkAnyLoading(remotes)
  const anyRevalidating = checkAnyValidating(remotes)
  const anyError = checkAnyHaveError(remotes)
  const allData = checkAllHaveData(remotes)
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
    const data = transform(getValues(remotes))
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

/**
 * Determines if the current pagination state represents the first page.
 *
 * Priority:
 * 1. If marker is defined: `null` = first page, `string` = subsequent page
 * 2. If marker is undefined and offset is undefined: no pagination (first page)
 * 3. If offset is defined: `0` = first page, `> 0` = subsequent page
 */
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

/**
 * Determines the appropriate empty state based on pagination and filter context.
 *
 * Returns:
 * - `'noneOnPage'`: Empty results on a subsequent page (not first page)
 * - `'noneMatchingFilters'`: Empty results on first page with active filters
 * - `'noneYet'`: Empty results on first page with no filters
 */
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
