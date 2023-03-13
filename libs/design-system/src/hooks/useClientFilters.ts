import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

export type ClientFilterItem<Datum> = {
  id: string
  value: string
  label: string
  fn: (datum: Datum) => boolean
}

export function useClientFilters<Datum>() {
  const router = useRouter()
  const [filters, _setFilters] = useState<ClientFilterItem<Datum>[]>([])

  const setFilter = useCallback(
    (item: ClientFilterItem<Datum>) => {
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
