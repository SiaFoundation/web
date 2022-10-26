import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSettings } from '@siafoundation/react-core'
import { Box } from '../../core/Box'
import { Container } from '../../core/Container'
import { Flex } from '../../core/Flex'
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
  const { settings } = useSettings()

  useEffect(() => {
    if (router.pathname !== routes.unlock && !settings.password) {
      router.replace(routes.unlock)
    }
  }, [router, settings, routes])

  return (
    <AppRootLayout routes={routes}>
      <AppBackdrop />
      <Flex css={{ height: '100%' }}>
        <Flex direction="column" css={{ flex: 1 }}>
          <AppNavbar title={title} filters={filters} actions={actions} />
          <Box css={{ flex: 1 }}>
            <Container css={{ height: '100%' }}>{children}</Container>
          </Box>
        </Flex>
      </Flex>
    </AppRootLayout>
  )
}
