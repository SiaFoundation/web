import {
  useTableState,
  useDatasetState,
  getContractsTimeRangeBlockHeight,
  useMultiSelect,
  usePaginationOffset,
  useServerFilters,
} from '@siafoundation/design-system'
import { Maybe } from '@siafoundation/types'
import {
  useContracts as useContractsData,
  useContractsV2 as useContractsV2Data,
} from '@siafoundation/hostd-react'
import React, { createContext, useCallback, useContext, useMemo } from 'react'
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
import { ContractStatus, V2ContractStatus } from '@siafoundation/hostd-types'
import useLocalStorageState from 'use-local-storage-state'

const defaultLimit = 50

function useContractsMain() {
  const { limit, offset } = usePaginationOffset(defaultLimit)
  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useServerFilters()
  const [versionMode, _setVersionMode] = useLocalStorageState<'v1' | 'v2'>(
    'hostd/v0/contracts/versionMode',
    {
      defaultValue: 'v2',
    },
  )
  const setVersionMode = useCallback(
    (mode: 'v1' | 'v2') => {
      _setVersionMode(mode)
      resetFilters()
    },
    [resetFilters, _setVersionMode],
  )

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
    disabled: versionMode === 'v2',
    payload: {
      limit,
      offset,
      sortField: sortOptions.find((o) => o.id === sortField)?.serverId,
      sortDesc: sortDirection === 'desc',
      contractIDs: filters
        .filter((f) => f.id === 'filterContractId')
        .map((f) => f.value),
      statuses: filters
        .filter((f) => f.id.startsWith('filterStatus'))
        .map((f) => f.value) as ContractStatus[],
    },
    config: {
      swr: {
        refreshInterval: defaultDatasetRefreshInterval,
      },
    },
  })

  const responseV2 = useContractsV2Data({
    disabled: versionMode === 'v1',
    payload: {
      limit,
      offset,
      sortField: sortOptions.find((o) => o.id === sortField)?.serverId,
      sortDesc: sortDirection === 'desc',
      contractIDs: filters
        .filter((f) => f.id === 'filterContractId')
        .map((f) => f.value),
      statuses: filters
        .filter((f) => f.id.startsWith('filterStatus'))
        .map((f) => f.value) as V2ContractStatus[],
    },
    config: {
      swr: {
        refreshInterval: defaultDatasetRefreshInterval,
      },
    },
  })

  const _datasetPage = useDataset({
    versionMode,
    response,
    responseV2,
  })

  const { estimatedBlockHeight, isSynced, nodeBlockHeight } = useSyncStatus()
  const currentHeight = isSynced ? nodeBlockHeight : estimatedBlockHeight

  const { range: contractsTimeRange } = useMemo(
    () => getContractsTimeRangeBlockHeight(currentHeight, _datasetPage || []),
    [currentHeight, _datasetPage],
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
    [contractsTimeRange, currentHeight, siascanUrl, multiSelect],
  )

  return {
    datasetState,
    offset,
    limit,
    cellContext,
    datasetPage,
    datasetPageTotal: datasetPage?.length || 0,
    datasetFilteredTotal:
      versionMode === 'v1'
        ? response.data?.count || 0
        : responseV2.data?.count || 0,
    visibleColumns,
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
    versionMode,
    setVersionMode,
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
