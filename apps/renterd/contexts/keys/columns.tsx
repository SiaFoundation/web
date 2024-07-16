import { type TableColumn, ValueCopyable } from '@siafoundation/design-system'
import { KeyContextMenu } from '../../components/Keys/KeyContextMenu'
import type { KeyData, TableColumnId } from './types'

export type KeyCellContext = Record<string, never>

type KeysTableColumn = TableColumn<TableColumnId, KeyData, KeyCellContext> & {
  fixed?: boolean
  category?: string
}

export const columns: KeysTableColumn[] = [
  {
    id: 'actions',
    label: '',
    fixed: true,
    cellClassName: 'w-[50px] !pl-2 !pr-4 [&+*]:!pl-0',
    render: ({ data: { key } }) => <KeyContextMenu s3Key={key} />,
  },
  {
    id: 'key',
    label: 'key',
    category: 'general',
    render: ({ data: { key } }) => {
      return <ValueCopyable size="12" value={key} label="key" maxLength={80} />
    },
  },
  {
    id: 'secret',
    label: 'secret',
    contentClassName: 'w-[120px]',
    category: 'general',
    render: ({ data: { secret } }) => {
      return (
        <ValueCopyable
          size="12"
          value={secret}
          label="key"
          maxLength={10}
          font="mono"
        />
      )
    },
  },
]
