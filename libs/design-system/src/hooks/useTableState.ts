import { difference, filter, groupBy, uniq } from 'lodash'
import { useCallback, useMemo } from 'react'
import useLocalStorageState from 'use-local-storage-state'

type Column<ColumnId> = {
  id: ColumnId
  label: string
  sortable?: boolean
  fixed?: boolean
  category?: string
}

const defaultCategories: string[] = []

export function useTableState<ColumnId extends string>(
  scope: string,
  columns: Column<ColumnId>[],
  columnsDefaultVisible: ColumnId[],
  columnsDefaultSort: ColumnId,
  disabledCategories: string[] = defaultCategories
) {
  const [_enabledColumns, setEnabledColumns] = useLocalStorageState<string[]>(
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
      setEnabledColumns((enabled) => {
        if (enabled.includes(column)) {
          return enabled.filter((c) => c !== column)
        }
        return enabled.concat(column)
      })
    },
    [setEnabledColumns]
  )

  const setColumnsVisible = useCallback(
    (columns: string[]) => {
      setEnabledColumns((enabled) => {
        return uniq([...enabled, ...columns])
      })
    },
    [setEnabledColumns]
  )

  const setColumnsHidden = useCallback(
    (columns: string[]) => {
      setEnabledColumns((enabled) => {
        return difference(enabled, columns)
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
    () =>
      columns.filter((column) => {
        const columnExplicitlyDisabled = disabledCategories?.includes(
          column.category || ''
        )
        return !column.fixed && !columnExplicitlyDisabled
      }),
    [columns, disabledCategories]
  )

  const enabledColumns = useMemo(
    () =>
      columns
        .filter((column) => {
          const columnIsLogicallyEnabled =
            column.fixed || _enabledColumns.includes(column.id)
          const columnExplicitlyDisabled = disabledCategories?.includes(
            column.category || ''
          )
          return columnIsLogicallyEnabled && !columnExplicitlyDisabled
        })
        .map((column) => column.id),
    [columns, _enabledColumns, disabledCategories]
  )

  const sortOptions = useMemo(
    () => groupBy(filter(columns, 'sortable'), 'category'),
    [columns]
  )

  return {
    configurableColumns,
    enabledColumns,
    toggleColumnVisibility,
    toggleSort,
    setSortDirection,
    setSortColumn,
    sortColumn,
    setColumnsVisible,
    setColumnsHidden,
    sortDirection,
    sortOptions,
    resetDefaultColumnVisibility,
  }
}
