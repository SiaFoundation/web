import { AccountData } from './types'
import { Text, ValueCopyable } from '@siafoundation/design-system'
import { type ColumnDef } from '@tanstack/react-table'
import { TableHeader } from '../ColumnHeader'
import { selectColumn } from '../sharedColumns/select'
import { hashColumnWidth, smallColumnWidth } from '../sharedColumns/sizes'

export const accountsColumns: ColumnDef<AccountData>[] = [
  selectColumn(),
  {
    id: 'publicKey',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column} className="justify-start">
        Public key
      </TableHeader>
    ),
    accessorKey: 'publicKey',
    cell: ({ getValue }) => (
      <ValueCopyable
        maxLength={100}
        value={getValue<string>()}
        label="account"
      />
    ),
    meta: { className: 'justify-start', ...hashColumnWidth },
  },
  {
    id: 'serviceAccount',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column} className="justify-end">
        Service account
      </TableHeader>
    ),
    cell: ({ row }) => (
      <Text>{row.original.serviceAccount ? 'Yes' : 'No'}</Text>
    ),
    meta: { className: 'justify-end', ...smallColumnWidth },
  },
  {
    id: 'maxPinnedData',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column} className="justify-end">
        Max pinned data
      </TableHeader>
    ),
    cell: ({ row }) => <Text>{row.original.displayFields.maxPinnedData}</Text>,
    meta: { className: 'justify-end', ...smallColumnWidth },
  },
]
