import {
  AppBar,
  Box,
  Container,
  Flex,
  Heading,
} from '@siafoundation/design-system'
import { UserMenu } from './User/UserMenu'
import { WalletSparkline } from './WalletSparkline'

type Props = {
  title?: string
  children?: React.ReactNode
}

export function Navbar({ title, children }: Props) {
  return (
    <AppBar size="2" sticky border>
      <Container size="4">
        <Flex align="center" gap="1" justify="between">
          {title && <Heading>{title}</Heading>}
          <Box css={{ height: '20px', width: '100px' }}>
            <WalletSparkline />
          </Box>
          <Box css={{ flex: 1 }} />
          {children}
          <UserMenu size="2" />
        </Flex>
      </Container>
    </AppBar>
  )
}
