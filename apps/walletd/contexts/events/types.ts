import BigNumber from 'bignumber.js'

export type EventData = {
  id: string
  timestamp: number
  height?: number
  maturityHeight?: number
  pending: boolean
  type: string
  fee?: BigNumber
  amount?: BigNumber
  transactionId?: string
  contractId?: string
  outputId?: string
  netAddress?: string
  publicKey?: string
}

export type TableColumnId =
  // | 'actions'
  // | 'id'
  | 'type'
  | 'height'
  | 'maturityHeight'
  | 'timestamp'
  | 'amount'
  | 'fee'
  | 'transactionId'
  | 'contractId'
  | 'outputId'
  | 'netAddress'
  | 'publicKey'

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
