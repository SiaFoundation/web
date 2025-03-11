import BigNumber from 'bignumber.js'
import { useMemo } from 'react'
import { ClientFilterItem } from './useClientFilters'
import { Maybe } from '@siafoundation/types'

type DatumValue =
  | BigNumber
  | string
  | boolean
  | number
  | (() => void)
  | unknown[]
  | object

type Props<Datum extends Record<string, DatumValue>> = {
  dataset: Maybe<Datum[]>
  filters: ClientFilterItem<Datum>[]
  sortField: string
  sortDirection: 'asc' | 'desc'
  limit: number
  offset: number
}

export function useClientFilteredDataset<
  Datum extends Record<string, DatumValue>
>({ dataset, filters, sortField, sortDirection, limit, offset }: Props<Datum>) {
  const datasetFiltered = useMemo<Maybe<Datum[]>>(() => {
    if (!dataset) {
      return undefined
    }
    const filterList = Object.entries(filters).map(([_, f]) => f)
    const subset = filterList.length
      ? dataset.filter((datum) => {
          for (const filter of filterList) {
            if (!filter.fn(datum)) {
              return false
            }
          }
          return true
        })
      : dataset
    const data = [...subset]
    return data.sort((a, b) => {
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
  }, [dataset, filters, sortField, sortDirection])

  const datasetPage = useMemo(() => {
    if (!datasetFiltered) {
      return undefined
    }
    return datasetFiltered.slice(offset, offset + limit)
  }, [datasetFiltered, offset, limit])

  return {
    datasetFiltered,
    datasetPage,
  }
}
