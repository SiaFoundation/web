import { KeyData } from '../../../lib/connectKey'
import { Text, ValueCopyable } from '@siafoundation/design-system'
import { type ColumnDef } from '@tanstack/react-table'
import { TableHeader } from '../ColumnHeader'
import { selectColumn } from '../sharedColumns/select'
import {
  hashColumnWidth,
  smallColumnWidth,
  timestampColumnWidth,
} from '../sharedColumns/sizes'

export const keysColumns: ColumnDef<KeyData>[] = [
  selectColumn(),
  {
    id: 'key',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column} className="justify-start">
        Key
      </TableHeader>
    ),
    cell: ({ row }) => (
      <ValueCopyable maxLength={100} value={row.original.key} label="key" />
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
    id: 'quota',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column} className="justify-start">
        Quota
      </TableHeader>
    ),
    cell: ({ row }) => <Text>{row.original.quota}</Text>,
    meta: { className: 'justify-start', ...smallColumnWidth },
  },
  {
    id: 'remainingUses',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column} className="justify-end">
        Remaining uses
      </TableHeader>
    ),
    cell: ({ row }) => <Text>{row.original.remainingUses}</Text>,
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
    id: 'dateCreated',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column} className="justify-end">
        Date created
      </TableHeader>
    ),
    cell: ({ row }) => <Text>{row.original.displayFields.dateCreated}</Text>,
    meta: { className: 'justify-end', ...timestampColumnWidth },
  },
  {
    id: 'lastUpdated',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column} className="justify-end">
        Last updated
      </TableHeader>
    ),
    cell: ({ row }) => <Text>{row.original.displayFields.lastUpdated}</Text>,
    meta: { className: 'justify-end', ...timestampColumnWidth },
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
