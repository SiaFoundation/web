import {
  PaginatorUnknownTotal,
  WalletSyncWarning,
} from '@siafoundation/design-system'
import { useSyncStatus } from '../../hooks/useSyncStatus'
import { useTransactions } from '../../contexts/transactions'

export function WalletFilterBar() {
  const { isSynced, syncPercent, isWalletSynced, walletScanPercent } =
    useSyncStatus()
  const { offset, limit, datasetPageTotal, datasetState } = useTransactions()
  return (
    <div className="flex gap-2 w-full">
      <WalletSyncWarning
        isSynced={isSynced}
        isWalletSynced={isWalletSynced}
        syncPercent={syncPercent}
        walletScanPercent={walletScanPercent}
      />
      <div className="flex-1" />
      <PaginatorUnknownTotal
        offset={offset}
        limit={limit}
        pageTotal={datasetPageTotal}
        isLoading={datasetState === 'loading'}
      />
    </div>
  )
}
