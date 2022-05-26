import { Container, Flex } from '@siafoundation/design-system'
import React from 'react'
import { Navbar } from '../Navbar'
import { Navigate, useLocation } from 'react-router-dom'
import { routes } from '../../config/routes'
import { useSettings } from '@siafoundation/react-core'
import { RootLayout } from '../RootLayout'

type Props = {
  children: React.ReactNode
}

export function PublicLayout({ children }: Props) {
  const location = useLocation()
  const { settings } = useSettings()

  if (location.pathname !== routes.unlock && !settings.password) {
    return <Navigate to={routes.unlock} replace />
  }

  return (
    <RootLayout>
      <Flex css={{ height: '100%', background: '$loContrast' }}>
        <Flex direction="column" css={{ flex: 1 }}>
          <Navbar />
          <Container>{children}</Container>
        </Flex>
      </Flex>
    </RootLayout>
  )
}
