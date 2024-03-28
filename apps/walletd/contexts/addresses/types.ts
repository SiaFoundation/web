import { WalletAddress } from '@siafoundation/react-walletd'
import { UnlockConditions } from '@siafoundation/types'

export type CellContext = {
  siascanUrl: string
}

export type AddressMetadata = {
  index?: number
  unlockConditions?: UnlockConditions
}

export type AddressData = {
  id: string
  address: string
  description?: string
  spendPolicy?: string
  metadata: AddressMetadata
  walletId: string
  raw?: WalletAddress
  onClick?: () => void
}

export type TableColumnId = 'actions' | 'address' | 'index'

export const columnsDefaultVisible: TableColumnId[] = [
  'actions',
  'address',
  'index',
]

export type SortField = 'address' | 'index'

export const defaultSortField: SortField = 'index'

export const sortOptions: {
  id: SortField
  label: string
  category: string
}[] = [
  {
    id: 'address',
    label: 'address',
    category: 'general',
  },
  {
    id: 'index',
    label: 'index',
    category: 'general',
  },
]
