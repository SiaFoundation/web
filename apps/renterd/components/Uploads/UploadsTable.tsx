import { Table } from '@siafoundation/design-system'
import { EmptyState } from './EmptyState'
import { useUploads } from '../../contexts/uploads'

export function UploadsTable() {
  const {
    visibleColumns,
    sortableColumns,
    toggleSort,
    datasetPage,
    datasetState,
    sortField,
    sortDirection,
  } = useUploads()
  return (
    <div className="relative">
      <Table
        testId="uploadsTable"
        isLoading={datasetState === 'loading'}
        emptyState={<EmptyState />}
        pageSize={10}
        data={datasetPage}
        columns={visibleColumns}
        sortableColumns={sortableColumns}
        sortField={sortField}
        sortDirection={sortDirection}
        toggleSort={toggleSort}
        rowSize="dense"
      />
    </div>
  )
}
