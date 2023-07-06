import React from 'react'
import { useAppSettings } from '@siafoundation/react-core'
import { Container } from '../../core/Container'
import { ScrollArea } from '../../core/ScrollArea'
import { AppBackdrop } from '../AppBackdrop'
import { Sidenav } from './Sidenav'
import { AppRootLayout } from '../AppRootLayout'
import { AppNavbar } from '../AppNavbar'
import BigNumber from 'bignumber.js'
import { useAutoLock } from './useAutoLock'
import { useConnAndPassLock } from './useConnAndPassLock'

type Props = {
  appName: string
  title?: string
  size?: React.ComponentProps<typeof Container>['size']
  navTitle?: React.ReactNode
  profile: React.ReactNode
  nav?: React.ReactNode
  actions?: React.ReactNode
  sidenav?: React.ReactNode
  stats?: React.ReactNode
  children: React.ReactNode
  connectivityRoute: string
  isSynced: boolean
  showWallet?: boolean
  walletBalance?: BigNumber
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

export function AppAuthedLayout({
  appName,
  title,
  navTitle,
  profile,
  size = '4',
  nav,
  actions,
  stats,
  children,
  sidenav,
  connectivityRoute,
  isSynced,
  showWallet,
  walletBalance,
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
    <AppRootLayout appName={appName} title={title}>
      <AppBackdrop />
      <div className="flex h-full w-full">
        <Sidenav
          routes={routes}
          profile={profile}
          openSettings={openSettings}
          lock={lock}
          showWallet={showWallet}
          walletBalance={walletBalance}
          isSynced={isSynced}
        >
          {sidenav}
        </Sidenav>
        <div className="flex flex-col flex-1 overflow-hidden">
          <AppNavbar
            title={navTitle === undefined ? title : navTitle}
            nav={nav}
            actions={actions}
            stats={stats}
          />
          <ScrollArea className="z-0">
            <Container size={size} pad={false}>
              <div className="flex flex-col gap-5">{children}</div>
            </Container>
          </ScrollArea>
        </div>
      </div>
    </AppRootLayout>
  )
}
