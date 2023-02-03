import { useCallback, useMemo } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import {
  sortOptions,
  TableColumnId,
  defaultColumns,
  columnMetadata,
} from './types'

export function useContractsSettings() {
  const [enabledColumns, setEnabledColumns] = useLocalStorageState<string[]>(
    'renterd/v0/contracts/enabledColumns',
    {
      defaultValue: defaultColumns,
    }
  )

  const [sortColumn, setSortColumn] = useLocalStorageState<TableColumnId>(
    'renterd/v0/contracts/sortColumn',
    {
      defaultValue: 'startTime',
    }
  )

  const [sortDirection, setSortDirection] = useLocalStorageState<
    'desc' | 'asc'
  >('renterd/v0/contracts/sortDirection', {
    defaultValue: 'desc',
  })

  const toggleColumnVisibility = useCallback(
    (column: string) => {
      setEnabledColumns((columns) => {
        if (columns.includes(column)) {
          return columns.filter((c) => c != column)
        }
        return columns.concat(column)
      })
    },
    [setEnabledColumns]
  )

  const resetDefaultColumnVisibility = useCallback(() => {
    setEnabledColumns(defaultColumns)
  }, [setEnabledColumns])

  const toggleSort = useCallback(
    (column: TableColumnId) => {
      if (sortColumn !== column) {
        setSortColumn(column)
        setSortDirection('asc')
        return
      }
      setSortDirection((dir) => (dir === 'desc' ? 'asc' : 'desc'))
    },
    [sortColumn, setSortColumn, setSortDirection]
  )

  const configurableColumns = useMemo(
    () => Object.entries(columnMetadata).map(([key, value]) => value),
    []
  )

  return {
    configurableColumns,
    enabledColumns,
    toggleColumnVisibility,
    toggleSort,
    setSortDirection,
    setSortColumn,
    sortColumn,
    sortDirection,
    sortOptions,
    resetDefaultColumnVisibility,
  }
}
