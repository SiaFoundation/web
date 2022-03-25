import { Box } from '../core/Box'
import { DropdownMenuGroup, DropdownMenuLabel } from '../core/DropdownMenu'
import { useTheme } from '../hooks/useTheme'
import { ThemeRadio } from './ThemeRadio'

export function ThemeMenu() {
  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel>Theme</DropdownMenuLabel>
      <Box css={{ padding: '$1-5' }}>
        <ThemeRadio />
      </Box>
    </DropdownMenuGroup>
  )
}
