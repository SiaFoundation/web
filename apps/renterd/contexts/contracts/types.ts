import { ContractState } from '@siafoundation/react-renterd'
import BigNumber from 'bignumber.js'

export type ContractData = {
  id: string
  onClick: () => void
  hostIp: string
  hostKey: string
  state: ContractState
  location?: [number, number]
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
  size: BigNumber
}

export type TableColumnId =
  | 'actions'
  | 'contractId'
  | 'hostIp'
  | 'hostKey'
  | 'state'
  | 'timeline'
  | 'startTime'
  | 'endTime'
  | 'size'
  | 'totalCost'
  | 'spendingUploads'
  | 'spendingDownloads'
  | 'spendingFundAccount'

export const columnsDefaultVisible: TableColumnId[] = [
  'contractId',
  'hostIp',
  'hostKey',
  'state',
  'timeline',
  'size',
  'totalCost',
  'spendingUploads',
  'spendingDownloads',
  'spendingFundAccount',
]

export type SortField =
  | 'contractId'
  | 'hostIp'
  | 'hostKey'
  | 'state'
  | 'timeline'
  | 'startTime'
  | 'endTime'
  | 'size'
  | 'totalCost'
  | 'spendingUploads'
  | 'spendingDownloads'
  | 'spendingFundAccount'

export const defaultSortField: SortField = 'startTime'

export const sortOptions: {
  id: SortField
  label: string
  category: string
}[] = [
  {
    id: 'contractId',
    label: 'contract ID',
    category: 'general',
  },
  {
    id: 'hostIp',
    label: 'host address',
    category: 'general',
  },
  {
    id: 'hostKey',
    label: 'host public key',
    category: 'general',
  },
  {
    id: 'state',
    label: 'state',
    category: 'general',
  },
  {
    id: 'timeline',
    label: 'timeline',
    category: 'time',
  },
  {
    id: 'startTime',
    label: 'start date',
    category: 'time',
  },
  {
    id: 'endTime',
    label: 'end date',
    category: 'time',
  },
  {
    id: 'size',
    label: 'size',
    category: 'general',
  },
  {
    id: 'totalCost',
    label: 'total cost',
    category: 'financial',
  },
  {
    id: 'spendingUploads',
    label: 'uploads spending',
    category: 'financial',
  },
  {
    id: 'spendingDownloads',
    label: 'downloads spending',
    category: 'financial',
  },
  {
    id: 'spendingFundAccount',
    label: 'fund account spending',
    category: 'financial',
  },
]

export type ViewMode = 'list' | 'detail'

export type ChartContractKey =
  | 'uploadSpending'
  | 'listSpending'
  | 'deleteSpending'
  | 'fundAccountSpending'
  | 'remainingCollateral'
  | 'remainingFunds'

export type ChartContractCategory = 'funding' | 'spending'
