import {
  AppBar,
  Container,
  Flex,
  UserContextMenu,
} from '@siafoundation/design-system'

export function RightNavbar() {
  return (
    <AppBar color="none" css={{ width: '100%' }}>
      <Container size="4">
        <Flex align="center" justify="between" css={{ height: '50px' }}>
          <UserContextMenu />
        </Flex>
      </Container>
    </AppBar>
  )
}
