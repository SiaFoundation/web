'use client'

import { useEffect, useMemo, useState } from 'react'

export type DatasetState =
  | 'loading'
  | 'noneYet'
  | 'noneMatchingFilters'
  | 'noneOnPage'
  | 'error'
  | 'loaded'

/**
 * Returns the current sate of the dataset. Note that an empty dataset should
 * be an empty array. An undefined value represents data that has not finished
 * initial fetch or fetch after a key change.
 **/
export function useDatasetState({
  datasetPage,
  isValidating,
  error,
  filters,
  offset,
  marker,
}: {
  datasetPage: unknown[] | undefined
  isValidating: boolean
  error: Error | undefined
  offset?: number
  marker?: string | null
  filters?: unknown[]
}): DatasetState {
  const isOnFirstPage = getIsOnFirstPage({ offset, marker })
  const [lastDatasetSize, setLastDatasetSize] = useState<number>()
  useEffect(() => {
    // Update last dataset size every time refetching completes.
    if (!isValidating && datasetPage) {
      setLastDatasetSize(datasetPage.length)
    }
  }, [isValidating, datasetPage, setLastDatasetSize])

  return useMemo(() => {
    if (error) {
      return 'error'
    }
    // No previous dataset, initialize in loading state.
    if (lastDatasetSize === undefined) {
      return 'loading'
    }
    // Previous dataset not empty and loading.
    // If a loading state between dataset is not desired, turn on
    // swr keepPreviousData on the dataset.
    // Note that dataset will be defined if revalidating same key.
    if (lastDatasetSize > 0 && !datasetPage) {
      return 'loading'
    }
    // Previous dataset was empty, show none state until results.
    // This sticks to none state even when new data is loading to avoid a
    // flickering skeleton loader.
    if (lastDatasetSize === 0) {
      if (!isOnFirstPage) {
        return 'noneOnPage'
      }
      return !filters || filters.length === 0
        ? 'noneYet'
        : 'noneMatchingFilters'
    }
    return 'loaded'
  }, [datasetPage, lastDatasetSize, error, filters, isOnFirstPage])
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
