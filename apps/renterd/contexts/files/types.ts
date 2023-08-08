export type ObjectData = {
  id: string
  path: string
  name: string
  health?: number
  size: number
  isDirectory?: boolean
  isUploading?: boolean
  loaded?: number
}

export type TableColumnId = 'actions' | 'type' | 'name' | 'size' | 'health'

export const columnsDefaultVisible: TableColumnId[] = [
  'type',
  'name',
  'size',
  'health',
]

export type SortField = 'name'

export const defaultSortField: SortField = 'name'

export const sortOptions: { id: SortField; label: string; category: string }[] =
  [
    {
      id: 'name',
      label: 'name',
      category: 'general',
    },
  ]
