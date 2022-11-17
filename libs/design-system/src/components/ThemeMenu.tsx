import { DropdownMenuGroup, DropdownMenuLabel } from '../core/DropdownMenu'
import { ThemeRadio } from './ThemeRadio'

export function ThemeMenu() {
  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel>Theme</DropdownMenuLabel>
      <div className="flex p-3 justify-start">
        <ThemeRadio className="justify-between" />
      </div>
    </DropdownMenuGroup>
  )
}
