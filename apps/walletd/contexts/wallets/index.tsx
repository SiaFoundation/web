import {
  useTableState,
  useDatasetEmptyState,
  useClientFilters,
  useClientFilteredDataset,
} from '@siafoundation/design-system'
import { WalletMetadata } from '@siafoundation/walletd-types'
import { useWallets as useWalletsData } from '@siafoundation/walletd-react'
import { createContext, useContext, useEffect, useMemo } from 'react'
import {
  WalletData,
  columnsDefaultVisible,
  defaultSortField,
  sortOptions,
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
    mnemonicCache,
    walletActivityAt,
    cacheWalletMnemonic,
    cachedMnemonicCount,
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
    const data: WalletData[] = response.data.map((wallet) => {
      const { id, name, description, dateCreated, lastUpdated, metadata } =
        wallet
      const datum: WalletData = {
        // Transformed data from the API response
        id,
        name,
        description,
        createdAt: new Date(dateCreated).getTime() || 0,
        updatedAt: new Date(lastUpdated).getTime() || 0,
        metadata: (metadata || {}) as WalletMetadata,
        // Copy of the original data for merging into PUT updates
        raw: wallet,
        // State is data that is not persisted in the database,
        // rather it is from the temporary session caches
        state: {
          mnemonic: mnemonicCache[id],
          status: mnemonicCache[id] ? 'unlocked' : 'locked',
          activityAt: walletActivityAt[id],
        },
        // Wallet methods
        actions: {
          unlock: () => openDialog('walletUnlock', { walletId: id }),
          lock: () => cacheWalletMnemonic(id, undefined),
        },
        // Table row click handler
        onClick: () =>
          router.push({
            pathname: routes.wallet.view,
            query: {
              id,
            },
          }),
      }
      return datum
    })
    return data
  }, [
    router,
    response.data,
    mnemonicCache,
    walletActivityAt,
    openDialog,
    cacheWalletMnemonic,
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
    unlockedCount: cachedMnemonicCount,
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
    cacheWalletMnemonic,
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
