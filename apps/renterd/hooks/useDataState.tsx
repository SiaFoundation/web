import { useEffect, useMemo, useState } from 'react'
import { FilterItem } from './useClientFilters'

type EmptyState = 'loading' | 'noneYet' | 'noneMatchingFilters'

export function useDataState<Datum>(
  dataset: unknown[] | undefined,
  filters: FilterItem<Datum>[]
): EmptyState {
  const [lastDatasetSize, setLastDatasetSize] = useState<number>()
  useEffect(() => {
    if (dataset) {
      setLastDatasetSize(dataset.length)
    }
  }, [dataset, setLastDatasetSize])

  return useMemo(() => {
    // No previous dataset, initialize in loading state.
    if (lastDatasetSize === undefined) {
      return 'loading'
    }
    // Previous dataset not empty and loading.
    // If a loading state between dataset is not desired, turn on
    // swr keepPreviousData on the dataset.
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
  }, [dataset, lastDatasetSize, filters])
}
