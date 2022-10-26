import { Flex } from '../core/Flex'
import { DropdownMenuGroup, DropdownMenuLabel } from '../core/DropdownMenu'
import { ThemeRadio } from './ThemeRadio'

export function ThemeMenu() {
  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel>Theme</DropdownMenuLabel>
      <Flex css={{ padding: '$1-5' }} justify="start">
        <ThemeRadio
          css={{
            justifyContent: 'space-between',
          }}
        />
      </Flex>
    </DropdownMenuGroup>
  )
}
