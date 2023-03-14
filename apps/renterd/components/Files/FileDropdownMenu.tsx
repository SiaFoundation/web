import {
  DropdownMenu,
  DropdownMenuItem,
  Button,
  copyToClipboard,
  Download16,
  DropdownMenuLeftSlot,
  Copy16,
  Delete16,
  Document16,
  DropdownMenuLabel,
} from '@siafoundation/design-system'
import {
  useObject,
  useObjectDelete,
  useObjectDownloadFunc,
} from '@siafoundation/react-core'

type Props = {
  name: string
  path: string
}

export function FileDropdownMenu({ name, path }: Props) {
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
        <Button variant="ghost" icon="hover">
          <Document16 />
        </Button>
      }
      contentProps={{ align: 'start' }}
    >
      <DropdownMenuLabel>File actions</DropdownMenuLabel>
      <DropdownMenuItem
        onSelect={async () => {
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
        onSelect={() =>
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
        onSelect={() =>
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
