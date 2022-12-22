import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAppSettings } from '@siafoundation/react-core'
import { Container } from '../../core/Container'
import { AppNavbar } from '../AppNavbar'
import { AppBackdrop } from '../AppBackdrop'
import { AppRootLayout } from '../AppRootLayout'

type Routes = {
  unlock: string
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
  const router = useRouter()
  const { settings } = useAppSettings()

  useEffect(() => {
    if (router.pathname !== routes.unlock && !settings.password) {
      router.replace(routes.unlock)
    }
  }, [router, settings, routes])

  return (
    <AppRootLayout routes={routes}>
      <AppBackdrop />
      <div className="flex h-full">
        <div className="flex flex-col flex-1">
          <AppNavbar title={title} filters={filters} actions={actions} />
          <div className="flex-1">
            <Container className="h-full">{children}</Container>
          </div>
        </div>
      </div>
    </AppRootLayout>
  )
}
