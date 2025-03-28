import {
  HostPriceTable,
  HostSettings,
  V2HostSettings,
} from '@siafoundation/types'
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
  netAddress: string
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
  priceTable: HostPriceTable
  settings: HostSettings
  v2Settings: V2HostSettings
  v2: boolean
  activeContractsCount: BigNumber
  activeContracts: ContractData[]

  // Merged in from explored API.
  location?: Location

  onClick: (e: React.MouseEvent<HTMLTableRowElement>) => void
  isSelected: boolean
}

export type HostDataWithoutSelectable = Omit<HostData, 'isSelected' | 'onClick'>

const generalColumns = [
  'actions',
  'allow',
  'netAddress',
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

const v2SettingsColumns = [
  'v2_acceptingContracts',
  'v2_maxCollateral',
  'v2_maxContractDuration',
  'v2_remainingStorage',
  'v2_totalStorage',
  'v2_storagePrice',
  'v2_contractPrice',
  'v2_collateral',
  'v2_ingressPrice',
  'v2_egressPrice',
] as const

const priceTableColumns = [
  'hpt_accountbalancecost',
  'hpt_collateralcost',
  'hpt_contractprice',
  'hpt_downloadbandwidthcost',
  'hpt_dropsectorsbasecost',
  'hpt_dropsectorsunitcost',
  'hpt_expiry',
  'hpt_fundaccountcost',
  'hpt_hassectorbasecost',
  'hpt_hostblockheight',
  'hpt_initbasecost',
  'hpt_latestrevisioncost',
  'hpt_maxcollateral',
  'hpt_maxduration',
  'hpt_memorytimecost',
  'hpt_readbasecost',
  'hpt_readlengthcost',
  'hpt_registryentriesleft',
  'hpt_registryentriestotal',
  'hpt_renewcontractcost',
  'hpt_revisionbasecost',
  'hpt_subscriptionmemorycost',
  'hpt_subscriptionnotificationcost',
  'hpt_swapsectorcost',
  'hpt_txnfeemaxrecommended',
  'hpt_txnfeeminrecommended',
  'hpt_uid',
  'hpt_updatepricetablecost',
  'hpt_uploadbandwidthcost',
  'hpt_validity',
  'hpt_windowsize',
  'hpt_writebasecost',
  'hpt_writelengthcost',
  'hpt_writestorecost',
] as const

const settingsColumns = [
  'hs_acceptingcontracts',
  'hs_baserpcprice',
  'hs_collateral',
  'hs_contractprice',
  'hs_downloadbandwidthprice',
  'hs_ephemeralaccountexpiry',
  'hs_maxcollateral',
  'hs_maxdownloadbatchsize',
  'hs_maxduration',
  'hs_maxephemeralaccountbalance',
  'hs_maxrevisebatchsize',
  'hs_netaddress',
  'hs_remainingstorage',
  'hs_revisionnumber',
  'hs_sectoraccessprice',
  'hs_sectorsize',
  'hs_siamuxport',
  'hs_storageprice',
  'hs_totalstorage',
  'hs_unlockhash',
  'hs_uploadbandwidthprice',
  'hs_version',
  'hs_windowsize',
] as const

export type HostTableColumnGeneral = typeof generalColumns[number]
export type HostTableColumnAutopilot = typeof autopilotColumns[number]
export type HostTableColumnPriceTable = typeof priceTableColumns[number]
export type HostTableColumnSettings = typeof settingsColumns[number]
export type HostTableColumnV2Settings = typeof v2SettingsColumns[number]

export type TableColumnId =
  | HostTableColumnGeneral
  | HostTableColumnAutopilot
  | HostTableColumnV2Settings
  | HostTableColumnPriceTable
  | HostTableColumnSettings

export const columnsDefaultVisible: TableColumnId[] = [
  'allow',
  'netAddress',
  'publicKey',
  'lastScan',
  'lastAnnouncement',
  'totalScans',
  'uptime',
  'hasContract',
  'ap_usable',
  'ap_scoreOverall',
  'v2_remainingStorage',
  'v2_totalStorage',
  'v2_storagePrice',
  'v2_ingressPrice',
  'v2_egressPrice',
]

// export type SortField = never

// export const defaultSortField: SortField = undefined

// export const sortOptions: { id: SortField; label: string; category: string }[] =
//   []

export type ViewMode = 'list' | 'map'

export type HostDataWithLocation = HostData & {
  location: Location
}
