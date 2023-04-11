import { AutopilotHost } from '@siafoundation/react-renterd'
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
  gougingBreakdown: {
    v2: {
      contractErr?: string
      downloadErr?: string
      gougingErr?: string
      uploadErr?: string
    }
    v3: {
      contractErr?: string
      downloadErr?: string
      gougingErr?: string
      uploadErr?: string
    }
  }
  priceTable?: AutopilotHost['host']['priceTable']
  settings?: AutopilotHost['host']['settings']
  gouging: boolean
  usable: boolean
  activeContracts: BigNumber
}

const generalColumns = [
  'actions',
  'allow',
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

export type TableColumnId =
  | HostTableColumnGeneral
  | HostTableColumnAutopilot
  | HostTableColumnPriceTable
  | HostTableColumnSettings

export const columnsDefaultVisible: TableColumnId[] = [
  'allow',
  'netAddress',
  'publicKey',
  'lastScan',
  'knownSince',
  'totalScans',
  'uptime',
  'hasContract',
  'ap_usable',
  'ap_scoreOverall',
]

export const columnsDefaultSort = 'lastScan'
