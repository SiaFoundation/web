import { useCallback } from 'react'
import useLocalStorageState from 'use-local-storage-state'

export type ContractFilter = {
  id: string
  timeRange?: [number, number]
  values?: string[]
  value?: string
}

export function useContractsFilters() {
  const [filters, _setFilters] = useLocalStorageState<
    Record<string, ContractFilter>
  >('renterd/v0/contracts/filters', {
    defaultValue: {},
  })

  const setFilter = useCallback(
    (value: ContractFilter) => {
      _setFilters((filters) => ({
        ...filters,
        [value.id]: value,
      }))
    },
    [_setFilters]
  )

  const removeFilter = useCallback(
    (id: string) => {
      _setFilters((filters) => ({
        ...filters,
        [id]: undefined,
      }))
    },
    [_setFilters]
  )

  return {
    filters,
    setFilter,
    removeFilter,
  }
}
