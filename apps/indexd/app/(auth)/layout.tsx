'use client'

import BigNumber from 'bignumber.js'
import { useWallet } from '@siafoundation/indexd-react'
import { AppRouterAppAuthedLayout } from '@siafoundation/design-system'
import { Profile } from '../../components/Profile'
import { connectivityRoute, routes } from '../../config/routes'
import { useSyncStatus } from '../../hooks/useSyncStatus'
import { DockedControls } from '../../components/DockedControls'
import { useDialog } from '../../contexts/dialog'
import { IndexdTestnetWarningBanner } from '../../components/IndexdTestnetWarningBanner'
import { IndexdSidenav } from '../../components/IndexdSidenav'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isSynced } = useSyncStatus()
  const { openDialog } = useDialog()
  const wallet = useWallet()
  return (
    <AppRouterAppAuthedLayout
      profile={<Profile />}
      routes={routes}
      isSynced={isSynced}
      dockedControls={<DockedControls />}
      connectivityRoute={connectivityRoute}
      openSettings={() => openDialog('settings')}
      banner={<IndexdTestnetWarningBanner />}
      sidenav={<IndexdSidenav />}
      walletBalanceSc={
        wallet.data && {
          spendable: new BigNumber(wallet.data.spendable),
          confirmed: new BigNumber(wallet.data.confirmed),
          immature: new BigNumber(wallet.data.immature),
          unconfirmed: new BigNumber(wallet.data.unconfirmed),
        }
      }
    >
      {children}
    </AppRouterAppAuthedLayout>
  )
}
