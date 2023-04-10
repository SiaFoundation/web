export type ObjectData = {
  id: string
  path: string
  name: string
  health?: number
  isDirectory?: boolean
  isUploading?: boolean
  loaded?: number
  total?: number
}

export type TableColumnId =
  | 'actions'
  | 'type'
  | 'name'
  | 'size'
  | 'health'
  | 'slabs'
  | 'shards'

export const columnsDefaultVisible: TableColumnId[] = [
  'type',
  'name',
  'size',
  'health',
]

export const columnsDefaultSort = 'type'
