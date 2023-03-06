import BigNumber from 'bignumber.js'
import { useMemo } from 'react'
import { FilterItem } from './useClientFilters'

type Props<Datum> = {
  dataset: Datum[] | null
  filters: FilterItem<Datum>[]
  sortColumn: string
  sortDirection: 'asc' | 'desc'
}

export function useClientFilterData<Datum>({
  dataset,
  filters,
  sortColumn,
  sortDirection,
}: Props<Datum>) {
  return useMemo<Datum[] | null>(() => {
    if (!dataset) {
      return null
    }
    const filterList = Object.entries(filters).map(([_, f]) => f)
    let data = filterList.length
      ? dataset.filter((datum) => {
          for (const filter of filterList) {
            if (!filter.fn(datum)) {
              return false
            }
          }
          return true
        })
      : dataset
    data = data.sort((a, b) => {
      const aVal = a[sortColumn]
      const bVal = b[sortColumn]
      if (sortDirection === 'desc') {
        if (aVal instanceof BigNumber && bVal instanceof BigNumber) {
          return aVal.lte(bVal) ? 1 : -1
        }
        return aVal <= bVal ? 1 : -1
      }
      if (aVal instanceof BigNumber && bVal instanceof BigNumber) {
        return aVal.gte(bVal) ? 1 : -1
      }
      return aVal >= bVal ? 1 : -1
    })
    return [...data]
  }, [dataset, filters, sortColumn, sortDirection])
}
