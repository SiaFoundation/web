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
  actions?: React.ReactNode
  children: React.ReactNode
}

export function AuthedLayout({ title, actions, children }: Props) {
  return (
    <RootLayout>
      <AppBackdrop />
      <Flex direction="column" css={{ height: '100%', width: '100%' }}>
        <Navbar title={title} actions={actions} />
        <Flex css={{ flex: 1, overflow: 'hidden' }}>
          <Sidenav />
          <ScrollArea>
            <Container size="4" css={{ padding: '$3-5' }}>
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
