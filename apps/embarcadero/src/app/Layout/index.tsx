import {
  Box,
  Container,
  Flex,
  Heading,
  RLink,
  Text,
} from '@siafoundation/design-system'
import { capitalize } from 'lodash'
import React, { Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import logo from '../../public/logo.png'
import { Footer } from './Footer'
import { AccountStatus } from './AccountStatus'

type Props = {
  children: React.ReactNode
}

export function Layout({ children }: Props) {
  const location = useLocation()
  return (
    <Container size="4" css={{ position: 'relative' }}>
      <Box
        css={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          pointerEvents: 'none',
          width: '200vw',
          height: '200vh',
          background:
            'radial-gradient(50% 50% at 50% 50%,$siaGreenLight 0,rgba(255,255,255,0) 100%)',
          transform: 'translate(-50vw,-100vh)',
          zIndex: -1,
        }}
      />
      <Flex
        align="center"
        gap="1"
        css={{
          top: '$3',
          left: '$3',
          padding: '$3 0',
        }}
      >
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
          <Text
            size="1"
            css={{ position: 'absolute', top: '$5', color: '$gray9' }}
          >
            Escrowless SC/SF swaps
          </Text>
        </Flex>
        <AccountStatus />
      </Flex>
      <Container
        size="1"
        css={{
          padding: '$9 0',
        }}
      >
        <Flex
          direction="column"
          gap="4"
          justify="center"
          css={{
            boxShadow:
              'rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px, rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px',
            backgroundColor: '#fff',
            borderRadius: '$4',
            padding: '$3 $3',
          }}
        >
          <Flex gap="1">
            <RLink to="/" css={{ fontSize: '$6' }}>
              Swap
            </RLink>
            {location?.pathname.length > 1 && (
              <Fragment>
                <Text size="6">/</Text>
                <Text size="6">{capitalize(location.pathname.slice(1))}</Text>
              </Fragment>
            )}
          </Flex>
          <Box>{children}</Box>
        </Flex>
      </Container>
      <Footer />
    </Container>
  )
}
