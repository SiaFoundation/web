import {
  useTableState,
  useClientFilters,
  useClientFilteredDataset,
  usePaginationOffset,
} from '@siafoundation/design-system'
import { useWalletAddresses } from '@siafoundation/walletd-react'
import { createContext, useContext, useMemo } from 'react'
import {
  AddressData,
  CellContext,
  columnsDefaultVisible,
  defaultSortField,
  sortOptions,
} from './types'
import { columns } from './columns'
import { useParams } from 'next/navigation'
import { useSiascanUrl } from '../../hooks/useSiascanUrl'
import { defaultDatasetRefreshInterval } from '../../config/swr'
import { useDataset } from './dataset'
import { Maybe } from '@siafoundation/types'

const defaultLimit = 50

export function useAddressesMain() {
  const params = useParams<Maybe<{ id: Maybe<string> }>>()
  const walletId = params?.id
  const { limit, offset } = usePaginationOffset(defaultLimit)

  const response = useWalletAddresses({
    disabled: !walletId,
    params: {
      id: walletId,
    },
    config: {
      swr: {
        refreshInterval: defaultDatasetRefreshInterval,
      },
    },
  })

  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useClientFilters<AddressData>()

  const { dataset, datasetState, lastIndex } = useDataset({
    walletId,
    response,
    filters,
  })

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
  } = useTableState('walletd/v0/addresses', {
    columns,
    columnsDefaultVisible,
    sortOptions,
    defaultSortField,
  })

  const { datasetFiltered, datasetPage } = useClientFilteredDataset({
    dataset,
    filters,
    sortField,
    sortDirection,
    offset,
    limit,
  })

  const siascanUrl = useSiascanUrl()
  const cellContext = useMemo<CellContext>(
    () => ({
      siascanUrl,
    }),
    [siascanUrl],
  )

  return {
    datasetState,
    error: response.error,
    datasetTotal: dataset?.length || 0,
    datasetFilteredTotal: datasetFiltered?.length || 0,
    datasetPageTotal: datasetPage?.length || 0,
    visibleColumns,
    dataset,
    datasetPage,
    offset,
    limit,
    cellContext,
    lastIndex,
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

type State = ReturnType<typeof useAddressesMain>

const AddressesContext = createContext({} as State)
export const useAddresses = () => useContext(AddressesContext)

type Props = {
  children: React.ReactNode
}

export function AddressesProvider({ children }: Props) {
  const state = useAddressesMain()
  return (
    <AddressesContext.Provider value={state}>
      {children}
    </AddressesContext.Provider>
  )
}
