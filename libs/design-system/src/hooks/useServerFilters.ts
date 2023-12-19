'use client'

import { usePagesRouter } from '@siafoundation/next'
import { useCallback, useState } from 'react'

export type ServerFilterItem = {
  id: string
  label: string
  value?: string
  values?: string[]
  bool?: boolean
}

export function useServerFilters() {
  const router = usePagesRouter()
  const [filters, _setFilters] = useState<ServerFilterItem[]>([])

  const removePagination = useCallback(() => {
    // remove any limit and offset
    const query = { ...router.query }
    delete query['limit']
    delete query['offset']
    router.replace({
      query,
    })
  }, [router])

  const setFilter = useCallback(
    (item: ServerFilterItem) => {
      _setFilters((filters) => {
        const nextFilters = filters.filter((f) => f.id !== item.id)
        return nextFilters.concat(item)
      })
      removePagination()
    },
    [_setFilters, removePagination]
  )

  const resetFilters = useCallback(() => {
    _setFilters([])
    removePagination()
  }, [_setFilters, removePagination])

  const removeFilter = useCallback(
    (id: string) => {
      _setFilters((filters) => filters.filter((f) => f.id !== id))
      removePagination()
    },
    [_setFilters, removePagination]
  )

  const removeLastFilter = useCallback(() => {
    if (!filters.length) {
      return
    }
    _setFilters((filters) => filters.slice(0, -1))
    removePagination()
  }, [filters, _setFilters, removePagination])

  return {
    filters,
    setFilter,
    removeFilter,
    removeLastFilter,
    resetFilters,
  }
}
