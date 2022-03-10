import { AppBar } from '../../primitives/AppBar'
import { Container } from '../../primitives/Container'
import { Flex } from '../../primitives/Flex'
import { UserDropdownMenu } from '../UserDropdownMenu'

type Props = {
  children: React.ReactNode
}

export function HeaderRight({ children }: Props) {
  return (
    <AppBar color="none" css={{ width: '100%' }}>
      <Container size="4">
        {/* <Flex align="center" justify="between" css={{ height: '50px' }}>
          <UserDropdownMenu />
        </Flex> */}
        {children}
      </Container>
    </AppBar>
  )
}
