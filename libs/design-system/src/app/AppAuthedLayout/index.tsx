'use client'

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
  banner?: React.ReactNode
  actions?: React.ReactNode
  sidenav?: React.ReactNode
  stats?: React.ReactNode
  after?: React.ReactNode
  children: React.ReactNode
  connectivityRoute: string
  isSynced: boolean
  showWallet?: boolean
  walletBalanceSc?: {
    unconfirmed: BigNumber
    confirmed: BigNumber
    spendable: BigNumber
    immature?: BigNumber
  }
  scroll?: boolean
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
  banner,
  nav,
  actions,
  stats,
  after,
  children,
  sidenav,
  connectivityRoute,
  isSynced,
  showWallet,
  walletBalanceSc,
  routes,
  scroll = true,
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
          <div className="flex flex-col flex-1 overflow-hidden">
            <AppNavbar
              title={navTitle === undefined ? title : navTitle}
              nav={nav}
              actions={actions}
              stats={stats}
              after={after}
            />
            {scroll ? (
              <ScrollArea className="z-0">
                <Container size={size} pad={false}>
                  <div className="flex flex-col gap-5">{children}</div>
                </Container>
              </ScrollArea>
            ) : (
              <Container
                size={size}
                pad={false}
                className="flex-1 flex flex-col gap-5 overflow-hidden"
              >
                {children}
              </Container>
            )}
          </div>
        </div>
      </div>
    </AppRootLayout>
  )
}
