import {
  DropdownMenu,
  DropdownMenuItem,
  Button,
  DropdownMenuLeftSlot,
  DropdownMenuLabel,
} from '@siafoundation/design-system'
import { Delete16, Edit16, FolderIcon } from '@siafoundation/react-icons'
import { useDirectoryDelete } from './useDirectoryDelete'
import { useDialog } from '../../contexts/dialog'

type Props = {
  path: string
  size: number
}

export function DirectoryContextMenu({ path, size }: Props) {
  const directoryConfirmDelete = useDirectoryDelete()
  const { openDialog } = useDialog()

  return (
    <DropdownMenu
      trigger={
        <Button variant="ghost" icon="hover">
          <FolderIcon size={16} />
        </Button>
      }
      contentProps={{
        align: 'start',
        onClick: (e) => {
          e.stopPropagation()
        },
      }}
    >
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem
        onSelect={() => {
          openDialog('fileRename', path)
        }}
      >
        <DropdownMenuLeftSlot>
          <Edit16 />
        </DropdownMenuLeftSlot>
        Rename directory
      </DropdownMenuItem>
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
