import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  IconButton,
  Settings20,
} from '@siafoundation/design-system'
import { useDialog } from '../contexts/dialog'

type Props = {
  id: string
}

export function StorageFolderDropdownMenu({ id }: Props) {
  const { openDialog } = useDialog()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton>
          <Settings20 />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => openDialog('storageFolderResize', id)}>
          Resize
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openDialog('storageFolderRemove', id)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
