'use client'

import { useCallback, useState } from 'react'
import { useResetPagination } from './useResetPagination'

export type ServerFilterItem = {
  id: string
  label: string
  value?: string
  values?: string[]
  bool?: boolean
}

export function useServerFilters() {
  const [filters, _setFilters] = useState<ServerFilterItem[]>([])
  const resetPaginationParams = useResetPagination()

  const setFilter = useCallback(
    (item: ServerFilterItem) => {
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
  }, [filters, _setFilters, resetPaginationParams])

  return {
    filters,
    setFilter,
    removeFilter,
    removeLastFilter,
    resetFilters,
  }
}
