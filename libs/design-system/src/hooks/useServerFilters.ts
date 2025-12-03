'use client'

import { useCallback, useState } from 'react'
import { useResetPagination } from './useResetPagination'
import { useScrollReset } from './useScrollReset'

export type ServerFilterItem = {
  id: string
  label: string
  value?: string
  values?: string[]
  bool?: boolean
}

export function useServerFilters(scrollId = 'app-scroll-area') {
  const [filters, _setFilters] = useState<ServerFilterItem[]>([])
  const resetPaginationParams = useResetPagination()
  const resetScroll = useScrollReset(scrollId)

  const setFilter = useCallback(
    (item: ServerFilterItem) => {
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
  }, [filters, _setFilters, resetPaginationParams, resetScroll])

  return {
    filters,
    setFilter,
    removeFilter,
    removeLastFilter,
    resetFilters,
  }
}
