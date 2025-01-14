import { Table } from '@siafoundation/design-system'
import { EmptyState } from './EmptyState'
import { useFilesFlat } from '../../contexts/filesFlat'

export function FilesExplorer() {
  const { datasetPage, datasetState, cellContext, tableState } = useFilesFlat()
  return (
    <div className="relative">
      <Table
        testId="filesTable"
        isLoading={datasetState === 'loading'}
        emptyState={<EmptyState />}
        pageSize={10}
        data={datasetPage}
        context={cellContext}
        columns={tableState.visibleColumns}
        sortableColumns={tableState.sortableColumns}
        sortField={tableState.sortField}
        sortDirection={tableState.sortDirection}
        toggleSort={tableState.toggleSort}
        rowSize="dense"
      />
    </div>
  )
}
