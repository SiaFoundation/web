import {
  AppBar,
  Box,
  Container,
  Flex,
  Heading,
  Logo,
} from '@siafoundation/design-system'
import { Wallet } from './Wallet'

export function Navbar() {
  return (
    <AppBar size="3" color="none" sticky>
      <Container size="4" css={{ position: 'relative' }}>
        <Flex align="center" gap="1" css={{}}>
          <Logo />
          <Heading
            css={{
              color: '$siaGreenA12',
              display: 'inline',
              // fontStyle: 'oblique',
              fontWeight: '600',
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
