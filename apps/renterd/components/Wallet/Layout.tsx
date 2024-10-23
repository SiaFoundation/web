import { WalletLayoutActions } from '@siafoundation/design-system'
import { useWallet } from '@siafoundation/renterd-react'
import { useDialog } from '../../contexts/dialog'
import { routes } from '../../config/routes'
import BigNumber from 'bignumber.js'
import { RenterdSidenav } from '../RenterdSidenav'
import {
  RenterdAuthedLayout,
  RenterdAuthedPageLayoutProps,
} from '../RenterdAuthedLayout'
import { useSyncStatus } from '../../hooks/useSyncStatus'
import { WalletFilterBar } from './WalletFilterBar'

export const Layout = RenterdAuthedLayout
export function useLayoutProps(): RenterdAuthedPageLayoutProps {
  const { openDialog } = useDialog()
  const wallet = useWallet()
  const { isSynced, isWalletSynced, syncPercent, walletScanPercent } =
    useSyncStatus()
  return {
    title: 'Wallet',
    routes,
    sidenav: <RenterdSidenav />,
    openSettings: () => openDialog('settings'),
    actions: (
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
    ),
    stats: <WalletFilterBar />,
  }
}
