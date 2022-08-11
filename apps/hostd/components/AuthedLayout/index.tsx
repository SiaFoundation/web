import {
  AppBackdrop,
  Container,
  Flex,
  ScrollArea,
} from '@siafoundation/design-system'
import React from 'react'
import { Sidenav } from './Sidenav'
import { RootLayout } from '../RootLayout'
import { Navbar } from '../Navbar'

type Props = {
  title?: string
  size?: React.ComponentProps<typeof Container>['size']
  filters?: React.ReactNode
  actions?: React.ReactNode
  children: React.ReactNode
}

export function AuthedLayout({
  title,
  size = '4',
  filters,
  actions,
  children,
}: Props) {
  return (
    <RootLayout>
      <AppBackdrop />
      <Flex direction="column" css={{ height: '100%', width: '100%' }}>
        <Navbar title={title} filters={filters} actions={actions} />
        <Flex css={{ flex: 1, overflow: 'hidden' }}>
          <Sidenav />
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
    </RootLayout>
  )
}
