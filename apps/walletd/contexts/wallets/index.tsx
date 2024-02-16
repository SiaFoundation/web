import {
  useTableState,
  useDatasetEmptyState,
  useClientFilters,
  useClientFilteredDataset,
} from '@siafoundation/design-system'
import { useWallets as useWalletsData } from '@siafoundation/react-walletd'
import { createContext, useContext, useEffect, useMemo } from 'react'
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
import { useWalletSeedCache } from './useWalletSeedCache'
import { useDialog } from '../dialog'
import { useAppSettings } from '@siafoundation/react-core'
import { defaultDatasetRefreshInterval } from '../../config/swr'

function useWalletsMain() {
  const response = useWalletsData({
    config: {
      swr: {
        refreshInterval: defaultDatasetRefreshInterval,
      },
    },
  })
  const router = useRouter()
  const { openDialog } = useDialog()
  const { setOnLockCallback } = useAppSettings()
  const {
    seedCache,
    walletActivityAt,
    saveWalletSeed,
    lockAllWallets,
    walletAutoLockTimeout,
    setWalletAutoLockTimeout,
    setWalletAutoLockEnabled,
    walletAutoLockEnabled,
  } = useWalletSeedCache()

  useEffect(() => {
    setOnLockCallback('wallets', () => {
      lockAllWallets()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dataset = useMemo<WalletData[] | null>(() => {
    if (!response.data) {
      return null
    }
    const data: WalletData[] = Object.entries(response.data || {}).map(
      ([id, meta]) => ({
        id,
        name: meta.name as string,
        seed: seedCache[id],
        status: seedCache[id] ? 'unlocked' : 'locked',
        activityAt: walletActivityAt[id],
        seedHash: meta.seedHash as string,
        description: meta.description as string,
        createdAt: (meta.createdAt as number) || 0,
        type: meta.type as WalletType,
        unlock: () => openDialog('walletUnlock', { walletId: id }),
        lock: () => saveWalletSeed(id, undefined),
        onClick: () =>
          router.push({
            pathname: routes.wallet.view,
            query: {
              id,
            },
          }),
      })
    )
    return data
  }, [
    router,
    response.data,
    seedCache,
    walletActivityAt,
    openDialog,
    saveWalletSeed,
  ])

  const wallet = dataset?.find((w) => w.id === (router.query.id as string))

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

  const context = useMemo(
    () => ({
      walletAutoLockTimeout,
      walletAutoLockEnabled,
    }),
    [walletAutoLockEnabled, walletAutoLockTimeout]
  )

  return {
    dataState,
    error: response.error,
    datasetCount: datasetFiltered?.length || 0,
    unlockedCount: dataset?.filter((d) => d.seed).length || 0,
    columns: filteredTableColumns,
    dataset: datasetFiltered,
    context,
    wallet,
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
    saveWalletSeed,
    lockAllWallets,
    walletAutoLockTimeout,
    setWalletAutoLockTimeout,
    setWalletAutoLockEnabled,
    walletAutoLockEnabled,
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
