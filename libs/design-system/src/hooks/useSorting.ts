'use client'

import { intersection } from '@technically/lodash'
import { useCallback, useMemo } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { useScrollReset } from './useScrollReset'

type Params<ColumnId extends string, SortField extends string> = {
  visibleColumnIds: ColumnId[]
  defaultSortField?: SortField
  defaultSortDirection?: 'desc' | 'asc'
  sortOptions?: { id: SortField }[]
}

export function useSorting<ColumnId extends string, SortField extends string>(
  scope: string,
  params: Params<ColumnId, SortField>,
  scrollId = 'app-scroll-area',
) {
  const {
    defaultSortField,
    defaultSortDirection,
    sortOptions,
    visibleColumnIds,
  } = params

  const [sortField, setSortField] = useLocalStorageState<SortField>(
    `${scope}/sortField`,
    {
      defaultValue: defaultSortField,
    },
  )

  const [sortDirection, setSortDirection] = useLocalStorageState<
    'desc' | 'asc'
  >(`${scope}/sortDirection`, {
    defaultValue: defaultSortDirection || 'desc',
  })

  const resetScroll = useScrollReset(scrollId)

  const setSortFieldWithScroll = useCallback(
    (field: SortField) => {
      resetScroll()
      setSortField(field)
    },
    [setSortField, resetScroll],
  )

  const setSortDirectionWithScroll = useCallback(
    (
      direction: 'desc' | 'asc' | ((prev: 'desc' | 'asc') => 'desc' | 'asc'),
    ) => {
      resetScroll()
      setSortDirection(direction)
    },
    [setSortDirection, resetScroll],
  )

  const toggleSort = useCallback(
    (field: SortField) => {
      if (sortField !== field) {
        setSortField(field)
        setSortDirection('asc')
      } else {
        setSortDirection((dir) => (dir === 'desc' ? 'asc' : 'desc'))
      }
      resetScroll()
    },
    [sortField, setSortField, setSortDirection, resetScroll],
  )

  const sortableColumns = useMemo(() => {
    if (!sortOptions) {
      return []
    }
    const sortFieldIds = sortOptions.map((o) => o.id)
    return intersection(
      sortFieldIds,
      visibleColumnIds as string[],
    ) as SortField[]
  }, [sortOptions, visibleColumnIds])

  return {
    toggleSort,
    setSortDirection: setSortDirectionWithScroll,
    setSortField: setSortFieldWithScroll,
    sortableColumns,
    sortField,
    sortDirection,
  }
}
