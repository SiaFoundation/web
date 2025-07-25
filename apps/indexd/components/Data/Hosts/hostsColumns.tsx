import { ColumnDef } from '@tanstack/react-table'
import { Text } from '@siafoundation/design-system'
import { CountryFlag } from '../CountryFlag'
import { ColumnFilter } from '../ColumnFilter'
import { CellFilter } from '../CellFilter'
import {
  CheckmarkOutline16,
  WarningSquareFilled16,
  CloseOutline16,
  UndefinedFilled16,
} from '@siafoundation/react-icons'
import { Host } from '../mockData'
import { TableCellText, TableHeader } from '../columns'

function formatSC(val: number) {
  return `${val.toLocaleString()} SC`
}
function formatTB(val: number) {
  return `${val.toLocaleString()} TB`
}

// Function to create columns with available countries for filters
export const columns: ColumnDef<Host>[] = [
  {
    id: 'publicKey',
    header: () => <TableHeader>Public Key</TableHeader>,
    accessorKey: 'id',
    cell: ({ row, column, getValue }) => (
      <CellFilter column={column} value={row.original.id}>
        <TableCellText>{getValue<string>()}</TableCellText>
      </CellFilter>
    ),
    meta: { width: 200 },
  },
  {
    id: 'dns',
    header: () => <TableHeader>DNS</TableHeader>,
    accessorKey: 'dns',
    cell: ({ getValue }) => <Text>{getValue<string>()}</Text>,
    meta: { className: 'justify-start truncate', width: 150 },
  },
  {
    id: 'good',
    header: () => <TableHeader>Good</TableHeader>,
    accessorKey: 'state',
    cell: ({ row, column }) => {
      const isGood = row.original.state === 'good'
      return (
        <CellFilter column={column} value="good">
          <div className="flex justify-center">
            {isGood ? (
              <CheckmarkOutline16 className="text-green-600" />
            ) : (
              <WarningSquareFilled16 className="text-red-600" />
            )}
          </div>
        </CellFilter>
      )
    },
    meta: {
      className: 'text-center truncate',
      formatFilterValue: (value: string) =>
        value === 'good' ? '✅ Good' : '❌ Bad',
    },
    filterFn: 'equals',
  },
  {
    id: 'usable',
    header: () => <TableHeader>Usable</TableHeader>,
    accessorKey: 'usable',
    cell: ({ row, column }) => {
      const isUsable = row.original.usable === 'usable'
      return (
        <CellFilter column={column} value="usable">
          <div className="flex justify-center">
            {isUsable ? (
              <CheckmarkOutline16 className="text-green-600" />
            ) : (
              <CloseOutline16 className="text-red-600" />
            )}
          </div>
        </CellFilter>
      )
    },
    meta: {
      className: 'text-center truncate',
      formatFilterValue: (value: string) =>
        value === 'usable' ? '✅ Usable' : '❌ Not Usable',
    },
    filterFn: 'equals',
  },
  {
    id: 'blocked',
    header: ({ table }) => <TableHeader>Blocked</TableHeader>,
    accessorKey: 'blocked',
    cell: ({ row, column }) => {
      const isBlocked = row.original.blocked
      return (
        <CellFilter column={column} value={isBlocked}>
          <div className="flex justify-center">
            {isBlocked ? (
              <WarningSquareFilled16 className="text-yellow-500" />
            ) : (
              <UndefinedFilled16 className="text-neutral-400" />
            )}
          </div>
        </CellFilter>
      )
    },
    meta: {
      className: 'text-center truncate',
      formatFilterValue: (value: boolean) =>
        value ? '🚫 Blocked' : '✅ Not Blocked',
    },
    filterFn: 'equals',
  },
  {
    id: 'active',
    header: () => <TableHeader>Active Contracts</TableHeader>,
    cell: ({ row }) =>
      row.original.hasActiveContracts ? (
        <CheckmarkOutline16 className="text-green-600 mx-auto" />
      ) : (
        <UndefinedFilled16 className="text-neutral-400 mx-auto" />
      ),
    meta: { className: 'text-center truncate' },
  },
  {
    id: 'any',
    header: () => <TableHeader>Any Contracts</TableHeader>,
    cell: ({ row }) =>
      row.original.hasAnyContracts ? (
        <CheckmarkOutline16 className="text-green-600 mx-auto" />
      ) : (
        <UndefinedFilled16 className="text-neutral-400 mx-auto" />
      ),
    meta: { className: 'text-center truncate w-[200px]' },
  },
  {
    id: 'countryCode',
    header: () => <TableHeader>Country</TableHeader>,
    accessorKey: 'countryCode',
    cell: ({ row, column }) => (
      <CellFilter column={column} value={row.original.countryCode}>
        <div className="py-1">
          <CountryFlag countryCode={row.original.countryCode} />
        </div>
      </CellFilter>
    ),
    meta: { className: 'text-center truncate' },
    filterFn: 'equals', // Use exact match for country codes
  },
  {
    id: 'totalStorage',
    header: () => <TableHeader>Total Storage</TableHeader>,
    accessorKey: 'totalStorageTB',
    cell: ({ getValue }) => <Text>{formatTB(getValue<number>())}</Text>,
    meta: { className: 'truncate' },
  },
  {
    id: 'availableStorage',
    header: () => <TableHeader>Available Storage</TableHeader>,
    accessorKey: 'availableStorageTB',
    cell: ({ getValue }) => <Text>{formatTB(getValue<number>())}</Text>,
    meta: { className: 'truncate' },
  },
  {
    id: 'priceStorage',
    header: () => <TableHeader>Price Storage</TableHeader>,
    accessorKey: 'priceStorageTBMo',
    cell: ({ getValue }) => <Text>{formatSC(getValue<number>())}</Text>,
    meta: { className: 'truncate' },
  },
  {
    id: 'uploadTB',
    header: () => <TableHeader>Upload/TB</TableHeader>,
    accessorKey: 'priceUploadTB',
    cell: ({ getValue }) => <Text>{formatSC(getValue<number>())}</Text>,
    meta: { className: 'truncate' },
  },
  {
    id: 'downloadTB',
    header: () => <TableHeader>Download/TB</TableHeader>,
    accessorKey: 'priceDownloadTB',
    cell: ({ getValue }) => <Text>{formatSC(getValue<number>())}</Text>,
    meta: { className: 'truncate' },
  },
]
