import { omit } from 'lodash'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

export type FilterItem<Datum> = {
  id: string
  value: string
  label: string
  fn: (datum: Datum) => boolean
}

export function useClientFilters<Datum>() {
  const router = useRouter()
  const [filters, _setFilters] = useState<Record<string, FilterItem<Datum>>>({})

  const setFilter = useCallback(
    (id: string, item: Omit<FilterItem<Datum>, 'id'>) => {
      _setFilters((filters) => ({
        ...filters,
        [id]: {
          ...item,
          id,
        },
      }))
      // remove any limit and offset
      router.replace({
        query: {},
      })
    },
    [router, _setFilters]
  )

  const removeFilter = useCallback(
    (id: string) => {
      _setFilters((filters) => omit(filters, id))
      // remove any limit and offset
      router.replace({
        query: {},
      })
    },
    [router, _setFilters]
  )

  return {
    filters,
    setFilter,
    removeFilter,
  }
}
