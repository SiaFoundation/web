import { type ContractData } from './types'
import {
  Badge,
  Text,
  ValueCopyable,
  ValueWithTooltip,
} from '@siafoundation/design-system'
import { type ColumnDef } from '@tanstack/react-table'
import { TableHeader } from '../ColumnHeader'
import { selectColumn } from '../sharedColumns/select'
import {
  smallColumnWidth,
  timestampColumnWidth,
  hashColumnWidth,
} from '../sharedColumns/sizes'
import { ColumnGoodFilter } from './columnFilters/ColumnGoodFilter'

export const contractsColumns: ColumnDef<ContractData>[] = [
  selectColumn(),
  {
    id: 'id',
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
    id: 'location',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Host Location
      </TableHeader>
    ),
    cell: ({ row }) => {
      if (row.original.host?.location?.countryCode === 'unknown') {
        return (
          <div className="py-1">
            <Text color="verySubtle">-</Text>
          </div>
        )
      }
      return (
        <span className="flex items-center gap-1">
          <span role="img" aria-label={row.original.displayFields.countryName}>
            {row.original.displayFields.countryFlag}
          </span>
          <Text>{row.original.host?.location.countryCode}</Text>
        </span>
      )
    },
    meta: { className: 'justify-end', ...smallColumnWidth },
  },
  {
    id: 'formation',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Formation
      </TableHeader>
    ),
    cell: ({ row }) => <Text>{row.original.displayFields.formation}</Text>,
    meta: { className: 'justify-end', ...timestampColumnWidth },
  },
  {
    id: 'proofHeight',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Proof Height
      </TableHeader>
    ),
    cell: ({ row }) => <Text>{row.original.displayFields.proofHeight}</Text>,
    meta: { className: 'justify-end', ...smallColumnWidth },
  },
  {
    id: 'expirationHeight',
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
    id: 'nextPrune',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Next Prune
      </TableHeader>
    ),
    cell: ({ row }) => <Text>{row.original.displayFields.nextPrune}</Text>,
    meta: { className: 'justify-end', ...timestampColumnWidth },
  },
  {
    id: 'lastBroadcastAttempt',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Last Broadcast Attempt
      </TableHeader>
    ),
    cell: ({ row }) => (
      <Text>{row.original.displayFields.lastBroadcastAttempt}</Text>
    ),
    meta: { className: 'justify-end', ...timestampColumnWidth },
  },
  {
    id: 'capacity',
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
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Data Size
      </TableHeader>
    ),
    cell: ({ row }) => <Text>{row.original.displayFields.dataSize}</Text>,
    meta: { className: 'justify-end', ...smallColumnWidth },
  },
  {
    id: 'spendingSectorRoots',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Spend Sector Roots
      </TableHeader>
    ),
    cell: ({ row }) => (
      <ValueWithTooltip {...row.original.displayFields.spendSectorRoots} />
    ),
    meta: { className: 'justify-end', ...smallColumnWidth },
  },
  {
    id: 'spendAppendSector',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Spend Append Sector
      </TableHeader>
    ),
    cell: ({ row }) => (
      <ValueWithTooltip {...row.original.displayFields.spendAppendSector} />
    ),
    meta: { className: 'justify-end', ...smallColumnWidth },
  },
  {
    id: 'spendFreeSector',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Spend Free Sector
      </TableHeader>
    ),
    cell: ({ row }) => (
      <ValueWithTooltip {...row.original.displayFields.spendFreeSector} />
    ),
    meta: { className: 'justify-end', ...smallColumnWidth },
  },
  {
    id: 'spendFundAccount',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Spend Fund Account
      </TableHeader>
    ),
    cell: ({ row }) => (
      <ValueWithTooltip {...row.original.displayFields.spendFundAccount} />
    ),
    meta: { className: 'justify-end', ...smallColumnWidth },
  },
  {
    id: 'initialAllowance',
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
  {
    id: 'contractPrice',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Contract Price
      </TableHeader>
    ),
    cell: ({ row }) => (
      <ValueWithTooltip {...row.original.displayFields.contractPrice} />
    ),
    meta: { className: 'justify-end', ...smallColumnWidth },
  },
  {
    id: 'minerFee',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Miner Fee
      </TableHeader>
    ),
    cell: ({ row }) => (
      <ValueWithTooltip {...row.original.displayFields.minerFee} />
    ),
    meta: { className: 'justify-end', ...smallColumnWidth },
  },
  {
    id: 'revisionNumber',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Revision Number
      </TableHeader>
    ),
    cell: ({ row }) => <Text>{row.original.displayFields.revisionNumber}</Text>,
    meta: { className: 'justify-end', ...smallColumnWidth },
  },
  {
    id: 'renewedFrom',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Renewed From
      </TableHeader>
    ),
    cell: ({ row }) => {
      const value = row.original.displayFields.renewedFrom
      if (value === '-') {
        return <Text color="verySubtle">-</Text>
      }
      return <Text>{value}</Text>
    },
    meta: { className: 'justify-end', ...hashColumnWidth },
  },
  {
    id: 'renewedTo',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Renewed To
      </TableHeader>
    ),
    cell: ({ row }) => {
      const value = row.original.displayFields.renewedTo
      if (value === '-') {
        return <Text color="verySubtle">-</Text>
      }
      return <Text>{value}</Text>
    },
    meta: { className: 'justify-end', ...hashColumnWidth },
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
