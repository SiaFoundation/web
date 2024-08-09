import { TxType } from '@siafoundation/units'
import { WalletEventType } from '@siafoundation/types'
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
  type: WalletEventType
  txType: TxType
  fee?: BigNumber
  amountSc?: BigNumber
  amountSf?: number
  contractId?: string
  className?: string
}

export type TableColumnId =
  | 'transactionId'
  | 'type'
  | 'height'
  | 'timestamp'
  | 'amount'
  | 'fee'
  | 'transactionId'
  | 'contractId'

export const columnsDefaultVisible: TableColumnId[] = [
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
}[] = []
