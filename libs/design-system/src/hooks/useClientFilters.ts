'use client'

import { useCallback, useState } from 'react'
import { useResetPagination } from './useResetPagination'

export type ClientFilterItem<Datum> = {
  id: string
  value: string
  label: string
  fn: (datum: Datum) => boolean
}

export function useClientFilters<Datum>() {
  const [filters, _setFilters] = useState<ClientFilterItem<Datum>[]>([])
  const resetPaginationParams = useResetPagination()

  const setFilter = useCallback(
    (item: ClientFilterItem<Datum>) => {
      _setFilters((filters) => {
        const nextFilters = filters.filter((f) => f.id !== item.id)
        return nextFilters.concat(item)
      })
      resetPaginationParams()
    },
    [_setFilters, resetPaginationParams],
  )

  const resetFilters = useCallback(() => {
    _setFilters([])
    resetPaginationParams()
  }, [_setFilters, resetPaginationParams])

  const removeFilter = useCallback(
    (id: string) => {
      _setFilters((filters) => filters.filter((f) => f.id !== id))
      resetPaginationParams()
    },
    [_setFilters, resetPaginationParams],
  )

  const removeLastFilter = useCallback(() => {
    if (!filters.length) {
      return
    }
    _setFilters((filters) => filters.slice(0, -1))
    resetPaginationParams()
  }, [_setFilters, filters, resetPaginationParams])

  return {
    filters,
    setFilter,
    removeFilter,
    removeLastFilter,
    resetFilters,
  }
}
