import { useTableState } from '@siafoundation/design-system'
import {
  FilesTableColumn,
  columnsDefaultVisible,
  defaultSortField,
  sortOptions,
} from './types'

export function useFilesTableState(columns: FilesTableColumn[]) {
  return useTableState('renterd/v0/files', {
    columns,
    columnsDefaultVisible,
    sortOptions,
    defaultSortField,
  })
}