import React from 'react'
import { Container } from '../../core/Container'
import { Flex } from '../../core/Flex'
import { ScrollArea } from '../../core/ScrollArea'
import { AppBackdrop } from '../AppBackdrop'
import { Sidenav } from './Sidenav'
import { AppRootLayout } from '../AppRootLayout'
import { AppNavbar } from '../AppNavbar'

type Props = {
  title?: string
  size?: React.ComponentProps<typeof Container>['size']
  filters?: React.ReactNode
  actions?: React.ReactNode
  sidenav?: React.ReactNode
  children: React.ReactNode
  routes: {
    home: string
    unlock: string
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
  filters,
  actions,
  children,
  sidenav,
  routes,
  openSettings,
}: Props) {
  return (
    <AppRootLayout routes={routes}>
      <AppBackdrop />
      <Flex css={{ height: '100%', width: '100%' }}>
        <Sidenav routes={routes} openSettings={openSettings}>
          {sidenav}
        </Sidenav>
        <Flex direction="column" css={{ flex: 1, overflow: 'hidden' }}>
          <AppNavbar title={title} filters={filters} actions={actions} />
          <ScrollArea>
            <Container
              size={size}
              css={{ padding: size !== 'flush' ? '$3-5' : undefined }}
            >
              <Flex direction="column" gap="3-5">
                {children}
              </Flex>
            </Container>
          </ScrollArea>
        </Flex>
      </Flex>
    </AppRootLayout>
  )
}
