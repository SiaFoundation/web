import { AccountData } from './types'
import { Text, ValueCopyable } from '@siafoundation/design-system'
import { type ColumnDef } from '@tanstack/react-table'
import { TableHeader } from '../ColumnHeader'
import { selectColumn } from '../sharedColumns/select'
import {
  hashColumnWidth,
  smallColumnWidth,
  timestampColumnWidth,
} from '../sharedColumns/sizes'

export const accountsColumns: ColumnDef<AccountData>[] = [
  selectColumn(),
  {
    id: 'publicKey',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column} className="justify-start">
        Public key
      </TableHeader>
    ),
    cell: ({ row }) => (
      <ValueCopyable
        maxLength={100}
        value={row.original.publicKey}
        label="account"
      />
    ),
    meta: { className: 'justify-start', ...hashColumnWidth },
  },
  {
    id: 'description',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column} className="justify-start">
        Description
      </TableHeader>
    ),
    cell: ({ row }) => <Text>{row.original.description}</Text>,
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
  {
    id: 'pinnedData',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column} className="justify-end">
        Pinned data
      </TableHeader>
    ),
    cell: ({ row }) => <Text>{row.original.displayFields.pinnedData}</Text>,
    meta: { className: 'justify-end', ...smallColumnWidth },
  },
  {
    id: 'lastUsed',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column} className="justify-end">
        Last used
      </TableHeader>
    ),
    cell: ({ row }) => (
      <Text>{row.original.displayFields.lastUsed || '-'}</Text>
    ),
    meta: { className: 'justify-end', ...timestampColumnWidth },
  },
]
