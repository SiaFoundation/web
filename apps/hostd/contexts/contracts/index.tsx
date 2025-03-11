import {
  useTableState,
  useDatasetState,
  getContractsTimeRangeBlockHeight,
  useMultiSelect,
  usePaginationOffset,
  useClientFilters,
  useClientFilteredDataset,
} from '@siafoundation/design-system'
import { Maybe } from '@siafoundation/types'
import {
  useContracts as useContractsData,
  useContractsV2 as useContractsV2Data,
} from '@siafoundation/hostd-react'
import { createContext, useContext, useMemo } from 'react'
import {
  columnsDefaultVisible,
  ContractData,
  defaultSortField,
  sortOptions,
} from './types'
import { columns } from './columns'
import { useDataset } from './dataset'
import { useSyncStatus } from '../../hooks/useSyncStatus'
import { useSiascanUrl } from '../../hooks/useSiascanUrl'
import { defaultDatasetRefreshInterval } from '../../config/swr'

const defaultLimit = 50

function useContractsMain() {
  const { limit, offset } = usePaginationOffset(defaultLimit)

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
  } = useTableState('hostd/v0/contracts', {
    columns,
    columnsDefaultVisible,
    sortOptions,
    defaultSortField,
  })

  const response = useContractsData({
    payload: {},
    config: {
      swr: {
        refreshInterval: defaultDatasetRefreshInterval,
      },
    },
  })

  const responseV2 = useContractsV2Data({
    payload: {},
    config: {
      swr: {
        refreshInterval: defaultDatasetRefreshInterval,
      },
    },
  })

  const dataset = useDataset({
    response,
    responseV2,
  })

  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useClientFilters<ContractData>()

  const { estimatedBlockHeight, isSynced, nodeBlockHeight } = useSyncStatus()
  const currentHeight = isSynced ? nodeBlockHeight : estimatedBlockHeight

  const clientSortField = useMemo(
    () => sortOptions.find((o) => o.id === sortField)?.clientId || sortField,
    [sortField]
  )
  const { datasetFiltered, datasetPage: _datasetPage } =
    useClientFilteredDataset({
      dataset,
      filters,
      sortField: clientSortField,
      sortDirection,
      offset,
      limit,
    })

  const { range: contractsTimeRange } = useMemo(
    () => getContractsTimeRangeBlockHeight(currentHeight, _datasetPage || []),
    [currentHeight, _datasetPage]
  )

  const multiSelect = useMultiSelect(_datasetPage)

  const datasetPage = useMemo<Maybe<ContractData[]>>(() => {
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

  const isValidating = response.isValidating
  const error = response.error
  const datasetState = useDatasetState({
    datasetPage,
    isValidating,
    error,
    filters,
    offset,
  })

  const siascanUrl = useSiascanUrl()

  const cellContext = useMemo(
    () => ({
      contractsTimeRange,
      currentHeight,
      siascanUrl,
      multiSelect,
    }),
    [contractsTimeRange, currentHeight, siascanUrl, multiSelect]
  )

  return {
    datasetState,
    offset,
    limit,
    cellContext,
    datasetPageTotal: datasetPage?.length || 0,
    datasetFilteredTotal: datasetFiltered?.length || 0,
    datasetTotal: dataset?.length || 0,
    visibleColumns,
    datasetFiltered,
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
    sortDirection,
    resetDefaultColumnVisibility,
    filters,
    setFilter,
    removeFilter,
    removeLastFilter,
    resetFilters,
    multiSelect,
  }
}

type State = ReturnType<typeof useContractsMain>

const ContractsContext = createContext({} as State)
export const useContracts = () => useContext(ContractsContext)

type Props = {
  children: React.ReactNode
}

export function ContractsProvider({ children }: Props) {
  const state = useContractsMain()
  return (
    <ContractsContext.Provider value={state}>
      {children}
    </ContractsContext.Provider>
  )
}
