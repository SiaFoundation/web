import {
  AppBar,
  Box,
  Container,
  Flex,
  Heading,
} from '@siafoundation/design-system'
// TODO: move logo to design-system component
import logo from '../../../../../../libs/design-system/src/assets/logo.png'
import { Wallet } from './Wallet'

export function Navbar() {
  return (
    <AppBar size="3" color="none" sticky>
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
          <Heading
            css={{
              color: '$siaGreenA12',
              display: 'inline',
              fontStyle: 'oblique',
              fontWeight: '800',
            }}
          >
            Embarcadero
          </Heading>
          <Box css={{ flex: 1 }} />
          <Wallet />
        </Flex>
      </Container>
    </AppBar>
  )
}
