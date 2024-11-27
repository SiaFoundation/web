import { ContractState, ContractUsability } from '@siafoundation/renterd-types'
import BigNumber from 'bignumber.js'
import { useFilteredStats } from './useFilteredStats'
import { MultiSelect } from '@siafoundation/design-system'

export type ContractTableContext = {
  currentHeight: number
  contractsTimeRange: {
    startHeight: number
    endHeight: number
  }
  siascanUrl: string
  // prunable
  hasFetchedAllPrunableSize: boolean
  fetchPrunableSizeAll: () => void
  isFetchingPrunableSizeAll: boolean
  // totals
  filteredStats: ReturnType<typeof useFilteredStats>
  multiSelect: MultiSelect<ContractData>
}

export type ContractData = {
  id: string
  hostIp: string
  hostKey: string
  state: ContractState
  location?: [number, number]
  usability: ContractUsability
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
  initialRenterFunds: BigNumber
  spendingUploads: BigNumber
  spendingDeletions: BigNumber
  spendingSectorRoots: BigNumber
  spendingFundAccount: BigNumber
  size: BigNumber

  // selectable
  onClick: (e: React.MouseEvent<HTMLTableRowElement>) => void
  isSelected: boolean

  // prunable
  prunableSize?: BigNumber
  isFetchingPrunableSize: boolean
  hasFetchedPrunableSize: boolean
  fetchPrunableSize: () => void
}

export type ContractDataWithoutPrunable = Omit<
  ContractData,
  | 'prunableSize'
  | 'isFetchingPrunableSize'
  | 'hasFetchedPrunableSize'
  | 'fetchPrunableSize'
>

export type TableColumnId =
  | 'actions'
  | 'contractId'
  | 'usability'
  | 'hostIp'
  | 'hostKey'
  | 'state'
  | 'timeline'
  | 'startTime'
  | 'endTime'
  | 'size'
  | 'prunableSize'
  | 'initialRenterFunds'
  | 'spendingUploads'
  | 'spendingDeletions'
  | 'spendingFundAccount'
  | 'spendingSectorRoots'

export const columnsDefaultVisible: TableColumnId[] = [
  'contractId',
  'usability',
  'hostIp',
  'hostKey',
  'state',
  'timeline',
  'size',
  'prunableSize',
  'initialRenterFunds',
  'spendingUploads',
  'spendingDeletions',
  'spendingFundAccount',
  'spendingSectorRoots',
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
  | 'prunableSize'
  | 'initialRenterFunds'
  | 'spendingUploads'
  | 'spendingDeletions'
  | 'spendingFundAccount'
  | 'spendingSectorRoots'

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
    id: 'prunableSize',
    label: 'prunable size',
    category: 'general',
  },
  {
    id: 'initialRenterFunds',
    label: 'initial renter funds',
    category: 'financial',
  },
  {
    id: 'spendingUploads',
    label: 'uploads spending',
    category: 'financial',
  },
  {
    id: 'spendingDeletions',
    label: 'deletions spending',
    category: 'financial',
  },
  {
    id: 'spendingFundAccount',
    label: 'fund account spending',
    category: 'financial',
  },
  {
    id: 'spendingSectorRoots',
    label: 'sector roots spending',
    category: 'financial',
  },
]

export type ViewMode = 'list' | 'detail'
export type GraphMode = 'spending'

export type ChartContractKey =
  | 'uploadSpending'
  | 'listSpending'
  | 'deleteSpending'
  | 'fundAccountSpending'
  | 'remainingCollateral'
  | 'remainingFunds'

export type ChartContractCategory = 'funding' | 'spending'

export type ChartContractsKey = 'contracts'

export type ChartContractsCategory = never
