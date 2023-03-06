import React from 'react'
import { Container } from '../../core/Container'
import { ScrollArea } from '../../core/ScrollArea'
import { AppBackdrop } from '../AppBackdrop'
import { Sidenav } from './Sidenav'
import { AppRootLayout } from '../AppRootLayout'
import { AppNavbar } from '../AppNavbar'

type Props = {
  title?: string
  size?: React.ComponentProps<typeof Container>['size']
  nav?: React.ReactNode
  actions?: React.ReactNode
  sidenav?: React.ReactNode
  children: React.ReactNode
  routes: {
    lockscreen: string
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
  title,
  size = '4',
  nav,
  actions,
  children,
  sidenav,
  routes,
  openSettings,
}: Props) {
  return (
    <AppRootLayout routes={routes}>
      <AppBackdrop />
      <div className="flex h-full w-full">
        <Sidenav routes={routes} openSettings={openSettings}>
          {sidenav}
        </Sidenav>
        <div className="flex flex-col flex-1 overflow-hidden">
          <AppNavbar title={title} nav={nav} actions={actions} />
          <ScrollArea>
            <Container size={size} pad={false}>
              <div className="flex flex-col gap-5">{children}</div>
            </Container>
          </ScrollArea>
        </div>
      </div>
    </AppRootLayout>
  )
}
