import {
  useTableState,
  getContractsTimeRangeBlockHeight,
  useDatasetState,
  useClientFilters,
  useClientFilteredDataset,
  useMultiSelect,
  usePaginationOffset,
} from '@siafoundation/design-system'
import { Maybe } from '@siafoundation/types'
import { useContracts as useContractsData } from '@siafoundation/renterd-react'
import { createContext, useContext, useMemo, useState } from 'react'
import {
  ContractData,
  ContractTableContext,
  GraphMode,
  ViewMode,
  columnsDefaultVisible,
  defaultSortField,
  sortOptions,
} from './types'
import { columns } from './columns'
import { useSyncStatus } from '../../hooks/useSyncStatus'
import { useSiascanUrl } from '../../hooks/useSiascanUrl'
import { useContractMetrics } from './useContractMetrics'
import { defaultDatasetRefreshInterval } from '../../config/swr'
import { useDataset } from './dataset'
import { useFilteredStats } from './useFilteredStats'
import { daysInMilliseconds } from '@siafoundation/units'
import BigNumber from 'bignumber.js'

const defaultLimit = 50

function useContractsMain() {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [graphMode, setGraphMode] = useState<GraphMode>('spending')
  const { limit, offset } = usePaginationOffset(defaultLimit)
  const response = useContractsData({
    config: {
      swr: {
        refreshInterval: defaultDatasetRefreshInterval,
      },
    },
  })

  const syncStatus = useSyncStatus()
  const currentHeight = syncStatus.isSynced
    ? syncStatus.nodeBlockHeight
    : syncStatus.estimatedBlockHeight

  const {
    dataset,
    isFetchingPrunableSizeAll,
    isFetchingPrunableSizeById,
    fetchPrunableSize,
    fetchPrunableSizeAll,
    hasFetchedAllPrunableSize,
  } = useDataset()

  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useClientFilters<ContractData>()

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
  } = useTableState('renterd/v0/contracts', {
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

  const { range: contractsTimeRange } = useMemo(
    () => getContractsTimeRangeBlockHeight(currentHeight, _datasetPage || []),
    [currentHeight, _datasetPage]
  )

  const siascanUrl = useSiascanUrl()

  const filteredStats = useFilteredStats({ datasetFiltered })

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

  const datasetState = useDatasetState({
    datasetPage,
    isValidating: response.isValidating,
    error: response.error,
    offset,
    filters,
  })

  const cellContext = useMemo(() => {
    const context: ContractTableContext = {
      currentHeight,
      contractsTimeRange,
      siascanUrl,
      hasFetchedAllPrunableSize,
      isFetchingPrunableSizeAll,
      fetchPrunableSizeAll,
      filteredStats,
      multiSelect,
    }
    return context
  }, [
    currentHeight,
    contractsTimeRange,
    siascanUrl,
    hasFetchedAllPrunableSize,
    isFetchingPrunableSizeAll,
    fetchPrunableSizeAll,
    filteredStats,
    multiSelect,
  ])

  const selectedContract = useMemo(() => {
    if (multiSelect.selectedIds.length === 1) {
      const selectedContractId = multiSelect.selectedIds[0]
      return dataset?.find((d) => d.id === selectedContractId)
    }
  }, [dataset, multiSelect.selectedIds])

  const thirtyDaysAgo = new Date().getTime() - daysInMilliseconds(30)
  const { contractMetrics: allContractsSpendingMetrics } = useContractMetrics({
    start: thirtyDaysAgo,
  })
  const { contractMetrics: selectedContractSpendingMetrics } =
    useContractMetrics({
      contractId: selectedContract?.id,
      start: selectedContract?.startTime || 0,
      disabled: !selectedContract,
    })

  const contractSizeTotal = useMemo(
    () =>
      dataset?.reduce((acc, { size }) => acc.plus(size), new BigNumber(0)) ??
      new BigNumber(0),
    [dataset]
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
    dataset,
    cellContext,
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
    viewMode,
    setViewMode,
    graphMode,
    setGraphMode,
    selectedContract,
    allContractsSpendingMetrics,
    selectedContractSpendingMetrics,
    isFetchingPrunableSizeAll,
    isFetchingPrunableSizeById,
    fetchPrunableSize,
    fetchPrunableSizeAll,
    multiSelect,
    contractSizeTotal,
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
