import { AppBackdrop, Box, Container, Flex } from '@siafoundation/design-system'
import React, { useEffect } from 'react'
import { Navbar } from '../Navbar'
import { routes } from '../../config/routes'
import { useSettings } from '@siafoundation/react-core'
import { RootLayout } from '../RootLayout'
import { useRouter } from 'next/router'

type Props = {
  children: React.ReactNode
}

export function PublicLayout({ children }: Props) {
  const router = useRouter()
  const { settings } = useSettings()

  useEffect(() => {
    if (router.pathname !== routes.unlock && !settings.password) {
      router.replace(routes.unlock)
    }
  }, [router, settings])

  return (
    <RootLayout>
      <AppBackdrop />
      <Flex css={{ height: '100%' }}>
        <Flex direction="column" css={{ flex: 1 }}>
          <Navbar />
          <Box css={{ flex: 1 }}>
            <Container css={{ height: '100%' }}>{children}</Container>
          </Box>
        </Flex>
      </Flex>
    </RootLayout>
  )
}
