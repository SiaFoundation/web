import { Bucket } from '@siafoundation/react-renterd'
import { FullPath } from './paths'

export type ObjectType = 'bucket' | 'directory' | 'file'

export type ObjectData = {
  id: FullPath
  // path is exacty bucket + returned key
  // eg: default + /path/to/file.txt = default/path/to/file.txt
  path: FullPath
  bucket: Bucket
  name: string
  health?: number
  size: number
  type: ObjectType
  isUploading?: boolean
  loaded?: number
}

export type TableColumnId =
  | 'actions'
  | 'type'
  | 'name'
  | 'readAccess'
  | 'size'
  | 'health'

export const columnsDefaultVisible: TableColumnId[] = [
  'type',
  'name',
  'readAccess',
  'size',
  'health',
]

export type SortField = 'name' | 'health' | 'size'

export const defaultSortField: SortField = 'name'

export const sortOptions: { id: SortField; label: string; category: string }[] =
  [
    {
      id: 'name',
      label: 'name',
      category: 'general',
    },
    {
      id: 'health',
      label: 'health',
      category: 'general',
    },
    {
      id: 'size',
      label: 'size',
      category: 'general',
    },
  ]
