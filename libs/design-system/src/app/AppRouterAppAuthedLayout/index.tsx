'use client'

import { useAppSettings } from '@siafoundation/react-core'
import BigNumber from 'bignumber.js'
import { AppBackdrop } from '../AppBackdrop'
import { Sidenav } from '../AppAuthedLayout/Sidenav'
import { useAutoLock } from '../AppAuthedLayout/useAutoLock'
import { useConnAndPassLock } from '../AppAuthedLayout/useConnAndPassLock'

type Props = {
  title?: string
  profile: React.ReactNode
  banner?: React.ReactNode
  dockedControls?: React.ReactNode
  sidenav?: React.ReactNode
  children: React.ReactNode
  connectivityRoute: string
  isSynced: boolean
  showWallet?: boolean
  walletBalanceSc?: {
    unconfirmed: BigNumber
    confirmed: BigNumber
    spendable: BigNumber
    immature: BigNumber
  }
  routes: {
    login: string
    home: string
    node: {
      index: string
    }
    wallet: {
      view: string
    }
  }
  openSettings: () => void
}

export function AppRouterAppAuthedLayout({
  profile,
  banner,
  dockedControls,
  children,
  sidenav,
  connectivityRoute,
  isSynced,
  showWallet,
  walletBalanceSc,
  routes,
  openSettings,
}: Props) {
  const { lock, settings } = useAppSettings()

  useConnAndPassLock({
    lock,
    route: connectivityRoute,
    routes,
  })

  useAutoLock({
    enabled: !!settings.autoLock,
    lockTimeout: settings.autoLockTimeout,
    lock,
  })

  return (
    <div className="h-screen">
      <AppBackdrop />
      <div className="flex flex-col h-full w-full">
        {banner}
        <div className="flex flex-1 w-full overflow-hidden">
          <Sidenav
            routes={routes}
            profile={profile}
            openSettings={openSettings}
            lock={lock}
            showWallet={showWallet}
            walletBalanceSc={walletBalanceSc}
            isSynced={isSynced}
          >
            {sidenav}
          </Sidenav>
          <div className="flex flex-col flex-1 overflow-hidden">{children}</div>
          <div className="z-20 fixed bottom-5 left-0 right-0 flex justify-center dark pointer-events-none">
            {dockedControls}
          </div>
        </div>
      </div>
    </div>
  )
}
