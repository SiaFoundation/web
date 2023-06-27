import {
  useTableState,
  useDatasetEmptyState,
  useClientFilters,
  useClientFilteredDataset,
} from '@siafoundation/design-system'
import { useWalletAddresses } from '@siafoundation/react-walletd'
import { createContext, useContext, useMemo } from 'react'
import {
  AddressData,
  columnsDefaultVisible,
  defaultSortField,
  sortOptions,
} from './types'
import { columns } from './columns'
import { useRouter } from 'next/router'
import { useDialog } from '../dialog'

export function useAddressesMain() {
  const { openDialog } = useDialog()
  const router = useRouter()
  const id = router.query.id as string
  const response = useWalletAddresses({
    disabled: !id,
    params: {
      id,
    },
  })

  const dataset = useMemo<AddressData[] | null>(() => {
    if (!response.data) {
      return null
    }
    const data: AddressData[] = Object.entries(response.data || {}).map(
      ([address, meta]) => ({
        id: address,
        address,
        description: meta.description as string,
        index: meta.index as number,
        onClick: () =>
          openDialog('addressUpdate', {
            walletId: id,
            address,
          }),
      })
    )
    return data
  }, [response.data, openDialog, id])

  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useClientFilters<AddressData>()

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

  const dataState = useDatasetEmptyState(
    dataset,
    response.isValidating,
    response.error,
    filters
  )

  const lastIndex = (dataset || []).reduce(
    (highest, { index }) => (index > highest ? index : highest),
    -1
  )

  return {
    dataState,
    error: response.error,
    datasetCount: datasetFiltered?.length || 0,
    columns: filteredTableColumns,
    dataset: datasetFiltered,
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
