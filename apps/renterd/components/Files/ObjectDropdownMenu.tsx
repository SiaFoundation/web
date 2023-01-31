import {
  DropdownMenu,
  DropdownMenuItem,
  Button,
  Settings20,
  copyToClipboard,
} from '@siafoundation/design-system'
import {
  useObject,
  useObjectDelete,
  useObjectDownloadFunc,
} from '@siafoundation/react-core'

type Props = {
  path: string
}

export function ObjectDropdownMenu({ path }: Props) {
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
        <Button>
          <Settings20 />
        </Button>
      }
      contentProps={{ align: 'end' }}
    >
      <DropdownMenuItem
        onClick={async () => {
          download.get(path, { params: { key: path } })
        }}
      >
        Download
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() =>
          copyToClipboard(JSON.stringify(obj.data, null, 2), 'object metadata')
        }
      >
        Copy metadata
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => deleteObject.delete({ params: { key: path } })}
      >
        Delete
      </DropdownMenuItem>
    </DropdownMenu>
  )
}
