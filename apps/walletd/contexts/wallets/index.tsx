import {
  useTableState,
  useDatasetEmptyState,
  useClientFilters,
  useClientFilteredDataset,
} from '@siafoundation/design-system'
import { useWallets as useWalletsData } from '@siafoundation/react-walletd'
import { createContext, useContext, useMemo } from 'react'
import {
  WalletData,
  columnsDefaultVisible,
  defaultSortField,
  sortOptions,
  WalletType,
} from './types'
import { columns } from './columns'
import { useRouter } from 'next/router'
import { routes } from '../../config/routes'

function useWalletsMain() {
  const response = useWalletsData()
  const router = useRouter()

  const dataset = useMemo<WalletData[] | null>(() => {
    if (!response.data) {
      return null
    }
    const data: WalletData[] = Object.entries(response.data || {}).map(
      ([name, meta]) => ({
        id: name,
        name,
        description: meta.description as string,
        type: meta.type as WalletType,
        onClick: () => router.push(routes.wallet.view.replace(':name', name)),
      })
    )
    return data
  }, [router, response.data])

  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useClientFilters<WalletData>()

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
  } = useTableState('walletd/v0/wallets', {
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

  const dataState = useDatasetEmptyState(
    dataset,
    response.isValidating,
    response.error,
    filters
  )

  return {
    dataState,
    error: response.error,
    datasetCount: datasetFiltered?.length || 0,
    columns: filteredTableColumns,
    dataset: datasetFiltered,
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

type State = ReturnType<typeof useWalletsMain>

const WalletsContext = createContext({} as State)
export const useWallets = () => useContext(WalletsContext)

type Props = {
  children: React.ReactNode
}

export function WalletsProvider({ children }: Props) {
  const state = useWalletsMain()
  return (
    <WalletsContext.Provider value={state}>{children}</WalletsContext.Provider>
  )
}
