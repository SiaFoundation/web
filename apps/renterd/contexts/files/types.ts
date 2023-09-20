import { FullPath } from './paths'

export type ObjectType = 'bucket' | 'directory' | 'file'

export type ObjectData = {
  id: FullPath
  // path is exacty bucket + returned key
  // eg: default + /path/to/file.txt = default/path/to/file.txt
  path: FullPath
  bucket: string
  name: string
  health?: number
  size: number
  type: ObjectType
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
