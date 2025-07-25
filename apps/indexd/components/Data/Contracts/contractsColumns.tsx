import { type Contract } from '../mockData'
import { Badge, Text } from '@siafoundation/design-system'
import { type ColumnDef } from '@tanstack/react-table'
import { CountryFlag } from '../CountryFlag'
import { ContractTimeline } from '@siafoundation/design-system/src/app/ContractTimeline'
import { useSyncStatus } from '../../../hooks/useSyncStatus'
import { TableHeader } from '../columns'
import { ComponentProps } from 'react'

function formatSC(val: number) {
  return `${val.toLocaleString()} SC`
}
function formatTB(val: number) {
  return `${val.toLocaleString()} TB`
}
function formatDate(height: number) {
  return `H${height}`
}

export const contractsColumns: ColumnDef<Contract>[] = [
  {
    id: 'id',
    header: () => <TableHeader>ID</TableHeader>,
    accessorKey: 'id',
    cell: ({ getValue }) => <Text tag="span">{getValue<string>()}</Text>,
    meta: { className: 'truncate' },
  },
  {
    id: 'hostPublicKey',
    header: () => <TableHeader>Host Public Key</TableHeader>,
    accessorFn: (row) => row.host?.id ?? '',
    cell: ({ getValue }) => (
      <Text tag="span" className="truncate max-w-[160px]">
        {getValue<string>() || '—'}
      </Text>
    ),
    meta: { className: 'truncate' },
  },
  {
    id: 'state',
    header: () => <TableHeader>State</TableHeader>,
    accessorKey: 'state',
    cell: ({ getValue }) => {
      const value = getValue<string>()
      let variant: ComponentProps<typeof Badge>['variant'] = 'gray'
      if (value === 'active') variant = 'green'
      else if (value === 'failed') variant = 'red'
      else if (value === 'complete') variant = 'gray'
      return (
        <Badge size="small" variant={variant}>
          {value}
        </Badge>
      )
    },
    meta: { className: 'truncate' },
  },
  {
    id: 'hostCountryCode',
    header: () => <TableHeader>Country Code</TableHeader>,
    accessorFn: (row) => row.host?.location?.countryCode ?? '',
    cell: ({ getValue }) => {
      const code = getValue<string>()
      return (
        <span className="flex items-center gap-1">
          <CountryFlag countryCode={code} />
          <Text tag="span">{code || '—'}</Text>
        </span>
      )
    },
    meta: { className: 'truncate' },
  },
  {
    id: 'timeline',
    header: () => <TableHeader>Timeline</TableHeader>,
    cell: function TimelineCell({ row, table }) {
      const { blockHeight } = useSyncStatus()
      const timeline = row.original.timeline
      const [min] = table
        .getColumn('contractHeightStart')
        ?.getFacetedMinMaxValues() || [0, 0]
      const [, max] = table
        .getColumn('contractHeightEnd')
        ?.getFacetedMinMaxValues() || [0, 0]
      const timelineRange = {
        startHeight: min,
        endHeight: max,
      }
      return (
        <div className="px-1 w-full">
          <ContractTimeline
            currentHeight={blockHeight}
            contractHeightStart={timeline.contractHeightStart}
            contractHeightEnd={timeline.contractHeightEnd}
            proofWindowHeightStart={timeline.proofWindowHeightStart}
            proofWindowHeightEnd={timeline.proofWindowHeightEnd}
            revisionHeight={timeline.revisionHeight}
            resolutionHeight={timeline.resolutionHeight}
            payoutHeight={timeline.payoutHeight}
            range={timelineRange}
          />
        </div>
      )
    },
    meta: { className: 'w-[150px]', width: 200 },
  },
  {
    id: 'contractHeightStart',
    header: () => <TableHeader>Start</TableHeader>,
    accessorKey: 'timeline.contractHeightStart',
    cell: ({ getValue }) => (
      <Text tag="span">{formatDate(getValue<number>())}</Text>
    ),
    meta: { className: 'truncate' },
  },
  {
    id: 'contractHeightEnd',
    header: () => <TableHeader>End</TableHeader>,
    accessorKey: 'timeline.contractHeightEnd',
    cell: ({ getValue }) => (
      <Text tag="span">{formatDate(getValue<number>())}</Text>
    ),
    meta: { className: 'truncate' },
  },
  {
    id: 'capacity',
    header: () => <TableHeader>Capacity</TableHeader>,
    accessorKey: 'size',
    cell: ({ getValue }) => (
      <Text tag="span">{formatTB(getValue<number>())}</Text>
    ),
    meta: { className: 'truncate' },
  },
  {
    id: 'dataSize',
    header: () => <TableHeader>Data Size</TableHeader>,
    accessorKey: 'capacity',
    cell: ({ getValue }) => (
      <Text tag="span">{formatTB(getValue<number>())}</Text>
    ),
    meta: { className: 'truncate' },
  },
  {
    id: 'spendStorage',
    header: () => <TableHeader>Spend Storage</TableHeader>,
    accessorKey: 'spendingStorage',
    cell: ({ getValue }) => (
      <Text tag="span">{formatSC(getValue<number>())}</Text>
    ),
    meta: { className: 'truncate' },
  },
  {
    id: 'spendUpload',
    header: () => <TableHeader>Spend Upload</TableHeader>,
    accessorKey: 'spendingUpload',
    cell: ({ getValue }) => (
      <Text tag="span">{formatSC(getValue<number>())}</Text>
    ),
    meta: { className: 'truncate' },
  },
  {
    id: 'spendDownload',
    header: () => <TableHeader>Spend Download</TableHeader>,
    accessorKey: 'spendingDownload',
    cell: ({ getValue }) => (
      <Text tag="span">{formatSC(getValue<number>())}</Text>
    ),
    meta: { className: 'truncate' },
  },
  {
    id: 'accounts',
    header: () => <TableHeader>Accounts</TableHeader>,
    accessorKey: 'accountCount',
    cell: ({ getValue }) => <Text tag="span">{getValue<number>()}</Text>,
    meta: { className: 'truncate' },
  },
]
