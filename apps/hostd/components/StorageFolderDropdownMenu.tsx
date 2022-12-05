import {
  DropdownMenu,
  DropdownMenuItem,
  Button,
  Settings20,
} from '@siafoundation/design-system'
import { useDialog } from '../contexts/dialog'

type Props = {
  id: string
}

export function StorageFolderDropdownMenu({ id }: Props) {
  const { openDialog } = useDialog()
  return (
    <DropdownMenu
      trigger={
        <Button>
          <Settings20 />
        </Button>
      }
      contentProps={{
        align: 'end',
      }}
    >
      <DropdownMenuItem onClick={() => openDialog('storageFolderResize', id)}>
        Resize
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => openDialog('storageFolderRemove', id)}>
        Delete
      </DropdownMenuItem>
    </DropdownMenu>
  )
}
