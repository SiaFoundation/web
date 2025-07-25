import { type Account } from '../mockData'
import { type ColumnDef } from '@tanstack/react-table'
import { TableCellText, TableHeader } from '../columns'

function formatSC(val: number) {
  return `${val.toLocaleString()} SC`
}

export const columns: ColumnDef<Account>[] = [
  {
    id: 'id',
    header: () => <TableHeader>Account ID</TableHeader>,
    accessorKey: 'id',
    cell: ({ getValue }) => <TableCellText>{getValue<string>()}</TableCellText>,
    meta: { className: 'truncate' },
  },
  {
    id: 'spendStorage',
    header: () => <TableHeader>Spend Storage</TableHeader>,
    accessorKey: 'spendingStorage',
    cell: ({ getValue }) => (
      <TableCellText>{formatSC(getValue<number>())}</TableCellText>
    ),
    meta: { className: 'truncate' },
  },
  {
    id: 'spendUpload',
    header: () => <TableHeader>Spend Upload</TableHeader>,
    accessorKey: 'spendingUpload',
    cell: ({ getValue }) => (
      <TableCellText>{formatSC(getValue<number>())}</TableCellText>
    ),
    meta: { className: 'truncate' },
  },
  {
    id: 'spendDownload',
    header: () => <TableHeader>Spend Download</TableHeader>,
    accessorKey: 'spendingDownload',
    cell: ({ getValue }) => (
      <TableCellText>{formatSC(getValue<number>())}</TableCellText>
    ),
    meta: { className: 'truncate' },
  },
  {
    id: 'contracts',
    header: () => <TableHeader>Contracts</TableHeader>,
    cell: ({ row }) => (
      <TableCellText>{row.original.contractIds.length}</TableCellText>
    ),
    meta: { className: 'truncate' },
  },
]
