import {
  Checkbox,
  ControlGroup,
  TableColumn,
  ValueCopyable,
} from '@siafoundation/design-system'
import { KeyData, CellContext, TableColumnId } from './types'
import { KeyContextMenu } from '../../components/Keys/KeyContextMenu'

type KeysTableColumn = TableColumn<TableColumnId, KeyData, CellContext> & {
  fixed?: boolean
  category?: string
}

export const columns: KeysTableColumn[] = [
  {
    id: 'actions',
    label: '',
    fixed: true,
    contentClassName: '!pl-3 !pr-4',
    cellClassName: 'w-[20px] !pl-0 !pr-0',
    heading: ({ context: { onSelectPage, isPageAllSelected } }) => (
      <ControlGroup className="flex h-4">
        <Checkbox onClick={onSelectPage} checked={isPageAllSelected} />
      </ControlGroup>
    ),
    render: ({ data: { id, key }, context: { selectionMap, onSelect } }) => (
      <ControlGroup className="flex h-4">
        <Checkbox
          aria-label="select key"
          onClick={(e) => onSelect(id, e)}
          checked={!!selectionMap[id]}
        />
        <KeyContextMenu s3Key={key} />
      </ControlGroup>
    ),
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
