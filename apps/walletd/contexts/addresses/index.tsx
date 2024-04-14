import {
  useTableState,
  useClientFilters,
  useClientFilteredDataset,
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
import { useRouter } from 'next/router'
import { useSiascanUrl } from '../../hooks/useSiascanUrl'
import { defaultDatasetRefreshInterval } from '../../config/swr'
import { useDataset } from './dataset'

export function useAddressesMain() {
  const router = useRouter()
  const walletId = router.query.id as string

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

  const { dataset, dataState, lastIndex } = useDataset({
    walletId,
    response,
    filters,
  })

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
  } = useTableState('walletd/v0/addresses', {
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

  const filteredTableColumns = useMemo(
    () =>
      columns.filter(
        (column) => column.fixed || enabledColumns.includes(column.id)
      ),
    [enabledColumns]
  )

  const siascanUrl = useSiascanUrl()
  const cellContext = useMemo<CellContext>(
    () => ({
      siascanUrl,
    }),
    [siascanUrl]
  )

  return {
    dataState,
    error: response.error,
    datasetCount: datasetFiltered?.length || 0,
    columns: filteredTableColumns,
    dataset: datasetFiltered,
    cellContext,
    lastIndex,
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
