import {
  BaseMenuItem,
  Button,
  Label,
  MenuItemRightSlot,
  Popover,
} from '@siafoundation/design-system'
import { CaretDown16, SettingsAdjust16 } from '@siafoundation/react-icons'
import { ViewModeToggle } from './ViewModeToggle'

export function ConfigViewDropdownMenu() {
  return (
    <Popover
      trigger={
        <Button size="small" tip="Configure view" tipAlign="end">
          <SettingsAdjust16 />
          View
          <CaretDown16 />
        </Button>
      }
      contentProps={{
        align: 'end',
        className: 'max-w-[300px]',
      }}
    >
      <BaseMenuItem>
        <Label>Show advanced settings</Label>
        <MenuItemRightSlot>
          <ViewModeToggle />
        </MenuItemRightSlot>
      </BaseMenuItem>
    </Popover>
  )
}
