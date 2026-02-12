import { QuotaData } from '../../../lib/quota'
import { Text, ValueCopyable } from '@siafoundation/design-system'
import { type ColumnDef } from '@tanstack/react-table'
import { TableHeader } from '../ColumnHeader'
import { selectColumn } from '../sharedColumns/select'
import {
  hashColumnWidth,
  smallColumnWidth,
} from '../sharedColumns/sizes'

export const quotasColumns: ColumnDef<QuotaData>[] = [
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
    id: 'maxPinnedData',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column} className="justify-end">
        Max pinned data
      </TableHeader>
    ),
    cell: ({ row }) => (
      <Text>{row.original.displayFields.maxPinnedData}</Text>
    ),
    meta: { className: 'justify-end', ...smallColumnWidth },
  },
  {
    id: 'totalUses',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column} className="justify-end">
        Total uses
      </TableHeader>
    ),
    cell: ({ row }) => <Text>{row.original.totalUses}</Text>,
    meta: { className: 'justify-end', ...smallColumnWidth },
  },
]
