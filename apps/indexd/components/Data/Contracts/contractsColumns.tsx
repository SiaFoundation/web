import { type ContractData } from './types'
import {
  Badge,
  Text,
  CountryFlag,
  ValueScFiat,
  ValueCopyable,
  Tooltip,
} from '@siafoundation/design-system'
import { type ColumnDef } from '@tanstack/react-table'
import { TableHeader } from '../columns'
import { humanBytes } from '@siafoundation/units'
import BigNumber from 'bignumber.js'
import { UsabilityBadges } from '../UsabilityBadges'
import { CheckmarkFilled16, CloseFilled16 } from '@siafoundation/react-icons'
import { selectColumn } from '../sharedColumns/select'

export const contractsColumns: ColumnDef<ContractData>[] = [
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
      <ValueCopyable value={getValue<string>()} type="contract" />
    ),
    meta: { className: 'justify-start', width: 160 },
  },
  {
    id: 'status',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Status
      </TableHeader>
    ),
    accessorKey: 'good',
    cell: ({ getValue }) => (
      <StatusBadge variant={getValue<boolean>() ? 'good' : 'bad'} />
    ),
    meta: { className: 'justify-end', width: 80 },
  },
  {
    id: 'state',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        State
      </TableHeader>
    ),
    accessorKey: 'state',
    cell: ({ getValue }) => <StateBadge value={getValue<string>()} />,
    meta: { className: 'justify-end', width: 80 },
  },
  {
    id: 'hostPublicKey',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Host Public Key
      </TableHeader>
    ),
    accessorKey: 'hostKey',
    cell: ({ getValue }) => (
      <ValueCopyable value={getValue<string>()} type="hostPublicKey" />
    ),
    meta: { className: 'justify-end', width: 160 },
  },
  {
    id: 'location',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Host Location
      </TableHeader>
    ),
    accessorKey: 'host.location.countryCode',
    cell: ({ getValue }) => {
      const code = getValue<string>()
      if (code === 'unknown') return <Text color="verySubtle">-</Text>
      return (
        <span className="flex items-center gap-1">
          <CountryFlag countryCode={code} />
          <Text>{code}</Text>
        </span>
      )
    },
    meta: { className: 'justify-end' },
  },
  {
    id: 'hostUsable',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column} className="justify-start">
        Host Usable
      </TableHeader>
    ),
    accessorKey: 'hostUsable',
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-end gap-1">
          <Tooltip
            content={
              row.original.host?.usable ? 'host is usable' : 'host is unusable'
            }
          >
            {row.original.host?.usable ? (
              <CheckmarkFilled16 className="text-green-500" />
            ) : (
              <CloseFilled16 className="text-red-500" />
            )}
          </Tooltip>
          <UsabilityBadges
            usable={row.original.host?.usable || false}
            usability={row.original.host?.usability}
          />
        </div>
      )
    },
    meta: { className: 'justify-start', width: 160 },
  },
  {
    id: 'hostBlocked',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Host Blocked
      </TableHeader>
    ),
    accessorKey: 'host.blocked',
    cell: ({ row }) => {
      const isBlocked = row.original.host?.blocked
      return (
        <div className="flex justify-end">
          <Tooltip
            content={isBlocked ? 'host is blocked' : 'host is not blocked'}
          >
            {isBlocked ? (
              <CloseFilled16 className="text-red-500" />
            ) : (
              <CheckmarkFilled16 className="text-neutral-500" />
            )}
          </Tooltip>
        </div>
      )
    },
    meta: { className: 'justify-end' },
  },
  {
    id: 'formation',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Formation
      </TableHeader>
    ),
    accessorKey: 'formation',
    cell: ({ getValue }) => (
      <Text>
        {Intl.DateTimeFormat('en-US', {
          dateStyle: 'short',
          timeStyle: 'short',
        }).format(new Date(getValue<string>()))}
      </Text>
    ),
    meta: { className: 'justify-end', width: 140 },
  },
  {
    id: 'proofHeight',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Proof Height
      </TableHeader>
    ),
    accessorKey: 'proofHeight',
    cell: ({ getValue }) => <Text>{getValue<number>().toLocaleString()}</Text>,
    meta: { className: 'justify-end' },
  },
  {
    id: 'expirationHeight',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Expiration Height
      </TableHeader>
    ),
    accessorKey: 'expirationHeight',
    cell: ({ getValue }) => <Text>{getValue<number>().toLocaleString()}</Text>,
    meta: { className: 'justify-end' },
  },
  {
    id: 'nextPrune',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Next Prune
      </TableHeader>
    ),
    accessorKey: 'nextPrune',
    cell: ({ getValue }) => (
      <Text>
        {Intl.DateTimeFormat('en-US', {
          dateStyle: 'short',
          timeStyle: 'short',
        }).format(new Date(getValue<string>()))}
      </Text>
    ),
    meta: { className: 'justify-end', width: 140 },
  },
  {
    id: 'lastBroadcastAttempt',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Last Broadcast Attempt
      </TableHeader>
    ),
    accessorKey: 'lastBroadcastAttempt',
    cell: ({ getValue }) => (
      <Text>
        {Intl.DateTimeFormat('en-US', {
          dateStyle: 'short',
          timeStyle: 'short',
        }).format(new Date(getValue<string>()))}
      </Text>
    ),
    meta: { className: 'justify-end', width: 140 },
  },
  {
    id: 'capacity',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Capacity
      </TableHeader>
    ),
    accessorKey: 'size',
    cell: ({ getValue }) => <Text>{humanBytes(getValue<number>())}</Text>,
    meta: { className: 'justify-end' },
  },
  {
    id: 'dataSize',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Data Size
      </TableHeader>
    ),
    accessorKey: 'capacity',
    cell: ({ getValue }) => <Text>{humanBytes(getValue<number>())}</Text>,
    meta: { className: 'justify-end' },
  },
  {
    id: 'spendingSectorRoots',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Spend Sector Roots
      </TableHeader>
    ),
    accessorKey: 'spending.sectorRoots',
    cell: ({ getValue }) => (
      <ValueScFiat
        variant="value"
        font="sans"
        value={new BigNumber(getValue<string>())}
      />
    ),
    meta: { className: 'justify-end' },
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.sortingFields.spending.sectorRoots
      const b = rowB.original.sortingFields.spending.sectorRoots
      return a.minus(b).toNumber()
    },
  },
  {
    id: 'spendAppendSector',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Spend Append Sector
      </TableHeader>
    ),
    accessorKey: 'spending.appendSector',
    cell: ({ getValue }) => (
      <ValueScFiat
        variant="value"
        font="sans"
        value={new BigNumber(getValue<string>())}
      />
    ),
    meta: { className: 'justify-end' },
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.sortingFields.spending.appendSector
      const b = rowB.original.sortingFields.spending.appendSector
      return a.minus(b).toNumber()
    },
  },
  {
    id: 'spendFreeSector',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Spend Free Sector
      </TableHeader>
    ),
    accessorKey: 'spending.freeSector',
    cell: ({ getValue }) => (
      <ValueScFiat
        variant="value"
        font="sans"
        value={new BigNumber(getValue<string>())}
      />
    ),
    meta: { className: 'justify-end' },
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.sortingFields.spending.freeSector
      const b = rowB.original.sortingFields.spending.freeSector
      return a.minus(b).toNumber()
    },
  },
  {
    id: 'spendFundAccount',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Spend Fund Account
      </TableHeader>
    ),
    accessorKey: 'spending.fundAccount',
    cell: ({ getValue }) => (
      <ValueScFiat
        variant="value"
        font="sans"
        value={new BigNumber(getValue<string>())}
      />
    ),
    meta: { className: 'justify-end' },
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.sortingFields.spending.fundAccount
      const b = rowB.original.sortingFields.spending.fundAccount
      return a.minus(b).toNumber()
    },
  },
  {
    id: 'initialAllowance',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Initial Allowance
      </TableHeader>
    ),
    accessorKey: 'initialAllowance',
    cell: ({ getValue }) => (
      <ValueScFiat
        variant="value"
        font="sans"
        value={new BigNumber(getValue<string>())}
      />
    ),
    meta: { className: 'justify-end' },
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.sortingFields.spending.sectorRoots
      const b = rowB.original.sortingFields.spending.sectorRoots
      return a.minus(b).toNumber()
    },
  },
  {
    id: 'remainingAllowance',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Remaining Allowance
      </TableHeader>
    ),
    accessorKey: 'remainingAllowance',
    cell: ({ getValue }) => (
      <ValueScFiat
        variant="value"
        font="sans"
        value={new BigNumber(getValue<string>())}
      />
    ),
    meta: { className: 'justify-end' },
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.sortingFields.remainingAllowance
      const b = rowB.original.sortingFields.remainingAllowance
      return a.minus(b).toNumber()
    },
  },
  {
    id: 'totalCollateral',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Total Collateral
      </TableHeader>
    ),
    accessorKey: 'totalCollateral',
    cell: ({ getValue }) => (
      <ValueScFiat
        variant="value"
        font="sans"
        value={new BigNumber(getValue<string>())}
      />
    ),
    meta: { className: 'justify-end' },
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.sortingFields.totalCollateral
      const b = rowB.original.sortingFields.totalCollateral
      return a.minus(b).toNumber()
    },
  },
  {
    id: 'usedCollateral',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Used Collateral
      </TableHeader>
    ),
    accessorKey: 'usedCollateral',
    cell: ({ getValue }) => (
      <ValueScFiat
        variant="value"
        font="sans"
        value={new BigNumber(getValue<string>())}
      />
    ),
    meta: { className: 'justify-end' },
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.sortingFields.usedCollateral
      const b = rowB.original.sortingFields.usedCollateral
      return a.minus(b).toNumber()
    },
  },
  {
    id: 'contractPrice',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Contract Price
      </TableHeader>
    ),
    accessorKey: 'contractPrice',
    cell: ({ getValue }) => (
      <ValueScFiat
        variant="value"
        font="sans"
        value={new BigNumber(getValue<string>())}
      />
    ),
    meta: { className: 'justify-end' },
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.sortingFields.contractPrice
      const b = rowB.original.sortingFields.contractPrice
      return a.minus(b).toNumber()
    },
  },
  {
    id: 'minerFee',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Miner Fee
      </TableHeader>
    ),
    accessorKey: 'minerFee',
    cell: ({ getValue }) => (
      <ValueScFiat
        variant="value"
        font="sans"
        value={new BigNumber(getValue<string>())}
      />
    ),
    meta: { className: 'justify-end' },
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.sortingFields.minerFee
      const b = rowB.original.sortingFields.minerFee
      return a.minus(b).toNumber()
    },
  },
  {
    id: 'revisionNumber',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Revision Number
      </TableHeader>
    ),
    accessorKey: 'revisionNumber',
    cell: ({ getValue }) => <Text>{getValue<number>()?.toLocaleString()}</Text>,
    meta: { className: 'justify-end' },
  },
  {
    id: 'renewedFrom',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Renewed From
      </TableHeader>
    ),
    accessorKey: 'renewedFrom',
    cell: ({ getValue }) => {
      const value = getValue<string>()
      if (
        value ===
        '0000000000000000000000000000000000000000000000000000000000000000'
      )
        return <Text color="verySubtle">-</Text>
      return <Text>{value}</Text>
    },
    meta: { className: 'justify-end' },
  },
  {
    id: 'renewedTo',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Renewed To
      </TableHeader>
    ),
    accessorKey: 'renewedTo',
    cell: ({ getValue }) => {
      const value = getValue<string>()
      if (
        value ===
        '0000000000000000000000000000000000000000000000000000000000000000'
      )
        return <Text color="verySubtle">-</Text>
      return <Text>{value}</Text>
    },
    meta: { className: 'justify-end' },
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
