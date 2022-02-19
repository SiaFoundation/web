import {
  AppBar,
  Container,
  Flex,
  Heading,
  UserDropdownMenu,
} from '@siafoundation/design-system'

export function LeftNavbar() {
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
          <Heading size="2">@siafoundation/design-system</Heading>
          <UserDropdownMenu />
        </Flex>
      </Container>
    </AppBar>
  )
}
