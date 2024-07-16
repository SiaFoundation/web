import {
  Button,
  Code,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuLeftSlot,
  copyToClipboard,
  copyToClipboardCustom,
} from '@siafoundation/design-system'
import {
  Copy16,
  Delete16,
  Document16,
  Download16,
  Edit16,
  Filter16,
  Warning24,
} from '@siafoundation/react-icons'
import { useDialog } from '../../../contexts/dialog'
import { useFilesManager } from '../../../contexts/filesManager'
import { getFilename } from '../../../lib/paths'
import { useFileDelete } from '../useFileDelete'
import { CopyMetadataMenuItem } from './CopyMetadataMenuItem'

type Props = {
  path: string
  trigger?: React.ReactNode
  contentProps?: React.ComponentProps<typeof DropdownMenu>['contentProps']
}

export function FileContextMenu({ trigger, path, contentProps }: Props) {
  const { downloadFiles, getFileUrl, navigateToModeSpecificFiltering } =
    useFilesManager()
  const deleteFile = useFileDelete()
  const { openDialog } = useDialog()

  return (
    <DropdownMenu
      trigger={
        trigger || (
          <Button aria-label="File context menu" variant="ghost" icon="hover">
            <Document16 />
          </Button>
        )
      }
      contentProps={{ align: 'start', ...contentProps }}
    >
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem
        onSelect={async () => {
          downloadFiles([path])
        }}
      >
        <DropdownMenuLeftSlot>
          <Download16 />
        </DropdownMenuLeftSlot>
        Download file
      </DropdownMenuItem>
      <DropdownMenuItem onSelect={() => openDialog('fileRename', path)}>
        <DropdownMenuLeftSlot>
          <Edit16 />
        </DropdownMenuLeftSlot>
        Rename file
      </DropdownMenuItem>
      <DropdownMenuItem onSelect={() => deleteFile(path)}>
        <DropdownMenuLeftSlot>
          <Delete16 />
        </DropdownMenuLeftSlot>
        Delete file
      </DropdownMenuItem>
      <DropdownMenuLabel>Filter</DropdownMenuLabel>
      <DropdownMenuItem
        onSelect={() => {
          navigateToModeSpecificFiltering(path)
        }}
      >
        <DropdownMenuLeftSlot>
          <Filter16 />
        </DropdownMenuLeftSlot>
        Filter by file name
      </DropdownMenuItem>
      <DropdownMenuLabel>Copy</DropdownMenuLabel>
      <DropdownMenuItem
        onSelect={() => {
          copyToClipboard(path, 'file path')
        }}
      >
        <DropdownMenuLeftSlot>
          <Copy16 />
        </DropdownMenuLeftSlot>
        Copy file path
      </DropdownMenuItem>
      <DropdownMenuItem
        onSelect={() => {
          copyToClipboard(getFilename(path), 'file path')
        }}
      >
        <DropdownMenuLeftSlot>
          <Copy16 />
        </DropdownMenuLeftSlot>
        Copy file name
      </DropdownMenuItem>
      <DropdownMenuItem
        onSelect={() => {
          copyToClipboard(getFileUrl(path, false), 'file URL')
        }}
      >
        <DropdownMenuLeftSlot>
          <Copy16 />
        </DropdownMenuLeftSlot>
        Copy URL
      </DropdownMenuItem>
      <DropdownMenuItem
        onSelect={() => {
          copyToClipboardCustom({
            text: getFileUrl(path, true),
            title: 'Copied authenticated file URL to clipboard',
            body: (
              <>
                The authenticated URL contains the <Code>renterd</Code>{' '}
                password, be careful when pasting or sharing the URL.
              </>
            ),
            icon: <Warning24 className="text-amber-600" />,
            options: {
              duration: 100_000,
            },
          })
        }}
      >
        <DropdownMenuLeftSlot>
          <Copy16 />
        </DropdownMenuLeftSlot>
        Copy authenticated URL
      </DropdownMenuItem>
      <CopyMetadataMenuItem path={path} />
    </DropdownMenu>
  )
}
