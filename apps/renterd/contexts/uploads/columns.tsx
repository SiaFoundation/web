import { Text, ValueCopyable } from '@siafoundation/design-system'
import { humanBytes } from '@siafoundation/units'
import { formatRelative } from 'date-fns'
import { TransferProgress } from '../../components/TransferProgress'
import { UploadContextMenu } from '../../components/Uploads/UploadContextMenu'
import { getKeyFromPath } from '../../lib/paths'
import type { UploadsTableColumn } from './types'

export const columns: UploadsTableColumn[] = [
  {
    id: 'actions',
    label: '',
    fixed: true,
    cellClassName: 'w-[50px] !pl-2 !pr-2 [&+*]:!pl-0',
    render: function ActionsColumn({ data: { uploadAbort } }) {
      return <UploadContextMenu abort={uploadAbort} />
    },
  },
  {
    id: 'path',
    label: 'path',
    contentClassName: 'max-w-[600px]',
    category: 'general',
    render: function PathColumn({ data: { path, id } }) {
      const key = getKeyFromPath(path).slice(1)
      return (
        <div className="flex flex-col min-w-0">
          <Text ellipsis weight="semibold" size="14">
            {key}
          </Text>
          <ValueCopyable value={id} label="upload ID" size="10" />
        </div>
      )
    },
  },
  {
    id: 'status',
    label: 'status',
    category: 'general',
    contentClassName: 'w-[200px]',
    render: function StatusColumn({
      data: { loaded, size, uploadStatus, remote },
    }) {
      if (remote) {
        return (
          <Text size="12" color="subtle">
            Uploading from a different session
          </Text>
        )
      }
      return (
        <TransferProgress loaded={loaded} size={size} status={uploadStatus} />
      )
    },
  },
  {
    id: 'size',
    label: 'size',
    category: 'general',
    render: function SizeColumn({ data: { remote, size } }) {
      if (remote) {
        return null
      }
      return (
        <Text size="12" color="subtle">
          {humanBytes(size)}
        </Text>
      )
    },
  },
  {
    id: 'createdAt',
    label: 'started at',
    category: 'general',
    render: function SizeColumn({ data: { createdAt } }) {
      return (
        <Text size="12" color="subtle">
          {formatRelative(new Date(createdAt).getTime(), new Date())}
        </Text>
      )
    },
  },
]
