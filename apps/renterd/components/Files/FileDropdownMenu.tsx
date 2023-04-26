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
  copyToClipboardCustom,
  Text,
  Warning16,
  Code,
} from '@siafoundation/design-system'
import { useObject, useObjectDelete } from '@siafoundation/react-renterd'
import { useFiles } from '../../contexts/files'

type Props = {
  name: string
  path: string
}

export function FileDropdownMenu({ name, path }: Props) {
  const { downloadFiles, getFileUrl } = useFiles()
  const obj = useObject({
    params: {
      key: path.slice(1),
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
          <Document16 />
        </Button>
      }
      contentProps={{ align: 'start' }}
    >
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem
        onSelect={async () => {
          downloadFiles([name])
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
            params: { key: path.slice(1) },
          })
        }
      >
        <DropdownMenuLeftSlot>
          <Delete16 />
        </DropdownMenuLeftSlot>
        Delete file
      </DropdownMenuItem>
      <DropdownMenuLabel>Copy</DropdownMenuLabel>
      <DropdownMenuItem
        onSelect={() => {
          if (obj.data) {
            copyToClipboard(getFileUrl(path, false), 'file URL')
          }
        }}
      >
        <DropdownMenuLeftSlot>
          <Copy16 />
        </DropdownMenuLeftSlot>
        Copy URL
      </DropdownMenuItem>
      <DropdownMenuItem
        onSelect={() => {
          if (obj.data) {
            copyToClipboardCustom(
              getFileUrl(path, true),
              <div className="flex flex-col gap-2">
                <Text>Copied authenticated file URL to clipboard.</Text>
                <Text>
                  The authenticated URL contains the <Code>renterd</Code>{' '}
                  password, be careful when pasting or sharing the URL.
                </Text>
              </div>,
              {
                icon: (
                  <div>
                    <Warning16 className="w-5 text-amber-600" />
                  </div>
                ),
                duration: 10_000,
                className: '!max-w-[1200px]',
              }
            )
          }
        }}
      >
        <DropdownMenuLeftSlot>
          <Copy16 />
        </DropdownMenuLeftSlot>
        Copy authenticated URL
      </DropdownMenuItem>
      <DropdownMenuItem
        disabled={!obj.data}
        onSelect={() => {
          if (obj.data) {
            copyToClipboard(
              JSON.stringify(obj.data.object, null, 2),
              'object metadata'
            )
          }
        }}
      >
        <DropdownMenuLeftSlot>
          <Copy16 />
        </DropdownMenuLeftSlot>
        Copy metadata
      </DropdownMenuItem>
    </DropdownMenu>
  )
}
