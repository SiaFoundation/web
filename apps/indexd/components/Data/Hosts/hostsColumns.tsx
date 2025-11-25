import { ColumnDef } from '@tanstack/react-table'
import {
  Text,
  Tooltip,
  ValueCopyable,
  ValueWithTooltip,
} from '@siafoundation/design-system'
import { CheckmarkFilled16, CloseFilled16 } from '@siafoundation/react-icons'
import { HostData } from './types'
import { TableHeader } from '../ColumnHeader'
import { UsabilityBadges, UsabilityIndicator } from '../UsabilityBadges'
import { ColumnUsableFilter } from './columnFilters/ColumnUsableFilter'
import { ColumnBlockedFilter } from './columnFilters/ColumnBlockedFilter'
import { selectColumn } from '../sharedColumns/select'
import {
  hostUsableColumnWidth,
  smallColumnWidth,
  hashColumnWidth,
  hostBlockedColumnWidth,
} from '../sharedColumns/sizes'
import { BlockReasons } from './BlockReasons'

export const columns: ColumnDef<HostData>[] = [
  selectColumn(),
  {
    id: 'publicKey',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column} className="justify-start">
        Public Key
      </TableHeader>
    ),
    cell: ({ row }) => (
      <ValueCopyable
        maxLength={100}
        value={row.original.id}
        type="hostPublicKey"
      />
    ),
    meta: { ...hashColumnWidth },
  },
  {
    id: 'usable',
    header: ({ table, column }) => (
      <TableHeader
        table={table}
        column={column}
        className="justify-start"
        filter={<ColumnUsableFilter />}
      >
        Usable
      </TableHeader>
    ),
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
      ...hostUsableColumnWidth,
      filterLabelPositive: 'Usable',
      filterLabelNegative: 'Unusable',
    },
  },
  {
    id: 'blocked',
    header: ({ table, column }) => (
      <TableHeader
        table={table}
        column={column}
        className="justify-start"
        filter={<ColumnBlockedFilter />}
      >
        Blocked
      </TableHeader>
    ),
    cell: ({ row }) => {
      const isBlocked = row.original.blocked
      return (
        <div className="flex items-center gap-1">
          <Tooltip
            content={isBlocked ? 'host is blocked' : 'host is not blocked'}
          >
            {isBlocked ? (
              <CloseFilled16 className="text-red-500" />
            ) : (
              <CheckmarkFilled16 className="text-neutral-300 dark:text-neutral-500" />
            )}
          </Tooltip>
          <BlockReasons host={row.original} />
        </div>
      )
    },
    meta: {
      className: 'justify-start',
      ...hostBlockedColumnWidth,
      filterLabelPositive: 'Blocked',
      filterLabelNegative: 'Not Blocked',
    },
  },
  {
    id: 'acceptingContracts',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Accepting Contracts
      </TableHeader>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-1">
        <UsabilityIndicator
          status={
            row.original.usability.acceptingContracts ? 'usable' : 'unusable'
          }
          name="accepting contracts"
        />
      </div>
    ),
    meta: { className: 'justify-end', ...smallColumnWidth },
  },
  {
    id: 'uptime',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Uptime
      </TableHeader>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-1">
        <UsabilityIndicator
          status={row.original.usability.uptime ? 'usable' : 'unusable'}
          name="recent uptime"
        />
        <Text>{row.original.displayFields.uptime}</Text>
      </div>
    ),
    meta: { className: 'justify-end', ...smallColumnWidth },
  },
  {
    id: 'location',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Location
      </TableHeader>
    ),
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
    meta: { className: 'justify-end', ...smallColumnWidth },
  },
  {
    id: 'totalStorage',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Total Storage
      </TableHeader>
    ),
    cell: ({ row }) => <Text>{row.original.displayFields.totalStorage}</Text>,
    meta: { className: 'justify-end', ...smallColumnWidth },
  },
  {
    id: 'remainingStorage',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Remaining Storage
      </TableHeader>
    ),
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
    meta: { className: 'justify-end', ...smallColumnWidth },
  },
  {
    id: 'storagePrice',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Price Storage
      </TableHeader>
    ),
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
      ...smallColumnWidth,
    },
  },
  {
    id: 'ingressPrice',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Ingress/TB
      </TableHeader>
    ),
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
    meta: { className: 'justify-end', ...smallColumnWidth },
  },
  {
    id: 'egressPrice',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Egress/TB
      </TableHeader>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-1">
        <UsabilityIndicator
          status={row.original.usability.egressPrice ? 'usable' : 'unusable'}
          name="egress price"
        />
        <ValueWithTooltip {...row.original.displayFields.egressPrice} />
      </div>
    ),
    meta: { className: 'justify-end', ...smallColumnWidth },
  },
  {
    id: 'release',
    header: ({ table, column }) => (
      <TableHeader table={table} column={column}>
        Release
      </TableHeader>
    ),
    cell: ({ row }) => <Text>{row.original.displayFields.release}</Text>,
    meta: { className: 'justify-end', minWidth: 160, maxWidth: 160 },
  },
]
