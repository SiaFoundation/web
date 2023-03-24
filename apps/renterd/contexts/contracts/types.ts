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

export const columnsMeta: Record<
  TableColumnId,
  { id: TableColumnId; label: string; sortable?: string; fixed?: boolean }
> = {
  actions: {
    id: 'actions',
    label: '',
    fixed: true,
  },
  contractId: {
    id: 'contractId',
    label: 'Contract ID',
    sortable: 'ID',
  },
  hostIp: {
    id: 'hostIp',
    label: 'Host address',
    sortable: 'ID',
  },
  hostKey: {
    id: 'hostKey',
    label: 'Host public key',
    sortable: 'ID',
  },
  timeline: {
    id: 'timeline',
    label: 'Timeline',
    sortable: 'time',
  },
  startTime: {
    id: 'startTime',
    label: 'Start date',
    sortable: 'time',
  },
  endTime: {
    id: 'endTime',
    label: 'End date',
    sortable: 'time',
  },
  totalCost: {
    id: 'totalCost',
    label: 'Total cost',
    sortable: 'financial',
  },
  spendingUploads: {
    id: 'spendingUploads',
    label: 'Spending: uploads',
    sortable: 'financial',
  },
  spendingDownloads: {
    id: 'spendingDownloads',
    label: 'Spending: downloads',
    sortable: 'financial',
  },
  spendingFundAccount: {
    id: 'spendingFundAccount',
    label: 'Spending: fund account',
    sortable: 'financial',
  },
}

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
