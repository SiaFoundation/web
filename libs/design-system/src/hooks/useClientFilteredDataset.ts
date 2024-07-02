import BigNumber from 'bignumber.js'
import { useMemo } from 'react'
import { ClientFilterItem } from './useClientFilters'

type DatumValue =
  | BigNumber
  | string
  | boolean
  | number
  | (() => void)
  | unknown[]
  | object

type Props<Datum extends Record<string, DatumValue>> = {
  dataset: Datum[] | null
  filters: ClientFilterItem<Datum>[]
  sortField: string
  sortDirection: 'asc' | 'desc'
}

export function useClientFilteredDataset<
  Datum extends Record<string, DatumValue>
>({ dataset, filters, sortField, sortDirection }: Props<Datum>) {
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
      const aVal = a[sortField]
      const bVal = b[sortField]
      if (sortDirection === 'desc') {
        if (aVal === undefined) {
          return 1
        }
        if (bVal === undefined) {
          return -1
        }
        if (aVal instanceof BigNumber && bVal instanceof BigNumber) {
          return aVal.lte(bVal) ? 1 : -1
        }
        return aVal <= bVal ? 1 : -1
      }
      if (aVal === undefined) {
        return -1
      }
      if (bVal === undefined) {
        return 1
      }
      if (aVal instanceof BigNumber && bVal instanceof BigNumber) {
        return aVal.gte(bVal) ? 1 : -1
      }
      return aVal >= bVal ? 1 : -1
    })
    return [...data]
  }, [dataset, filters, sortField, sortDirection])
}
