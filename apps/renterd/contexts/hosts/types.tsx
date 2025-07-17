import { HostSettings, V2HostSettings } from '@siafoundation/types'
import BigNumber from 'bignumber.js'
import { ContractData } from '../contracts/types'
import { MultiSelect } from '@siafoundation/design-system'
import { Location } from '@siafoundation/explored-types'

export type HostContext = {
  siascanUrl: string
  multiSelect: MultiSelect<HostData>
}

export type HostData = {
  id: string
  isOnAllowlist: boolean
  isOnBlocklist: boolean
  isBlocked: boolean
  address: string
  publicKey: string
  lastScanSuccess: boolean
  lastScan?: string
  lastAnnouncement?: string
  knownSince?: string
  uptime: BigNumber
  downtime: BigNumber
  successfulInteractions: BigNumber
  failedInteractions: BigNumber
  totalInteractions: BigNumber
  totalScans: BigNumber
  // autopilot
  scoreBreakdown: {
    age: BigNumber
    collateral: BigNumber
    interactions: BigNumber
    storageRemaining: BigNumber
    prices: BigNumber
    uptime: BigNumber
    version: BigNumber
  }
  gougingBreakdown: {
    contractErr?: string
    downloadErr?: string
    gougingErr?: string
    uploadErr?: string
    pruneErr?: string
  }
  usabilityBreakdown: {
    blocked: boolean
    gouging: boolean
    lowScore: boolean
    notAcceptingContracts: boolean
    notAnnounced: boolean
    notCompletingScan: boolean
    offline: boolean
    redundantIP: boolean
  }
  score: BigNumber
  isGouging: boolean
  isUsable: boolean
  unusableReasons: string[]
  v2Settings: V2HostSettings
  v2: boolean
  v1Settings: HostSettings
  activeContractsCount: BigNumber
  activeContracts: ContractData[]

  // Merged in from explored API.
  location?: Location

  onClick: (e: React.MouseEvent<HTMLTableRowElement>) => void
  isSelected: boolean
}

export type HostDataWithoutSelectable = Omit<HostData, 'isSelected' | 'onClick'>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const generalColumns = [
  'actions',
  'allow',
  'address',
  'publicKey',
  'lastScan',
  'totalScans',
  'lastAnnouncement',
  'uptime',
  'downtime',
  'successfulInteractions',
  'failedInteractions',
  'totalInteractions',
  'hasContract',
  'contractCount',
] as const

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const autopilotColumns = [
  'ap_usable',
  'ap_gouging',
  'ap_scoreOverall',
  'ap_scoreAge',
  'ap_scoreCollateral',
  'ap_scoreInteractions',
  'ap_scorePrices',
  'ap_scoreStorageRemaining',
  'ap_scoreUptime',
  'ap_scoreVersion',
] as const

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const settingsColumns = [
  'settings_acceptingContracts',
  'settings_maxCollateral',
  'settings_maxContractDuration',
  'settings_remainingStorage',
  'settings_totalStorage',
  'settings_storagePrice',
  'settings_contractPrice',
  'settings_collateral',
  'settings_ingressPrice',
  'settings_egressPrice',
] as const

export type HostTableColumnGeneral = typeof generalColumns[number]
export type HostTableColumnAutopilot = typeof autopilotColumns[number]
export type HostTableColumnV2Settings = typeof settingsColumns[number]

export type TableColumnId =
  | HostTableColumnGeneral
  | HostTableColumnAutopilot
  | HostTableColumnV2Settings

export const columnsDefaultVisible: TableColumnId[] = [
  'allow',
  'address',
  'publicKey',
  'lastScan',
  'lastAnnouncement',
  'totalScans',
  'uptime',
  'hasContract',
  'ap_usable',
  'ap_scoreOverall',
  'settings_remainingStorage',
  'settings_totalStorage',
  'settings_storagePrice',
  'settings_ingressPrice',
  'settings_egressPrice',
]

// export type SortField = never

// export const defaultSortField: SortField = undefined

// export const sortOptions: { id: SortField; label: string; category: string }[] =
//   []

export type ViewMode = 'list' | 'map'

export type HostDataWithLocation = HostData & {
  location: Location
}
