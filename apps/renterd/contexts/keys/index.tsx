import {
  useTableState,
  useDatasetState,
  useClientFilters,
  useClientFilteredDataset,
  useMultiSelect,
  usePaginationOffset,
} from '@siafoundation/design-system'
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
import { Maybe } from '@siafoundation/types'

const defaultLimit = 50

function useKeysMain() {
  const { limit, offset } = usePaginationOffset(defaultLimit)
  const response = useSettingsS3({
    config: {
      swr: {
        refreshInterval: defaultDatasetRefreshInterval,
      },
    },
  })

  const dataset = useMemo<Maybe<KeyData[]>>(() => {
    if (!response.data) {
      return undefined
    }
    const data: KeyData[] = Object.entries(
      response.data?.authentication.v4Keypairs || {}
    ).map(([key, secret]) => {
      return {
        id: key,
        key,
        secret,
      }
    })
    return data
  }, [response.data])

  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useClientFilters<KeyData>()

  const {
    configurableColumns,
    visibleColumnIds,
    visibleColumns,
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

  const { datasetFiltered, datasetPage: _datasetPage } =
    useClientFilteredDataset({
      dataset,
      filters,
      sortField,
      sortDirection,
      offset,
      limit,
    })

  const multiSelect = useMultiSelect(_datasetPage)

  const datasetPage = useMemo(() => {
    if (!_datasetPage) {
      return undefined
    }
    return _datasetPage.map((datum) => {
      return {
        ...datum,
        onClick: (e: React.MouseEvent<HTMLTableRowElement>) =>
          multiSelect.onSelect(datum.id, e),
        isSelected: !!multiSelect.selection[datum.id],
      }
    })
  }, [_datasetPage, multiSelect])

  const datasetState = useDatasetState({
    datasetPage,
    isValidating: response.isValidating,
    error: response.error,
    offset,
    filters,
  })

  const cellContext = useMemo(
    () =>
      ({
        multiSelect,
      } as CellContext),
    [multiSelect]
  )

  return {
    datasetState,
    limit,
    offset,
    isLoading: response.isLoading,
    error: response.error,
    datasetTotal: dataset?.length || 0,
    datasetFilteredTotal: datasetFiltered?.length || 0,
    datasetPageTotal: datasetPage?.length || 0,
    visibleColumns,
    multiSelect,
    cellContext,
    dataset,
    datasetPage,
    configurableColumns,
    visibleColumnIds,
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
