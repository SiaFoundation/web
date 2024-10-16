import { MouseEvent } from 'react'

export type KeyData = {
  id: string
  key: string
  secret: string
}

export type CellContext = {
  selectionMap: Record<string, KeyData>
  onSelect: (id: string, e: MouseEvent<HTMLButtonElement>) => void
  onSelectPage: () => void
  isPageAllSelected: boolean | 'indeterminate'
}

export type TableColumnId = 'selection' | 'actions' | 'key' | 'secret'

export const columnsDefaultVisible: TableColumnId[] = ['key', 'secret']

export type SortField = 'key' | 'secret'

export const defaultSortField: SortField = 'key'

export const sortOptions: {
  id: SortField
  label: string
  category: string
}[] = [
  {
    id: 'key',
    label: 'key',
    category: 'general',
  },
  {
    id: 'secret',
    label: 'secret',
    category: 'general',
  },
]
