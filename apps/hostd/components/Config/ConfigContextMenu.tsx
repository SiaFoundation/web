import {
  Button,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuLeftSlot,
} from '@siafoundation/design-system'
import {
  Copy16,
  Download16,
  OverflowMenuHorizontal16,
} from '@siafoundation/react-icons'
import { useConfig } from '../../contexts/config'

export function ConfigContextMenu() {
  const { takeScreenshot } = useConfig()
  return (
    <DropdownMenu
      trigger={
        <Button>
          <OverflowMenuHorizontal16 />
        </Button>
      }
      contentProps={{ align: 'end' }}
    >
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem
        onSelect={() => {
          takeScreenshot({ name: 'config image', copy: true })
        }}
      >
        <DropdownMenuLeftSlot>
          <Copy16 />
        </DropdownMenuLeftSlot>
        Copy image of configuration
      </DropdownMenuItem>
      <DropdownMenuItem
        onSelect={() => {
          takeScreenshot({ name: 'config', download: true })
        }}
      >
        <DropdownMenuLeftSlot>
          <Download16 />
        </DropdownMenuLeftSlot>
        Download image of configuration
      </DropdownMenuItem>
    </DropdownMenu>
  )
}
