import {
  useTableState,
  useDatasetEmptyState,
  useClientFilters,
  useClientFilteredDataset,
  useMultiSelect,
} from '@siafoundation/design-system'
import { useRouter } from 'next/router'
import { createContext, useContext, useMemo } from 'react'
import {
  CellContext,
  KeyData,
  columnsDefaultVisible,
  defaultSortField,
  sortOptions,
} from './types'
import { columns } from './columns'
import { defaultDatasetRefreshInterval } from '../../config/swr'
import { useSettingsS3 } from '@siafoundation/renterd-react'

const defaultLimit = 50

function useKeysMain() {
  const router = useRouter()
  const limit = Number(router.query.limit || defaultLimit)
  const offset = Number(router.query.offset || 0)
  const response = useSettingsS3({
    config: {
      swr: {
        refreshInterval: defaultDatasetRefreshInterval,
      },
    },
  })

  const dataset = useMemo<KeyData[] | undefined>(() => {
    if (!response.data) {
      return undefined
    }
    const data: KeyData[] =
      Object.entries(response.data?.authentication.v4Keypairs || {}).map(
        ([key, secret]) => {
          return {
            id: key,
            key,
            secret,
          }
        }
      ) || []
    return data
  }, [response.data])

  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useClientFilters<KeyData>()

  const {
    configurableColumns,
    enabledColumns,
    sortableColumns,
    toggleColumnVisibility,
    setColumnsVisible,
    setColumnsHidden,
    toggleSort,
    setSortDirection,
    setSortField,
    sortField,
    sortDirection,
    resetDefaultColumnVisibility,
  } = useTableState('renterd/v0/keys', {
    columns,
    columnsDefaultVisible,
    sortOptions,
    defaultSortField,
  })

  const datasetFiltered = useClientFilteredDataset({
    dataset,
    filters,
    sortField,
    sortDirection,
  })

  const datasetPage = useMemo<KeyData[] | undefined>(() => {
    if (!datasetFiltered) {
      return undefined
    }
    return datasetFiltered.slice(offset, offset + limit)
  }, [datasetFiltered, offset, limit])

  const filteredTableColumns = useMemo(
    () =>
      columns.filter(
        (column) => column.fixed || enabledColumns.includes(column.id)
      ),
    [enabledColumns]
  )

  const dataState = useDatasetEmptyState(
    datasetFiltered,
    response.isValidating,
    response.error,
    filters
  )

  const {
    onSelect,
    deselect,
    deselectAll,
    selectionMap,
    selectionCount,
    onSelectPage,
    isPageAllSelected,
  } = useMultiSelect(dataset)

  const cellContext = useMemo(
    () =>
      ({
        selectionMap,
        onSelect,
        onSelectPage,
        isPageAllSelected,
      } as CellContext),
    [selectionMap, onSelect, onSelectPage, isPageAllSelected]
  )

  return {
    dataState,
    limit,
    offset,
    isLoading: response.isLoading,
    error: response.error,
    pageCount: datasetPage?.length || 0,
    datasetCount: dataset?.length || 0,
    datasetFilteredCount: datasetFiltered?.length || 0,
    columns: filteredTableColumns,
    selectionMap,
    selectionCount,
    onSelectPage,
    isPageAllSelected,
    deselect,
    deselectAll,
    cellContext,
    dataset,
    datasetPage,
    configurableColumns,
    enabledColumns,
    sortableColumns,
    toggleColumnVisibility,
    setColumnsVisible,
    setColumnsHidden,
    toggleSort,
    setSortDirection,
    setSortField,
    sortField,
    filters,
    setFilter,
    removeFilter,
    removeLastFilter,
    resetFilters,
    sortDirection,
    resetDefaultColumnVisibility,
  }
}

type State = ReturnType<typeof useKeysMain>

const KeysContext = createContext({} as State)
export const useKeys = () => useContext(KeysContext)

type Props = {
  children: React.ReactNode
}

export function KeysProvider({ children }: Props) {
  const state = useKeysMain()
  return <KeysContext.Provider value={state}>{children}</KeysContext.Provider>
}
