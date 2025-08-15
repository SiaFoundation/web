import { AlertData } from './types'
import { Badge, Text, ValueCopyable } from '@siafoundation/design-system'
import { type ColumnDef } from '@tanstack/react-table'
import { TableHeader } from '../ColumnHeader'
import { selectColumn } from '../sharedColumns/select'
import {
  hashColumnWidth,
  smallColumnWidth,
  timestampColumnWidth,
} from '../sharedColumns/sizes'

export const alertsColumns: ColumnDef<AlertData>[] = [
  selectColumn(),
  {
    id: 'id',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column} className="justify-start">
        ID
      </TableHeader>
    ),
    accessorKey: 'id',
    cell: ({ getValue }) => (
      <ValueCopyable maxLength={100} value={getValue<string>()} label="ID" />
    ),
    meta: { className: 'justify-start', ...hashColumnWidth },
  },
  {
    id: 'type',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column} className="justify-start">
        Type
      </TableHeader>
    ),
    cell: ({ row }) => <Badge>{row.original.type}</Badge>,
    meta: { className: 'justify-start', ...smallColumnWidth },
  },
  {
    id: 'severity',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column} className="justify-start">
        Severity
      </TableHeader>
    ),
    cell: ({ row }) => <Badge>{row.original.severity}</Badge>,
    meta: { className: 'justify-start', ...smallColumnWidth },
  },
  {
    id: 'message',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column} className="justify-start">
        Message
      </TableHeader>
    ),
    cell: ({ row }) => <Text>{row.original.message}</Text>,
    meta: { className: 'justify-start', ...smallColumnWidth },
  },
  {
    id: 'timestamp',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column} className="justify-end">
        Timestamp
      </TableHeader>
    ),
    accessorKey: 'timestamp',
    cell: ({ row }) => <Text>{row.original.displayFields.timestamp}</Text>,
    meta: { className: 'justify-end', ...timestampColumnWidth },
  },
]
