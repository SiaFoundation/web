export type WalletType = 'seed' | 'watch' | 'ledger'

export type WalletData = {
  id: string
  name?: string
  description?: string
  type?: WalletType
  seed?: string
  activityAt?: number
  status: 'unlocked' | 'locked'
  seedHash?: string
  createdAt?: number
  unlock: () => void
  lock: () => void
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
