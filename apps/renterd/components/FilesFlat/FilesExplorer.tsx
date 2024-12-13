import { Table } from '@siafoundation/design-system'
import { EmptyState } from './EmptyState'
import { useFilesFlat } from '../../contexts/filesFlat'
import { useFilesManager } from '../../contexts/filesManager'
import { columns } from '../../contexts/filesFlat/columns'

export function FilesExplorer() {
  const { sortableColumns, toggleSort } = useFilesManager()
  const { datasetPage, datasetState, cellContext, sortField, sortDirection } =
    useFilesFlat()
  return (
    <div className="relative">
      <Table
        testId="filesTable"
        isLoading={datasetState === 'loading'}
        emptyState={<EmptyState />}
        pageSize={10}
        data={datasetPage}
        context={cellContext}
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
