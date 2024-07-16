import type React from 'react'
import { Container } from '../../core/Container'
import { AppBackdrop } from '../AppBackdrop'
import { AppNavbar } from '../AppNavbar'
import { AppRootLayout } from '../AppRootLayout'

type Props = {
  children: React.ReactNode
  appName: string
  title?: string
  filters?: React.ReactNode
  actions?: React.ReactNode
}

export function AppPublicLayout({
  appName,
  title,
  children,
  filters,
  actions,
}: Props) {
  return (
    <AppRootLayout appName={appName} title={title}>
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
