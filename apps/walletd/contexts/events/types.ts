import BigNumber from 'bignumber.js'

export type EventData = {
  id: string
  timestamp: number
  blockHeight: number
  pending: boolean
  type: string
  amount: BigNumber
}

export type TableColumnId = 'actions' | 'id' | 'type' | 'timestamp' | 'amount'

export const columnsDefaultVisible: TableColumnId[] = [
  'actions',
  'id',
  'type',
  'timestamp',
  'amount',
]

export type SortField = 'timestamp'

export const defaultSortField: SortField = 'timestamp'

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
