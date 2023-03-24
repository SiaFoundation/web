import BigNumber from 'bignumber.js'

export type HostData = {
  id: string
  isOnAllowlist: boolean
  isOnBlocklist: boolean
  isBlocked: boolean
  netAddress: string
  publicKey: string
  lastScanSuccess: boolean
  lastScan: string
  knownSince: string
  uptime: BigNumber
  downtime: BigNumber
  successfulInteractions: BigNumber
  failedInteractions: BigNumber
  totalInteractions: BigNumber
  totalScans: BigNumber
  // autopilot
  score: BigNumber
  scoreBreakdown: {
    age: BigNumber
    collateral: BigNumber
    interactions: BigNumber
    storageRemaining: BigNumber
    prices: BigNumber
    uptime: BigNumber
    version: BigNumber
  }
  unusableReasons: string[]
  usable: boolean
  activeContracts: BigNumber
}

export type TableColumnId =
  | 'actions'
  | 'allow'
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
  | 'activeContracts'
  | 'usable'
  | 'scoreOverall'
  | 'scoreAge'
  | 'scoreCollateral'
  | 'scoreInteractions'
  | 'scorePrices'
  | 'scoreStorageRemaining'
  | 'scoreUptime'
  | 'scoreVersion'

export const columnsMeta: Record<
  TableColumnId,
  {
    id: TableColumnId
    label: string
    sortable?: string
    fixed?: boolean
    category?: string
  }
> = {
  actions: {
    id: 'actions',
    label: '',
    fixed: true,
  },
  allow: {
    id: 'allow',
    label: 'Allowed',
  },
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
  usable: {
    id: 'usable',
    label: 'Usable',
    category: 'autopilot',
  },
  activeContracts: {
    id: 'activeContracts',
    label: 'Active contracts',
  },
  scoreOverall: {
    id: 'scoreOverall',
    label: 'Score: overall',
    category: 'autopilot',
  },
  scoreAge: {
    id: 'scoreAge',
    label: 'Score: age',
    category: 'autopilot',
  },
  scoreCollateral: {
    id: 'scoreCollateral',
    label: 'Score: collateral',
    category: 'autopilot',
  },
  scoreInteractions: {
    id: 'scoreInteractions',
    label: 'Score: interactions',
    category: 'autopilot',
  },
  scorePrices: {
    id: 'scorePrices',
    label: 'Score: prices',
    category: 'autopilot',
  },
  scoreStorageRemaining: {
    id: 'scoreStorageRemaining',
    label: 'Score: storage remaining',
    category: 'autopilot',
  },
  scoreUptime: {
    id: 'scoreUptime',
    label: 'Score: uptime',
    category: 'autopilot',
  },
  scoreVersion: {
    id: 'scoreVersion',
    label: 'Score: version',
    category: 'autopilot',
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
  'allow',
  'netAddress',
  'publicKey',
  'lastScan',
  'knownSince',
  'totalScans',
  'uptime',
  'activeContracts',
  'usable',
  'scoreOverall',
]

export const columnsDefaultSort = 'lastScan'
