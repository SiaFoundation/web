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
      <Flex css={{ height: '100%', width: '100%' }}>
        <Sidenav />
        <Flex direction="column" css={{ flex: 1, overflow: 'hidden' }}>
          <Navbar title={title} filters={filters} actions={actions} />
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
