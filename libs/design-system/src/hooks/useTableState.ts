'use client'

import { difference, intersection, uniq } from '@technically/lodash'
import { useCallback, useMemo } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { useSorting } from './useSorting'

type TableColumn<ColumnId extends string = string> = {
  id: ColumnId
  label: string
  sortable?: boolean
  fixed?: boolean
  category?: string
}

type Params<Col extends TableColumn, SortField extends string> = {
  columns: Col[]
  columnsDefaultVisible: Col['id'][]
  defaultSortField?: SortField
  sortOptions?: { id: SortField }[]
}

export function useTableState<
  Column extends TableColumn,
  SortField extends string
>(scope: string, params: Params<Column, SortField>) {
  const { columns, columnsDefaultVisible, defaultSortField, sortOptions } = {
    ...params,
  }

  const [_enabledColumnIds, setEnabledColumnIds] = useLocalStorageState<
    string[]
  >(`${scope}/enabledColumns`, {
    defaultValue: columnsDefaultVisible,
  })

  const toggleColumnVisibility = useCallback(
    (column: string) => {
      setEnabledColumnIds((enabled) => {
        if (enabled.includes(column)) {
          return enabled.filter((c) => c !== column)
        }
        return enabled.concat(column)
      })
    },
    [setEnabledColumnIds]
  )

  const setColumnsVisible = useCallback(
    (columns: string[]) => {
      setEnabledColumnIds((enabled) => {
        return uniq([...enabled, ...columns])
      })
    },
    [setEnabledColumnIds]
  )

  const setColumnsHidden = useCallback(
    (columns: string[]) => {
      setEnabledColumnIds((enabled) => {
        return difference(enabled, columns)
      })
    },
    [setEnabledColumnIds]
  )

  const resetDefaultColumnVisibility = useCallback(() => {
    setEnabledColumnIds(columnsDefaultVisible)
  }, [setEnabledColumnIds, columnsDefaultVisible])

  const configurableColumns = useMemo(
    () =>
      columns.filter((column) => {
        return !column.fixed
      }),
    [columns]
  )

  const visibleColumns = useMemo(
    () =>
      columns.filter(
        (column) => column.fixed || _enabledColumnIds.includes(column.id)
      ),
    [_enabledColumnIds, columns]
  )

  const visibleColumnIds = useMemo(
    () => visibleColumns.map((column) => column.id),
    [visibleColumns]
  )

  const {
    sortField,
    sortDirection,
    setSortField,
    setSortDirection,
    toggleSort,
  } = useSorting(scope, {
    defaultSortField,
    sortOptions,
    visibleColumnIds,
  })

  const sortableColumns = useMemo(() => {
    if (!sortOptions) {
      return []
    }
    const sortFieldIds = sortOptions.map((o) => o.id)
    return intersection(
      sortFieldIds,
      visibleColumnIds as string[]
    ) as SortField[]
  }, [sortOptions, visibleColumnIds])

  return {
    configurableColumns,
    visibleColumnIds,
    visibleColumns,
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
