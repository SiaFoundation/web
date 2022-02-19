import {
  AppBar,
  Container,
  Flex,
  UserDropdownMenu,
} from '@siafoundation/design-system'

export function RightNavbar() {
  return (
    <AppBar color="none" css={{ width: '100%' }}>
      <Container size="4">
        <Flex align="center" justify="between" css={{ height: '50px' }}>
          <UserDropdownMenu />
        </Flex>
      </Container>
    </AppBar>
  )
}
