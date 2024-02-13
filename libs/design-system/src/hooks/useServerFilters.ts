'use client'

import { useAppRouter, usePathname, useSearchParams } from '@siafoundation/next'
import { useCallback, useState } from 'react'

export type ServerFilterItem = {
  id: string
  label: string
  value?: string
  values?: string[]
  bool?: boolean
}

export function useServerFilters() {
  const router = useAppRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [filters, _setFilters] = useState<ServerFilterItem[]>([])

  const removePagination = useCallback(() => {
    // These can be undefined when the page is still initializing
    if (!router || !pathname) {
      return
    }
    // remove any limit and offset
    const query = new URLSearchParams(searchParams)
    query.delete('limit')
    query.delete('offset')
    const str = query.toString()
    if (str) {
      router.replace(`${pathname}?${str}`)
    } else {
      router.replace(pathname)
    }
  }, [router, searchParams, pathname])

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
