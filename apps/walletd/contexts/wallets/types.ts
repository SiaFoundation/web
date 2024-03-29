import { Wallet } from '@siafoundation/react-walletd'

export type WalletType = 'seed' | 'watch' | 'ledger'

export type WalletMetadata = {
  type: WalletType
  seedHash?: string
}

export type WalletData = {
  id: string
  name?: string
  description?: string
  createdAt?: number
  updatedAt?: number
  metadata: WalletMetadata
  state: {
    seed?: string
    activityAt?: number
    status: 'unlocked' | 'locked'
  }
  actions: {
    unlock: () => void
    lock: () => void
  }
  raw?: Wallet
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
