import { filter, groupBy, values } from 'lodash'
import { useCallback, useMemo } from 'react'
import useLocalStorageState from 'use-local-storage-state'

type ColumnMeta<ColumnId> = { id: ColumnId; label: string; sortable?: string }

export function useTableState<ColumnId extends string>(
  scope: string,
  columnsMeta: Record<ColumnId, ColumnMeta<ColumnId>>,
  columnsDefaultVisible: ColumnId[],
  columnsDefaultSort: ColumnId
) {
  const [enabledColumns, setEnabledColumns] = useLocalStorageState<string[]>(
    `${scope}/enabledColumns`,
    {
      defaultValue: columnsDefaultVisible,
    }
  )

  const [sortColumn, setSortColumn] = useLocalStorageState<ColumnId>(
    `${scope}/sortColumn`,
    {
      defaultValue: columnsDefaultSort,
    }
  )

  const [sortDirection, setSortDirection] = useLocalStorageState<
    'desc' | 'asc'
  >(`${scope}/sortDirection`, {
    defaultValue: 'desc',
  })

  const toggleColumnVisibility = useCallback(
    (column: string) => {
      setEnabledColumns((columns) => {
        if (columns.includes(column)) {
          return columns.filter((c) => c !== column)
        }
        return columns.concat(column)
      })
    },
    [setEnabledColumns]
  )

  const resetDefaultColumnVisibility = useCallback(() => {
    setEnabledColumns(columnsDefaultVisible)
  }, [setEnabledColumns, columnsDefaultVisible])

  const toggleSort = useCallback(
    (column: ColumnId) => {
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
    () => values(columnsMeta) as ColumnMeta<ColumnId>[],
    [columnsMeta]
  )

  const sortOptions = useMemo(
    () => groupBy(filter(columnsMeta, 'sortable'), 'sortable'),
    [columnsMeta]
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
