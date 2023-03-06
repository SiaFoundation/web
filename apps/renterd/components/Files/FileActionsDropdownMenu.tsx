import {
  DropdownMenu,
  DropdownMenuItem,
  Button,
  copyToClipboard,
  OverflowMenuHorizontal16,
  Download16,
  DropdownMenuLeftSlot,
  Copy16,
  Delete16,
} from '@siafoundation/design-system'
import {
  useObject,
  useObjectDelete,
  useObjectDownloadFunc,
} from '@siafoundation/react-core'

type Props = {
  name: string
  path: string
  className?: string
}

export function FileActionsDropdownMenu({ name, path, className }: Props) {
  const obj = useObject({
    params: {
      key: encodeURIComponent(path.slice(1)),
    },
    config: {
      swr: {
        dedupingInterval: 5000,
      },
    },
  })
  const download = useObjectDownloadFunc()

  const deleteObject = useObjectDelete()

  return (
    <DropdownMenu
      trigger={
        <Button variant="ghost" className={className}>
          <OverflowMenuHorizontal16 />
        </Button>
      }
      contentProps={{ align: 'end' }}
    >
      <DropdownMenuItem
        onClick={async () => {
          download.get(name, {
            params: { key: encodeURIComponent(path.slice(1)) },
          })
        }}
      >
        <DropdownMenuLeftSlot>
          <Download16 />
        </DropdownMenuLeftSlot>
        Download file
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() =>
          deleteObject.delete({
            params: { key: encodeURIComponent(path.slice(1)) },
          })
        }
      >
        <DropdownMenuLeftSlot>
          <Delete16 />
        </DropdownMenuLeftSlot>
        Delete file
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() =>
          copyToClipboard(JSON.stringify(obj.data, null, 2), 'object metadata')
        }
      >
        <DropdownMenuLeftSlot>
          <Copy16 />
        </DropdownMenuLeftSlot>
        Copy metadata
      </DropdownMenuItem>
    </DropdownMenu>
  )
}
