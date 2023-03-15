import React from 'react'
import { Container } from '../../core/Container'
import { AppNavbar } from '../AppNavbar'
import { AppBackdrop } from '../AppBackdrop'
import { AppRootLayout } from '../AppRootLayout'

type Routes = {
  home: string
  lockscreen: string
  syncscreen: string
}

type Props = {
  children: React.ReactNode
  routes: Routes
  title?: string
  filters?: React.ReactNode
  actions?: React.ReactNode
}

export function AppPublicLayout({
  children,
  routes,
  title,
  filters,
  actions,
}: Props) {
  return (
    <AppRootLayout routes={routes}>
      <AppBackdrop />
      <div className="flex h-full">
        <div className="flex flex-col flex-1">
          <AppNavbar title={title} nav={filters} actions={actions} />
          <div className="flex-1">
            <Container className="h-full">{children}</Container>
          </div>
        </div>
      </div>
    </AppRootLayout>
  )
}
