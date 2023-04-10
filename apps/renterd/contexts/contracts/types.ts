import BigNumber from 'bignumber.js'

export type ContractData = {
  id: string
  hostIp: string
  hostKey: string
  isRenewed: boolean
  renewedFrom: string
  timeline: number
  startTime: number
  endTime: number
  contractHeightStart: number
  contractHeightEnd: number
  proofWindowHeightStart: number
  proofWindowHeightEnd: number
  proofHeight: number
  revisionHeight: number
  totalCost: BigNumber
  spendingUploads: BigNumber
  spendingDownloads: BigNumber
  spendingFundAccount: BigNumber
}

export type TableColumnId =
  | 'actions'
  | 'contractId'
  | 'hostIp'
  | 'hostKey'
  | 'timeline'
  | 'startTime'
  | 'endTime'
  | 'totalCost'
  | 'spendingUploads'
  | 'spendingDownloads'
  | 'spendingFundAccount'

export const columnsDefaultVisible: TableColumnId[] = [
  'contractId',
  'hostIp',
  'hostKey',
  'timeline',
  'totalCost',
  'spendingUploads',
  'spendingDownloads',
  'spendingFundAccount',
]

export const columnsDefaultSort = 'startTime'
