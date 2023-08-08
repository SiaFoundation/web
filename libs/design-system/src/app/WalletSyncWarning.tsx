import { Text } from '../core/Text'
import { Warning16 } from '../icons/carbon'

export function WalletSyncWarning({
  isSynced,
  isWalletSynced,
  syncPercent,
  walletScanPercent,
}: {
  isSynced: boolean
  isWalletSynced: boolean
  syncPercent: number
  walletScanPercent: number
}) {
  if (!isSynced) {
    return (
      <div className="flex gap-2 items-center">
        <Text color="amber">
          <Warning16 />
        </Text>
        <Text size="14">
          Blockchain is syncing ({syncPercent}%), transaction data may be
          incomplete.
        </Text>
      </div>
    )
  }
  if (!isWalletSynced) {
    return (
      <div className="flex gap-2 items-center">
        <Text color="amber">
          <Warning16 />
        </Text>
        <Text size="14">
          Wallet is scanning ({walletScanPercent}%), transaction data may be
          incomplete.
        </Text>
      </div>
    )
  }
  return null
}
