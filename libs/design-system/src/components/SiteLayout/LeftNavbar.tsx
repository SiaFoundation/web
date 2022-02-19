import { AppBar } from '../../primitives/AppBar'
import { Container } from '../../primitives/Container'
import { Flex } from '../../primitives/Flex'
import { Heading } from '../../primitives/Heading'
import { UserDropdownMenu } from '../UserDropdownMenu'

type Props = {
  title?: string
}

export function LeftNavbar({ title }: Props) {
  return (
    <AppBar
      sticky
      glass
      css={{
        zIndex: 2,
      }}
    >
      <Container size="4">
        <Flex align="center" justify="between" css={{ height: '50px' }}>
          <Heading size="2">{title || 'Sia'}</Heading>
          <UserDropdownMenu />
        </Flex>
      </Container>
    </AppBar>
  )
}
