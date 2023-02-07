import BigNumber from 'bignumber.js'

export type HostData = {
  id: string
  netAddress: string
  publicKey: string
  lastScanSuccess: boolean
  lastScan: string
  knownSince: string
  uptime: number
  downtime: number
  successfulInteractions: BigNumber
  failedInteractions: BigNumber
  totalInteractions: BigNumber
  totalScans: BigNumber
}

export type TableColumnId =
  | 'netAddress'
  | 'publicKey'
  | 'lastScan'
  | 'totalScans'
  | 'knownSince'
  | 'uptime'
  | 'downtime'
  | 'successfulInteractions'
  | 'failedInteractions'
  | 'totalInteractions'

export const columnsMeta: Record<
  TableColumnId,
  { id: TableColumnId; label: string; sortable?: string }
> = {
  netAddress: {
    id: 'netAddress',
    label: 'Address',
    sortable: 'ID',
  },
  publicKey: {
    id: 'publicKey',
    label: 'Public key',
    sortable: 'ID',
  },
  lastScan: {
    id: 'lastScan',
    label: 'Last scan',
    sortable: 'time',
  },
  totalScans: {
    id: 'totalScans',
    label: 'Total scans',
    sortable: 'counts',
  },
  knownSince: {
    id: 'knownSince',
    label: 'Known since',
    sortable: 'time',
  },
  uptime: {
    id: 'uptime',
    label: 'Uptime',
    sortable: 'counts',
  },
  downtime: {
    id: 'downtime',
    label: 'Downtime',
    sortable: 'counts',
  },
  successfulInteractions: {
    id: 'successfulInteractions',
    label: 'Successful interactions',
    sortable: 'counts',
  },
  failedInteractions: {
    id: 'failedInteractions',
    label: 'Failed interactions',
    sortable: 'counts',
  },
  totalInteractions: {
    id: 'totalInteractions',
    label: 'Total interactions',
    sortable: 'counts',
  },
}

export const columnsDefaultVisible: TableColumnId[] = [
  'netAddress',
  'publicKey',
  'lastScan',
  'totalScans',
  'knownSince',
  'uptime',
  'downtime',
  'successfulInteractions',
  'failedInteractions',
  'totalInteractions',
]

export const columnsDefaultSort = 'lastScan'
