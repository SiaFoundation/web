import { Wallet, WalletMetadata } from '@siafoundation/walletd-react'

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
    status: 'unlocked' | 'locked'
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
  | 'details'
  | 'balance'
  | 'type'
  | 'status'
  | 'createdAt'

export const columnsDefaultVisible: TableColumnId[] = [
  'actions',
  'details',
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
}[] = [
  {
    id: 'name',
    label: 'name',
    category: 'general',
  },
  {
    id: 'type',
    label: 'type',
    category: 'general',
  },
  {
    id: 'status',
    label: 'status',
    category: 'general',
  },
  {
    id: 'createdAt',
    label: 'created on',
    category: 'general',
  },
]
