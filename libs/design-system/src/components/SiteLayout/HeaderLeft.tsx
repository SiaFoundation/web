import { AppBar } from '../../primitives/AppBar'
import { Container } from '../../primitives/Container'
import { Flex } from '../../primitives/Flex'
import { Heading } from '../../primitives/Heading'
import { UserDropdownMenu } from '../UserDropdownMenu'

type Props = {
  children: React.ReactNode
}

export function HeaderLeft({ children }: Props) {
  return (
    <AppBar
      sticky
      glass
      css={{
        zIndex: 2,
      }}
    >
      <Container size="4">{children}</Container>
    </AppBar>
  )
}
