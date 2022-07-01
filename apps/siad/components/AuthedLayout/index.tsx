import { AppBackdrop, Flex, ScrollArea } from '@siafoundation/design-system'
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
      <Flex css={{ height: '100%', width: '100%' }}>
        <Sidenav />
        <Flex direction="column" css={{ flex: 1, overflow: 'hidden' }}>
          <Navbar title={title}>{actions}</Navbar>
          <ScrollArea>{children}</ScrollArea>
        </Flex>
      </Flex>
    </RootLayout>
  )
}
