import { useEffect, useMemo, useState } from 'react'

type EmptyState =
  | 'loading'
  | 'noneYet'
  | 'noneMatchingFilters'
  | 'error'
  | undefined

export function useDatasetEmptyState(
  dataset: unknown[] | undefined,
  isFetching: boolean,
  error: Error | undefined,
  filters: unknown[]
): EmptyState {
  const [lastDatasetSize, setLastDatasetSize] = useState<number>()
  useEffect(() => {
    // Update last dataset size every time refetching completes
    if (!isFetching && dataset) {
      setLastDatasetSize(dataset.length)
    }
  }, [isFetching, dataset, setLastDatasetSize])

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
    if (lastDatasetSize > 0 && !dataset) {
      return 'loading'
    }
    // Previous dataset was empty, show none state until results.
    // This sticks to none state even when new data is loading to avoid a
    // flickering skeleton loader.
    if (lastDatasetSize === 0) {
      return filters.length === 0 ? 'noneYet' : 'noneMatchingFilters'
    }
    return undefined
  }, [dataset, lastDatasetSize, error, filters])
}
