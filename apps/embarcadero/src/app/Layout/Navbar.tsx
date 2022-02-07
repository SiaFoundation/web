import {
  AppBar,
  Box,
  Container,
  Flex,
  Heading,
} from '@siafoundation/design-system'
import React from 'react'
// TODO: move logo to design-system component
import logo from '../../../../../libs/design-system/src/assets/logo.png'
import { Wallet } from './Wallet'

export function Navbar() {
  return (
    <AppBar size="3" color="none">
      <Container size="4" css={{ position: 'relative' }}>
        <Flex align="center" gap="1" css={{}}>
          <Box
            as="img"
            src={logo}
            alt="Logo"
            css={{
              height: '30px',
            }}
          />
          <Flex
            direction="column"
            gap="1"
            css={{ position: 'relative', flex: 1 }}
          >
            <Heading css={{ color: '#111', fontWeight: 'bolder' }}>
              Embarcadero
            </Heading>
          </Flex>
          <Wallet />
        </Flex>
      </Container>
    </AppBar>
  )
}
