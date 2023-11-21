import BigNumber from 'bignumber.js'

export type EventData = {
  id: string
  timestamp: number
  height?: number
  pending: boolean
  type: string
  fee?: BigNumber
  amountSc?: BigNumber
  amountSf?: number
  transactionId?: string
  contractId?: string
}

export type TableColumnId =
  // | 'actions'
  // | 'id'
  | 'type'
  | 'height'
  | 'timestamp'
  | 'amount'
  | 'fee'
  | 'transactionId'
  | 'contractId'

export const columnsDefaultVisible: TableColumnId[] = [
  // 'actions',
  // 'id',
  'type',
  'height',
  'timestamp',
  'amount',
  'fee',
]

export type SortField = 'id'

export const defaultSortField: SortField = 'id'

export const sortOptions: {
  id: SortField
  label: string
  category: string
}[] = [
  // {
  //   id: 'address',
  //   label: 'address',
  //   category: 'general',
  // },
]
