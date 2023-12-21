'use client'

import { intersection } from '@technically/lodash'
import { useCallback, useMemo } from 'react'
import useLocalStorageState from 'use-local-storage-state'

type Params<ColumnId extends string, SortField extends string> = {
  enabledColumns: ColumnId[]
  defaultSortField?: SortField
  sortOptions?: { id: SortField }[]
}

export function useSorting<ColumnId extends string, SortField extends string>(
  scope: string,
  params: Params<ColumnId, SortField>
) {
  const { defaultSortField, sortOptions, enabledColumns } = params

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

  const sortableColumns = useMemo(() => {
    if (!sortOptions) {
      return []
    }
    const sortFieldIds = sortOptions.map((o) => o.id)
    return intersection(sortFieldIds, enabledColumns as string[]) as SortField[]
  }, [sortOptions, enabledColumns])

  return {
    toggleSort,
    setSortDirection,
    setSortField,
    sortableColumns,
    sortField,
    sortDirection,
  }
}
