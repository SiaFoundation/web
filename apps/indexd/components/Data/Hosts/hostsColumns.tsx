import { ColumnDef } from '@tanstack/react-table'
import {
  Text,
  Tooltip,
  ValueCopyable,
  Badge,
  ValueWithTooltip,
} from '@siafoundation/design-system'
import { CheckmarkFilled16, CloseFilled16 } from '@siafoundation/react-icons'
import { HostData } from './types'
import { TableHeader } from '../columns'
import { UsabilityBadges, UsabilityIndicator } from '../UsabilityBadges'
import { CountryFilter } from './filters/CountryFilter'
import { UsableFilter } from './filters/UsableFilter'
import { BlockedFilter } from './filters/BlockedFilter'
import { selectColumn } from '../sharedColumns/select'

export const columns: ColumnDef<HostData>[] = [
  selectColumn(),
  {
    id: 'publicKey',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column} className="justify-start">
        Public Key
      </TableHeader>
    ),
    accessorKey: 'id',
    cell: ({ getValue }) => (
      <ValueCopyable value={getValue<string>()} type="hostPublicKey" />
    ),
    meta: { width: 150 },
  },
  {
    id: 'usable',
    header: ({ table, column }) => (
      <TableHeader
        table={table}
        column={column}
        className="justify-start"
        filter={<UsableFilter table={table} />}
      >
        Usable
      </TableHeader>
    ),
    accessorKey: 'usable',
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-end gap-1">
          <Tooltip
            content={
              row.original.usable ? 'host is usable' : 'host is unusable'
            }
          >
            {row.original.usable ? (
              <CheckmarkFilled16 className="text-green-500" />
            ) : (
              <CloseFilled16 className="text-red-500" />
            )}
          </Tooltip>
          <UsabilityBadges
            usable={row.original.usable}
            usability={row.original.usability}
          />
        </div>
      )
    },
    meta: {
      width: 200,
    },
  },
  {
    id: 'blocked',
    header: ({ table, column }) => (
      <TableHeader
        table={table}
        column={column}
        className="justify-start"
        filter={<BlockedFilter table={table} />}
      >
        Blocked
      </TableHeader>
    ),
    accessorKey: 'blocked',
    cell: ({ row }) => {
      const isBlocked = row.original.blocked
      return (
        <div className="flex items-center">
          <Tooltip
            content={isBlocked ? 'host is blocked' : 'host is not blocked'}
          >
            {isBlocked ? (
              <CloseFilled16 className="text-red-500" />
            ) : (
              <CheckmarkFilled16 className="text-neutral-300 dark:text-neutral-500" />
            )}
          </Tooltip>
          {isBlocked && (
            <Badge size="small" className="ml-1">
              {row.original.blockedReason}
            </Badge>
          )}
        </div>
      )
    },
    meta: {
      className: 'justify-start',
    },
  },
  {
    id: 'acceptingContracts',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Accepting Contracts
      </TableHeader>
    ),
    accessorKey: 'settings.acceptingContracts',
    cell: ({ row, getValue }) => (
      <div className="flex items-center justify-end gap-1">
        <UsabilityIndicator
          status={
            row.original.usability.acceptingContracts ? 'usable' : 'unusable'
          }
          name="accepting contracts"
        />
      </div>
    ),
    meta: { className: 'justify-end', width: 80 },
  },
  {
    id: 'uptime',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Uptime
      </TableHeader>
    ),
    accessorKey: 'recentUptime',
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-1">
        <UsabilityIndicator
          status={row.original.usability.uptime ? 'usable' : 'unusable'}
          name="recent uptime"
        />
        <Text>{row.original.displayFields.uptime}</Text>
      </div>
    ),
    meta: { className: 'justify-end', width: 100 },
  },
  {
    id: 'location',
    header: ({ table, column }) => (
      <TableHeader
        table={table}
        column={column}
        filter={<CountryFilter table={table} />}
      >
        Location
      </TableHeader>
    ),
    accessorKey: 'location.countryCode',
    cell: ({ row }) => {
      if (row.original.location.countryCode === 'unknown') {
        return (
          <div className="py-1">
            <Text color="verySubtle">-</Text>
          </div>
        )
      }
      return (
        <div className="py-1">
          <span role="img" aria-label={row.original.displayFields.countryName}>
            {row.original.displayFields.countryFlag}
          </span>
          <Text className="ml-1">{row.original.location.countryCode}</Text>
        </div>
      )
    },
    meta: { className: 'justify-end' },
  },
  {
    id: 'totalStorage',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Total Storage
      </TableHeader>
    ),
    accessorKey: 'settings.totalStorage',
    cell: ({ row }) => <Text>{row.original.displayFields.totalStorage}</Text>,
    meta: { className: 'justify-end' },
  },
  {
    id: 'remainingStorage',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Remaining Storage
      </TableHeader>
    ),
    accessorKey: 'settings.remainingStorage',
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-end gap-1">
          <UsabilityIndicator
            status={row.original.displayFields.remainingStorageUsability}
            name="storage"
          />
          <Text>{row.original.displayFields.remainingStorage}</Text>
        </div>
      )
    },
    meta: { className: 'justify-end' },
  },
  {
    id: 'storagePrice',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Price Storage
      </TableHeader>
    ),
    accessorKey: 'settings.prices.storagePrice',
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-1">
        <UsabilityIndicator
          status={row.original.usability.storagePrice ? 'usable' : 'unusable'}
          name="storage price"
        />
        <ValueWithTooltip {...row.original.displayFields.storagePrice} />
      </div>
    ),
    meta: {
      className: 'justify-end',
    },
    sortingFn: (rowA, rowB) => {
      return rowA.original.sortFields.storagePrice
        .minus(rowB.original.sortFields.storagePrice)
        .toNumber()
    },
  },
  {
    id: 'ingressPrice',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Ingress/TB
      </TableHeader>
    ),
    accessorKey: 'settings.prices.ingressPrice',
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-end gap-1">
          <UsabilityIndicator
            status={row.original.usability.ingressPrice ? 'usable' : 'unusable'}
            name="ingress price"
          />
          <ValueWithTooltip {...row.original.displayFields.ingressPrice} />
        </div>
      )
    },
    meta: { className: 'justify-end' },
    sortingFn: (rowA, rowB) => {
      return rowA.original.sortFields.ingressPrice
        .minus(rowB.original.sortFields.ingressPrice)
        .toNumber()
    },
  },
  {
    id: 'egressPrice',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Egress/TB
      </TableHeader>
    ),
    accessorKey: 'settings.prices.egressPrice',
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-1">
        <UsabilityIndicator
          status={row.original.usability.egressPrice ? 'usable' : 'unusable'}
          name="egress price"
        />
        <ValueWithTooltip {...row.original.displayFields.egressPrice} />
      </div>
    ),
    meta: { className: 'justify-end' },
    sortingFn: (rowA, rowB) => {
      return rowA.original.sortFields.egressPrice
        .minus(rowB.original.sortFields.egressPrice)
        .toNumber()
    },
  },
  {
    id: 'freeSectorPrice',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Free Sector Price
      </TableHeader>
    ),
    accessorKey: 'settings.prices.freeSectorPrice',
    cell: ({ row, getValue }) => (
      <div className="flex items-center justify-end gap-1">
        <UsabilityIndicator
          status={
            row.original.usability.freeSectorPrice ? 'usable' : 'unusable'
          }
          name="free sector price"
        />
        <ValueWithTooltip {...row.original.displayFields.freeSectorPrice} />
      </div>
    ),
    meta: { className: 'justify-end' },
    sortingFn: (rowA, rowB) => {
      return rowA.original.sortFields.freeSectorPrice
        .minus(rowB.original.sortFields.freeSectorPrice)
        .toNumber()
    },
  },
  {
    id: 'maxContractDuration',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Max Contract Duration
      </TableHeader>
    ),
    accessorKey: 'settings.maxContractDuration',
    cell: ({ row, getValue }) => (
      <div className="flex items-center justify-end gap-1">
        <UsabilityIndicator
          status={
            row.original.usability.maxContractDuration ? 'usable' : 'unusable'
          }
          name="max contract duration"
        />
        <Text>{row.original.displayFields.maxContractDuration}</Text>
      </div>
    ),
    meta: { className: 'justify-end', width: 120 },
  },
  {
    id: 'maxCollateral',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Max Collateral
      </TableHeader>
    ),
    accessorKey: 'settings.maxCollateral',
    cell: ({ row, getValue }) => (
      <div className="flex items-center justify-end gap-1">
        <UsabilityIndicator
          status={row.original.usability.maxCollateral ? 'usable' : 'unusable'}
          name="max collateral"
        />
        <ValueWithTooltip {...row.original.displayFields.maxCollateral} />
      </div>
    ),
    meta: { className: 'justify-end', width: 120 },
    sortingFn: (rowA, rowB) => {
      return rowA.original.sortFields.maxCollateral
        .minus(rowB.original.sortFields.maxCollateral)
        .toNumber()
    },
  },
  {
    id: 'protocolVersion',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Protocol Version
      </TableHeader>
    ),
    accessorKey: 'settings.protocolVersion',
    cell: ({ row, getValue }) => (
      <div className="flex items-center justify-end gap-1">
        <UsabilityIndicator
          status={
            row.original.usability.protocolVersion ? 'usable' : 'unusable'
          }
          name="protocol version"
        />
        <Text>{row.original.displayFields.protocolVersion}</Text>
      </div>
    ),
    meta: { className: 'justify-end', width: 120 },
  },
  {
    id: 'priceValidity',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Price Validity
      </TableHeader>
    ),
    accessorKey: 'settings.prices.validUntil',
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-1">
        <UsabilityIndicator
          status={row.original.usability.priceValidity ? 'usable' : 'unusable'}
          name="price validity"
        />
        <Text>{row.original.displayFields.priceValidity}</Text>
      </div>
    ),
    meta: { className: 'justify-end', width: 220 },
  },
  {
    id: 'release',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Release
      </TableHeader>
    ),
    accessorKey: 'settings.release',
    cell: ({ row }) => <Text>{row.original.displayFields.release}</Text>,
    meta: { className: 'justify-end', width: 120 },
  },
]
