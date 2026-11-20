import { Text, ValueCopyable } from '@siafoundation/design-system'
import { type ColumnDef } from '@tanstack/react-table'
import { TableHeader } from '../ColumnHeader'
import { selectColumn } from '../sharedColumns/select'
import { hashColumnWidth, timestampColumnWidth } from '../sharedColumns/sizes'
import { BlockedObjectData } from './types'

export const blockedObjectsColumns: ColumnDef<BlockedObjectData>[] = [
  selectColumn(),
  {
    id: 'key',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column} className="justify-start">
        Object key
      </TableHeader>
    ),
    cell: ({ row }) => (
      <ValueCopyable
        maxLength={100}
        value={row.original.key}
        label="object key"
      />
    ),
    meta: { className: 'justify-start', ...hashColumnWidth },
  },
  {
    id: 'reason',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column} className="justify-start">
        Reason
      </TableHeader>
    ),
    cell: ({ row }) =>
      row.original.reason ? (
        <Text>{row.original.reason}</Text>
      ) : (
        <Text color="verySubtle">-</Text>
      ),
    meta: { className: 'justify-start', width: 300 },
  },
  {
    id: 'createdAt',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column} className="justify-end">
        Blocked
      </TableHeader>
    ),
    cell: ({ row }) => <Text>{row.original.displayFields.createdAt}</Text>,
    meta: { className: 'justify-end', ...timestampColumnWidth },
  },
]
