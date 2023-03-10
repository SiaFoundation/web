import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

export type FilterItem = {
  id: string
  label: string
  value?: string
  values?: string[]
  bool?: boolean
}

export function useServerFilters() {
  const router = useRouter()
  const [filters, _setFilters] = useState<FilterItem[]>([])

  const setFilter = useCallback(
    (item: FilterItem) => {
      _setFilters((filters) => {
        const nextFilters = filters.filter((f) => f.id !== item.id)
        return nextFilters.concat(item)
      })
      // remove any limit and offset
      router.replace({
        query: {},
      })
    },
    [router, _setFilters]
  )

  const resetFilters = useCallback(() => {
    _setFilters([])
    // remove any limit and offset
    router.replace({
      query: {},
    })
  }, [router, _setFilters])

  const removeFilter = useCallback(
    (id: string) => {
      _setFilters((filters) => filters.filter((f) => f.id !== id))
      // remove any limit and offset
      router.replace({
        query: {},
      })
    },
    [router, _setFilters]
  )

  const removeLastFilter = useCallback(() => {
    if (!filters.length) {
      return
    }
    _setFilters((filters) => filters.slice(0, -1))
    // remove any limit and offset
    router.replace({
      query: {},
    })
  }, [router, _setFilters, filters])

  return {
    filters,
    setFilter,
    removeFilter,
    removeLastFilter,
    resetFilters,
  }
}
