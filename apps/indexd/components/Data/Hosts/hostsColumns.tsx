import { ColumnDef } from '@tanstack/react-table'
import {
  Text,
  Tooltip,
  ValueCopyable,
  CountryFlag,
  ValueScFiat,
} from '@siafoundation/design-system'
import { CheckmarkFilled16, CloseFilled16 } from '@siafoundation/react-icons'
import { HostData } from './types'
import { TableHeader } from '../columns'
import {
  sectorsToBytes,
  humanBytes,
  blocksToWeeks,
  GBToBytes,
  storagePriceInHastingsPerTBPerMonth,
  egressPriceInHastingsPerTBPerMonth,
  ingressPriceInHastingsPerTBPerMonth,
} from '@siafoundation/units'
import { BigNumber } from 'bignumber.js'
import {
  UsabilityBadge,
  UsabilityBadges,
  UsabilityIndicator,
} from '../UsabilityBadges'

export const columns: ColumnDef<HostData>[] = [
  {
    id: 'publicKey',
    header: () => (
      <TableHeader className="justify-start">Public Key</TableHeader>
    ),
    accessorKey: 'id',
    cell: ({ getValue }) => (
      <ValueCopyable value={getValue<string>()} type="hostPublicKey" />
    ),
    meta: { width: 150 },
  },
  {
    id: 'usable',
    header: () => <TableHeader className="justify-start">Usable</TableHeader>,
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
    header: () => <TableHeader>Blocked</TableHeader>,
    accessorKey: 'blocked',
    cell: ({ row }) => {
      const isBlocked = row.original.blocked
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
    meta: {
      className: 'justify-end',
    },
  },
  {
    id: 'acceptingContracts',
    header: () => <TableHeader>Accepting Contracts</TableHeader>,
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
    header: () => <TableHeader>Uptime</TableHeader>,
    accessorKey: 'recentUptime',
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-1">
        <UsabilityIndicator
          status={row.original.usability.uptime ? 'usable' : 'unusable'}
          name="recent uptime"
        />
        <Text>{(row.original.recentUptime * 100).toFixed(1)}%</Text>
      </div>
    ),
    meta: { className: 'justify-end', width: 100 },
  },
  {
    id: 'location',
    header: () => <TableHeader>Location</TableHeader>,
    accessorKey: 'location.countryCode',
    cell: ({ row, column }) => (
      <div className="py-1">
        <CountryFlag countryCode={row.original.location?.countryCode} />
        <Text className="ml-1">{row.original.location?.countryCode}</Text>
      </div>
    ),
    meta: { className: 'justify-end' },
  },
  {
    id: 'totalStorage',
    header: () => <TableHeader>Total Storage</TableHeader>,
    accessorKey: 'settings.totalStorage',
    cell: ({ getValue }) => (
      <Text>{humanBytes(sectorsToBytes(getValue<number>()))}</Text>
    ),
    meta: { className: 'justify-end' },
  },
  {
    id: 'remainingStorage',
    header: () => <TableHeader>Remaining Storage</TableHeader>,
    accessorKey: 'settings.remainingStorage',
    cell: ({ getValue }) => {
      const value = sectorsToBytes(getValue<number>())
      const lowStorageThreshold = GBToBytes(10)
      return (
        <div className="flex items-center justify-end gap-1">
          <UsabilityIndicator
            status={
              value.eq(0)
                ? 'unusable'
                : value.lt(lowStorageThreshold)
                  ? 'warning'
                  : 'usable'
            }
            name="storage"
          />
          <Text>{humanBytes(value)}</Text>
        </div>
      )
    },
    meta: { className: 'justify-end' },
  },
  {
    id: 'storagePrice',
    header: () => <TableHeader>Price Storage</TableHeader>,
    accessorKey: 'settings.prices.storagePrice',
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-1">
        <UsabilityIndicator
          status={row.original.usability.storagePrice ? 'usable' : 'unusable'}
          name="storage price"
        />
        <ValueScFiat
          variant="value"
          font="sans"
          value={storagePriceInHastingsPerTBPerMonth({
            price: row.original.settings.prices.storagePrice,
          })}
        />
      </div>
    ),
    meta: { className: 'justify-end' },
  },
  {
    id: 'ingressPrice',
    header: () => <TableHeader>Ingress/TB</TableHeader>,
    accessorKey: 'settings.prices.ingressPrice',
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-end gap-1">
          <UsabilityIndicator
            status={row.original.usability.ingressPrice ? 'usable' : 'unusable'}
            name="ingress price"
          />
          <ValueScFiat
            variant="value"
            font="sans"
            value={ingressPriceInHastingsPerTBPerMonth({
              price: row.original.settings.prices.ingressPrice,
            })}
          />
        </div>
      )
    },
    meta: { className: 'justify-end' },
  },
  {
    id: 'egressPrice',
    header: () => <TableHeader>Egress/TB</TableHeader>,
    accessorKey: 'settings.prices.egressPrice',
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-1">
        <UsabilityIndicator
          status={row.original.usability.egressPrice ? 'usable' : 'unusable'}
          name="egress price"
        />
        <ValueScFiat
          variant="value"
          font="sans"
          value={egressPriceInHastingsPerTBPerMonth({
            price: row.original.settings.prices.egressPrice,
          })}
        />
      </div>
    ),
    meta: { className: 'justify-end' },
  },
  {
    id: 'freeSectorPrice',
    header: () => <TableHeader>Free Sector Price</TableHeader>,
    accessorKey: 'settings.prices.freeSectorPrice',
    cell: ({ row, getValue }) => (
      <div className="flex items-center justify-end gap-1">
        <UsabilityIndicator
          status={
            row.original.usability.freeSectorPrice ? 'usable' : 'unusable'
          }
          name="free sector price"
        />
        <ValueScFiat
          variant="value"
          font="sans"
          fixed={10}
          value={new BigNumber(getValue<number>())}
        />
      </div>
    ),
    meta: { className: 'justify-end', width: 160 },
  },
  {
    id: 'maxContractDuration',
    header: () => <TableHeader>Max Contract Duration</TableHeader>,
    accessorKey: 'settings.maxContractDuration',
    cell: ({ row, getValue }) => (
      <div className="flex items-center justify-end gap-1">
        <UsabilityIndicator
          status={
            row.original.usability.maxContractDuration ? 'usable' : 'unusable'
          }
          name="max contract duration"
        />
        <Text>{blocksToWeeks(getValue<number>()).toFixed(1)} weeks</Text>
      </div>
    ),
    meta: { className: 'justify-end', width: 120 },
  },
  {
    id: 'maxCollateral',
    header: () => <TableHeader>Max Collateral</TableHeader>,
    accessorKey: 'settings.maxCollateral',
    cell: ({ row, getValue }) => (
      <div className="flex items-center justify-end gap-1">
        <UsabilityIndicator
          status={row.original.usability.maxCollateral ? 'usable' : 'unusable'}
          name="max collateral"
        />
        <ValueScFiat
          variant="value"
          font="sans"
          value={new BigNumber(getValue<string>())}
        />
      </div>
    ),
    meta: { className: 'justify-end', width: 120 },
  },
  {
    id: 'protocolVersion',
    header: () => <TableHeader>Protocol Version</TableHeader>,
    accessorKey: 'settings.protocolVersion',
    cell: ({ row, getValue }) => (
      <div className="flex items-center justify-end gap-1">
        <UsabilityIndicator
          status={
            row.original.usability.protocolVersion ? 'usable' : 'unusable'
          }
          name="protocol version"
        />
        <Text>{getValue<[number, number, number]>().join('.')}</Text>
      </div>
    ),
    meta: { className: 'justify-end', width: 120 },
  },
  {
    id: 'priceValidity',
    header: () => <TableHeader>Price Validity</TableHeader>,
    accessorKey: 'settings.prices.validUntil',
    cell: ({ row, getValue }) => (
      <div className="flex items-center justify-end gap-1">
        <UsabilityIndicator
          status={row.original.usability.priceValidity ? 'usable' : 'unusable'}
          name="price validity"
        />
        <Text>{new Date(getValue<string>()).toLocaleString()}</Text>
      </div>
    ),
    meta: { className: 'justify-end', width: 220 },
  },
  {
    id: 'release',
    header: () => <TableHeader>Release</TableHeader>,
    accessorKey: 'settings.release',
    cell: ({ getValue }) => <Text>{getValue<string>()}</Text>,
    meta: { className: 'justify-end', width: 120 },
  },
]
