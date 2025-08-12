import { WalletLayoutActions } from '@siafoundation/design-system'
import { useAdminWallet } from '@siafoundation/indexd-react'
import { useDialog } from '../../contexts/dialog'
import BigNumber from 'bignumber.js'
import { useSyncStatus } from '../../hooks/useSyncStatus'

export function WalletActions() {
  const { openDialog } = useDialog()
  const wallet = useAdminWallet()
  const { isSynced, isWalletSynced, syncPercent, walletScanPercent } =
    useSyncStatus()
  return (
    <WalletLayoutActions
      isSynced={isSynced}
      isWalletSynced={isWalletSynced}
      syncPercent={syncPercent}
      walletScanPercent={walletScanPercent}
      balanceSc={
        wallet.data
          ? {
              spendable: new BigNumber(wallet.data.spendable),
              unconfirmed: new BigNumber(wallet.data.unconfirmed),
              confirmed: new BigNumber(wallet.data.confirmed),
              immature: new BigNumber(wallet.data.immature),
            }
          : undefined
      }
      receiveSiacoin={() => openDialog('addressDetails')}
      sendSiacoin={() => openDialog('sendSiacoin')}
    />
  )
}
