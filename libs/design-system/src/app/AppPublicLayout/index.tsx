import React from 'react'
import { Container } from '../../core/Container'
import { AppNavbar } from '../AppNavbar'
import { AppBackdrop } from '../AppBackdrop'
import { AppRootLayout } from '../AppRootLayout'

type Routes = {
  home: string
  lockscreen: string
}

type Props = {
  children: React.ReactNode
  routes: Routes
  appName: string
  title?: string
  connectivityRoute: string
  filters?: React.ReactNode
  actions?: React.ReactNode
}

export function AppPublicLayout({
  appName,
  title,
  connectivityRoute,
  children,
  routes,
  filters,
  actions,
}: Props) {
  return (
    <AppRootLayout
      appName={appName}
      title={title}
      connectivityRoute={connectivityRoute}
      routes={routes}
    >
      <AppBackdrop />
      <div className="flex h-full">
        <div className="flex flex-col flex-1">
          <AppNavbar nav={filters} actions={actions} />
          <div className="flex-1">
            <Container className="h-full">{children}</Container>
          </div>
        </div>
      </div>
    </AppRootLayout>
  )
}
