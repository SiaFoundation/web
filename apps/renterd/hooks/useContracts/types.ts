import BigNumber from 'bignumber.js'
import groupBy from 'lodash/groupBy'
import filter from 'lodash/filter'

export type ContractData = {
  id: string
  hostIp: string
  hostKey: string
  isRenewed: boolean
  renewedFrom: string
  timeline: number
  startTime: number
  endTime: number
  startHeight: number
  endHeight: number
  totalCost: BigNumber
  spendingUploads: BigNumber
  spendingDownloads: BigNumber
  spendingFundAccount: BigNumber
}

export type TableColumnId =
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
// | 'proofWindowDate'
// | 'expirationDate'
// | 'dataSize'
// | 'contractFee'
// | 'storagePrice'
// | 'uploadPrice'
// | 'downloadPrice'

export const columnMetadata: Record<
  TableColumnId,
  { id: TableColumnId; label: string; sortable?: string }
> = {
  contractId: {
    id: 'contractId',
    label: 'Contract ID',
    sortable: 'ID',
  },
  hostIp: {
    id: 'hostIp',
    label: 'Host IP',
    sortable: 'ID',
  },
  hostKey: {
    id: 'hostKey',
    label: 'Host key',
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

export const sortOptions = groupBy(
  filter(columnMetadata, 'sortable'),
  'sortable'
)

export const defaultColumns: TableColumnId[] = [
  'contractId',
  'hostIp',
  'timeline',
  'totalCost',
  'spendingUploads',
  'spendingDownloads',
  'spendingFundAccount',
]
