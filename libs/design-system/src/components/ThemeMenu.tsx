import { DropdownMenuGroup, DropdownMenuLabel } from '../core/DropdownMenu'
import { useTheme } from '../hooks/useTheme'
import { ThemeRadio } from './ThemeRadio'

export function ThemeMenu() {
  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel>Theme</DropdownMenuLabel>
      <ThemeRadio />
    </DropdownMenuGroup>
  )
}
