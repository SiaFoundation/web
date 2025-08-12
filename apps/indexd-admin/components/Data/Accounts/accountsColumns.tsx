import { AccountData } from './types'
import { ValueCopyable } from '@siafoundation/design-system'
import { type ColumnDef } from '@tanstack/react-table'
import { TableHeader } from '../ColumnHeader'
import { selectColumn } from '../sharedColumns/select'
import { hashColumnWidth } from '../sharedColumns/sizes'

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
]
