import React from 'react'
import { Container } from '../../core/Container'
import { ScrollArea } from '../../core/ScrollArea'
import { AppBackdrop } from '../AppBackdrop'
import { Sidenav } from './Sidenav'
import { AppRootLayout } from '../AppRootLayout'
import { AppNavbar } from '../AppNavbar'
import BigNumber from 'bignumber.js'

type Props = {
  appName: string
  title?: string
  size?: React.ComponentProps<typeof Container>['size']
  navTitle?: string
  nav?: React.ReactNode
  actions?: React.ReactNode
  sidenav?: React.ReactNode
  children: React.ReactNode
  connectivityRoute: string
  walletBalance?: BigNumber
  routes: {
    lockscreen: string
    syncscreen: string
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
  size = '4',
  nav,
  actions,
  children,
  sidenav,
  connectivityRoute,
  walletBalance,
  routes,
  openSettings,
}: Props) {
  return (
    <AppRootLayout
      appName={appName}
      title={title}
      connectivityRoute={connectivityRoute}
      routes={routes}
    >
      <AppBackdrop />
      <div className="flex h-full w-full">
        <Sidenav
          routes={routes}
          openSettings={openSettings}
          walletBalance={walletBalance}
        >
          {sidenav}
        </Sidenav>
        <div className="flex flex-col flex-1 overflow-hidden">
          <AppNavbar
            title={navTitle === undefined ? title : navTitle}
            nav={nav}
            actions={actions}
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
