import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Settings20 />
        </Button>
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
