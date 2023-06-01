import { difference, intersection, uniq } from 'lodash'
import { useCallback, useMemo } from 'react'
import useLocalStorageState from 'use-local-storage-state'

type Column<ColumnId> = {
  id: ColumnId
  label: string
  sortable?: boolean
  fixed?: boolean
  category?: string
}

const defaultDisabledCategories: string[] = []

type Params<ColumnId extends string, SortField extends string> = {
  columns: Column<ColumnId>[]
  columnsDefaultVisible: ColumnId[]
  defaultSortField?: SortField
  sortOptions?: { id: SortField }[]
  disabledCategories?: string[]
}

export function useTableState<
  ColumnId extends string,
  SortField extends string
>(scope: string, params: Params<ColumnId, SortField>) {
  const {
    columns,
    columnsDefaultVisible,
    defaultSortField,
    sortOptions,
    disabledCategories,
  } = {
    disabledCategories: defaultDisabledCategories,
    ...params,
  }

  const [_enabledColumns, setEnabledColumns] = useLocalStorageState<string[]>(
    `${scope}/enabledColumns`,
    {
      defaultValue: columnsDefaultVisible,
    }
  )

  const [sortField, setSortField] = useLocalStorageState<SortField>(
    `${scope}/sortField`,
    {
      defaultValue: defaultSortField,
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
    (field: SortField) => {
      if (sortField !== field) {
        setSortField(field)
        setSortDirection('asc')
        return
      }
      setSortDirection((dir) => (dir === 'desc' ? 'asc' : 'desc'))
    },
    [sortField, setSortField, setSortDirection]
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

  const sortableColumns = useMemo(() => {
    if (!sortOptions) {
      return []
    }
    const sortFieldIds = sortOptions.map((o) => o.id)
    return intersection(sortFieldIds, enabledColumns as string[]) as SortField[]
  }, [sortOptions, enabledColumns])

  return {
    configurableColumns,
    enabledColumns,
    toggleColumnVisibility,
    toggleSort,
    setSortDirection,
    setSortField,
    sortableColumns,
    sortField,
    setColumnsVisible,
    setColumnsHidden,
    sortDirection,
    resetDefaultColumnVisibility,
  }
}
