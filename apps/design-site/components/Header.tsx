import {
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  Flex,
  Heading,
  NLink,
  UserDropdownMenu,
} from '@siafoundation/design-system'

export function Header() {
  return (
    <Flex align="center" justify="between" css={{ height: '50px' }}>
      <Heading size="2">@siafoundation/design-system</Heading>
      <UserDropdownMenu>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Pages</DropdownMenuLabel>
          <DropdownMenuItem>
            <NLink href="/">Core</NLink>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <NLink href="/sites">Sites</NLink>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <NLink href="/apps">Apps</NLink>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </UserDropdownMenu>
    </Flex>
  )
}
