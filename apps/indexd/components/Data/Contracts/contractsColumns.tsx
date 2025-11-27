import { type ContractData } from './types'
import {
  Badge,
  Text,
  ValueCopyable,
  ValueWithTooltip,
  DataTableColumnDef,
} from '@siafoundation/design-system'
import { TableHeader } from '../ColumnHeader'
import { selectColumn } from '../sharedColumns/select'
import {
  smallColumnWidth,
  timestampColumnWidth,
  hashColumnWidth,
} from '../sharedColumns/sizes'
import { ColumnGoodFilter } from './columnFilters/ColumnGoodFilter'
import { type AdminContractsSortBy } from '@siafoundation/indexd-types'

export const contractsColumns: DataTableColumnDef<
  ContractData,
  AdminContractsSortBy
>[] = [
  selectColumn(),
  {
    id: 'id',
    sortKey: 'id',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column} className="justify-start">
        ID
      </TableHeader>
    ),
    cell: ({ row }) => (
      <ValueCopyable maxLength={100} value={row.original.id} type="contract" />
    ),
    meta: { className: 'justify-start', ...hashColumnWidth },
  },
  {
    id: 'status',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column} filter={<ColumnGoodFilter />}>
        Status
      </TableHeader>
    ),
    cell: ({ row }) => (
      <StatusBadge variant={row.original.good ? 'good' : 'bad'} />
    ),
    meta: {
      className: 'justify-end',
      ...smallColumnWidth,
      filterLabelPositive: 'Status is good',
      filterLabelNegative: 'Status is bad',
    },
  },
  {
    id: 'state',
    sortKey: 'state',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        State
      </TableHeader>
    ),
    cell: ({ row }) => <StateBadge value={row.original.state} />,
    meta: { className: 'justify-end', ...smallColumnWidth },
  },
  {
    id: 'hostPublicKey',
    sortKey: 'hostKey',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column} className="justify-start">
        Host Public Key
      </TableHeader>
    ),
    cell: ({ row }) => (
      <ValueCopyable
        maxLength={100}
        value={row.original.hostKey}
        type="hostPublicKey"
      />
    ),
    meta: { className: 'justify-start', ...hashColumnWidth },
  },
  {
    id: 'formation',
    sortKey: 'formation',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Formation
      </TableHeader>
    ),
    cell: ({ row }) => <Text>{row.original.displayFields.formation}</Text>,
    meta: { className: 'justify-end', ...timestampColumnWidth },
  },
  {
    id: 'expirationHeight',
    sortKey: 'expirationHeight',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Expiration Height
      </TableHeader>
    ),
    cell: ({ row }) => (
      <Text>{row.original.displayFields.expirationHeight}</Text>
    ),
    meta: { className: 'justify-end', ...timestampColumnWidth },
  },

  {
    id: 'capacity',
    sortKey: 'capacity',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Capacity
      </TableHeader>
    ),
    cell: ({ row }) => <Text>{row.original.displayFields.capacity}</Text>,
    meta: { className: 'justify-end', ...smallColumnWidth },
  },
  {
    id: 'dataSize',
    sortKey: 'size',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Data Size
      </TableHeader>
    ),
    cell: ({ row }) => <Text>{row.original.displayFields.dataSize}</Text>,
    meta: { className: 'justify-end', ...smallColumnWidth },
  },
  {
    id: 'initialAllowance',
    sortKey: 'initialAllowance',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Initial Allowance
      </TableHeader>
    ),
    cell: ({ row }) => (
      <ValueWithTooltip {...row.original.displayFields.initialAllowance} />
    ),
    meta: { className: 'justify-end', ...smallColumnWidth },
  },
  {
    id: 'remainingAllowance',
    sortKey: 'remainingAllowance',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Remaining Allowance
      </TableHeader>
    ),
    cell: ({ row }) => (
      <ValueWithTooltip {...row.original.displayFields.remainingAllowance} />
    ),
    meta: { className: 'justify-end', ...smallColumnWidth },
  },
  {
    id: 'totalCollateral',
    sortKey: 'totalCollateral',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Total Collateral
      </TableHeader>
    ),
    cell: ({ row }) => (
      <ValueWithTooltip {...row.original.displayFields.totalCollateral} />
    ),
    meta: { className: 'justify-end', ...smallColumnWidth },
  },
  {
    id: 'usedCollateral',
    sortKey: 'usedCollateral',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Used Collateral
      </TableHeader>
    ),
    cell: ({ row }) => (
      <ValueWithTooltip {...row.original.displayFields.usedCollateral} />
    ),
    meta: { className: 'justify-end', ...smallColumnWidth },
  },
]

export function StatusBadge({ variant }: { variant: 'good' | 'bad' }) {
  return (
    <Badge size="small" variant={variant === 'good' ? 'green' : 'red'}>
      {variant === 'good' ? 'Good' : 'Bad'}
    </Badge>
  )
}

export function StateBadge({ value }: { value: string }) {
  let variant: React.ComponentProps<typeof Badge>['variant'] = 'gray'
  if (value === 'active') variant = 'amber'
  else if (value === 'failed') variant = 'red'
  else if (value === 'complete') variant = 'gray'
  return (
    <Badge size="small" variant={variant}>
      {value}
    </Badge>
  )
}
