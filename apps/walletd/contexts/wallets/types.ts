import { Wallet, WalletMetadata } from '@siafoundation/walletd-types'

export type WalletData = {
  id: string
  name?: string
  description?: string
  createdAt?: number
  updatedAt?: number
  metadata: WalletMetadata
  state: {
    mnemonic?: string
    activityAt?: number
    status: 'unlocked' | 'locked' | 'n/a'
  }
  actions: {
    unlock: () => void
    lock: () => void
  }
  raw?: Wallet
  onClick?: () => void
}

export type TableColumnId =
  | 'actions'
  | 'name'
  | 'balance'
  | 'type'
  | 'status'
  | 'createdAt'

export const columnsDefaultVisible: TableColumnId[] = [
  'actions',
  'name',
  'balance',
  'type',
  'status',
  'createdAt',
]

export type SortField = 'name' | 'type' | 'status' | 'createdAt'

export const defaultSortField: SortField = 'name'

export const sortOptions: {
  id: SortField
  label: string
  category: string
  dataKey:
    | keyof WalletData
    | ['state', keyof WalletData['state']]
    | ['metadata', keyof WalletData['metadata']]
}[] = [
  {
    id: 'name',
    label: 'name',
    category: 'general',
    dataKey: 'name',
  },
  {
    id: 'type',
    label: 'type',
    category: 'general',
    dataKey: ['metadata', 'type'],
  },
  {
    id: 'status',
    label: 'status',
    category: 'general',
    dataKey: ['state', 'status'],
  },
  {
    id: 'createdAt',
    label: 'created on',
    category: 'general',
    dataKey: 'createdAt',
  },
]
