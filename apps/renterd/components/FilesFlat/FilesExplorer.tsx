import { Table } from '@siafoundation/design-system'
import { useFilesFlat } from '../../contexts/filesFlat'
import { columns } from '../../contexts/filesFlat/columns'
import { useFilesManager } from '../../contexts/filesManager'
import { EmptyState } from './EmptyState'

export function FilesExplorer() {
  const { sortableColumns, toggleSort } = useFilesManager()
  const { datasetPage, dataState, sortField, sortDirection } = useFilesFlat()
  return (
    <div className="relative">
      <Table
        isLoading={dataState === 'loading'}
        emptyState={<EmptyState />}
        pageSize={10}
        data={datasetPage}
        columns={columns}
        sortableColumns={sortableColumns}
        sortField={sortField}
        sortDirection={sortDirection}
        toggleSort={toggleSort}
        rowSize="dense"
      />
    </div>
  )
}
