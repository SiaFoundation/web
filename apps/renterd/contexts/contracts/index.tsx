import {
  useTableState,
  getContractsTimeRangeBlockHeight,
  useDatasetEmptyState,
  useClientFilters,
  useClientFilteredDataset,
  useMultiSelect,
  Maybe,
} from '@siafoundation/design-system'
import { useRouter } from 'next/router'
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

const defaultLimit = 50

function useContractsMain() {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [graphMode, setGraphMode] = useState<GraphMode>('spending')
  const router = useRouter()
  const limit = Number(router.query.limit || defaultLimit)
  const offset = Number(router.query.offset || 0)
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
  } = useTableState('renterd/v0/contracts', {
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

  const _datasetPage = useMemo<Maybe<ContractData[]>>(() => {
    if (!datasetFiltered) {
      return undefined
    }
    return datasetFiltered.slice(offset, offset + limit)
  }, [datasetFiltered, offset, limit])

  const { range: contractsTimeRange } = useMemo(
    () => getContractsTimeRangeBlockHeight(currentHeight, _datasetPage || []),
    [currentHeight, _datasetPage]
  )

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
        isSelected: !!multiSelect.selectionMap[datum.id],
      }
    })
  }, [_datasetPage, multiSelect])

  const cellContext = useMemo(() => {
    const context: ContractTableContext = {
      currentHeight: syncStatus.estimatedBlockHeight,
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
    syncStatus.estimatedBlockHeight,
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
    dataset,
    cellContext,
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
