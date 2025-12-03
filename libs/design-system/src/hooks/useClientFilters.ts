'use client'

import { useCallback, useState } from 'react'
import { useResetPagination } from './useResetPagination'
import { useScrollReset } from './useScrollReset'

export type ClientFilterItem<Datum> = {
  id: string
  value: string
  label: string
  fn: (datum: Datum) => boolean
}

export function useClientFilters<Datum>(scrollId = 'app-scroll-area') {
  const [filters, _setFilters] = useState<ClientFilterItem<Datum>[]>([])
  const resetPaginationParams = useResetPagination()
  const resetScroll = useScrollReset(scrollId)

  const setFilter = useCallback(
    (item: ClientFilterItem<Datum>) => {
      _setFilters((filters) => {
        const nextFilters = filters.filter((f) => f.id !== item.id)
        return nextFilters.concat(item)
      })
      resetPaginationParams()
      resetScroll()
    },
    [_setFilters, resetPaginationParams, resetScroll],
  )

  const resetFilters = useCallback(() => {
    _setFilters([])
    resetPaginationParams()
    resetScroll()
  }, [_setFilters, resetPaginationParams, resetScroll])

  const removeFilter = useCallback(
    (id: string) => {
      _setFilters((filters) => filters.filter((f) => f.id !== id))
      resetPaginationParams()
      resetScroll()
    },
    [_setFilters, resetPaginationParams, resetScroll],
  )

  const removeLastFilter = useCallback(() => {
    if (!filters.length) {
      return
    }
    _setFilters((filters) => filters.slice(0, -1))
    resetPaginationParams()
    resetScroll()
  }, [_setFilters, filters, resetPaginationParams, resetScroll])

  return {
    filters,
    setFilter,
    removeFilter,
    removeLastFilter,
    resetFilters,
  }
}
