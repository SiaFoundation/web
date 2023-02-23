import { useMemo } from 'react'
import { FilterItem } from './useClientFilters'

export function useEmptyStates<Datum>(
  hasFetched: boolean,
  datasetPage: Datum[],
  filters: FilterItem<Datum>[]
) {
  const emptyNoneYet = useMemo(
    () => hasFetched && !datasetPage.length && filters.length === 0,
    [hasFetched, datasetPage, filters]
  )

  const emptyNoneMatchingFilters = useMemo(
    () => hasFetched && !datasetPage.length && filters.length > 0,
    [hasFetched, datasetPage, filters]
  )

  return {
    emptyNoneYet,
    emptyNoneMatchingFilters,
  }
}
