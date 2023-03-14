import {
  DropdownMenu,
  DropdownMenuItem,
  Button,
  DropdownMenuLeftSlot,
  Delete16,
  Text,
  DropdownMenuLabel,
  FolderIcon,
} from '@siafoundation/design-system'
import { useObjectDelete, useObjectDirectory } from '@siafoundation/react-core'

type Props = {
  name: string
  path: string
}

export function DirectoryDropdownMenu({ path }: Props) {
  const obj = useObjectDirectory({
    params: {
      key: encodeURIComponent(path.slice(1)),
    },
    config: {
      swr: {
        dedupingInterval: 5000,
      },
    },
  })

  const deleteObject = useObjectDelete()

  return (
    <DropdownMenu
      trigger={
        <Button variant="ghost" icon="hover">
          <FolderIcon size={16} />
        </Button>
      }
      contentProps={{ align: 'start' }}
    >
      <DropdownMenuLabel>Directory actions</DropdownMenuLabel>
      {obj.data?.entries.find((e) => e === path) ? (
        <DropdownMenuItem
          onSelect={() =>
            deleteObject.delete({
              params: { key: encodeURIComponent(path.slice(1)) },
            })
          }
        >
          <DropdownMenuLeftSlot>
            <Delete16 />
          </DropdownMenuLeftSlot>
          Delete directory
        </DropdownMenuItem>
      ) : (
        <DropdownMenuItem disabled>
          <Text color="subtle">No available actions</Text>
        </DropdownMenuItem>
      )}
    </DropdownMenu>
  )
}
