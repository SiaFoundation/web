import { WalletEvent } from '@siafoundation/walletd-types'
import BigNumber from 'bignumber.js'

export type CellContext = {
  siascanUrl: string
}

export type EventData = {
  id: string
  transactionId?: string
  timestamp: number
  height?: number
  maturityHeight?: number
  isMature?: boolean
  pending: boolean
  type: WalletEvent['type']
  fee?: BigNumber
  amountSc?: BigNumber
  amountSf?: number
  contractId?: string
  className?: string
}

export type TableColumnId =
  // | 'actions'
  | 'transactionId'
  | 'type'
  | 'height'
  | 'timestamp'
  | 'amount'
  | 'fee'
  | 'transactionId'
  | 'contractId'

export const columnsDefaultVisible: TableColumnId[] = [
  // 'actions',
  'transactionId',
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
