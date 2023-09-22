import {
  DropdownMenu,
  DropdownMenuItem,
  Button,
  DropdownMenuLeftSlot,
  DropdownMenuLabel,
} from '@siafoundation/design-system'
import { Delete16, FolderIcon } from '@siafoundation/react-icons'
import { useDirectoryDelete } from './useDirectoryDelete'

type Props = {
  path: string
  size: number
}

export function DirectoryContextMenu({ path, size }: Props) {
  const directoryConfirmDelete = useDirectoryDelete()

  return (
    <DropdownMenu
      trigger={
        <Button variant="ghost" icon="hover">
          <FolderIcon size={16} />
        </Button>
      }
      contentProps={{ align: 'start' }}
    >
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem
        onSelect={() => {
          directoryConfirmDelete(path, size)
        }}
      >
        <DropdownMenuLeftSlot>
          <Delete16 />
        </DropdownMenuLeftSlot>
        Delete directory
      </DropdownMenuItem>
    </DropdownMenu>
  )
}
