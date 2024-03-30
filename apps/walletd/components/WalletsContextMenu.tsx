import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLeftSlot,
  DropdownMenuLabel,
} from '@siafoundation/design-system'
import { Scan16 } from '@siafoundation/react-icons'
import { useDialog } from '../contexts/dialog'

type Props = Omit<React.ComponentProps<typeof DropdownMenu>, 'children'>

export function WalletsContextMenu({ ...props }: Props) {
  const { openDialog } = useDialog()
  return (
    <DropdownMenu {...props}>
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem
        onClick={(e) => e.stopPropagation()}
        onSelect={() => openDialog('walletsRescan')}
      >
        <DropdownMenuLeftSlot>
          <Scan16 />
        </DropdownMenuLeftSlot>
        Rescan blockchain
      </DropdownMenuItem>
    </DropdownMenu>
  )
}
