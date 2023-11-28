import { WalletSyncWarning } from '@siafoundation/design-system'
import { useSyncStatus } from '../../hooks/useSyncStatus'

export function WalletFilterBar() {
  const { isSynced, syncPercent, isWalletSynced, walletScanPercent } =
    useSyncStatus()
  return (
    <div className="flex gap-2 w-full">
      <WalletSyncWarning
        isSynced={isSynced}
        isWalletSynced={isWalletSynced}
        syncPercent={syncPercent}
        walletScanPercent={walletScanPercent}
      />
      <div className="flex-1" />
    </div>
  )
}
