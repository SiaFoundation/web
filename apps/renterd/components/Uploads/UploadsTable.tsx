import { Table } from '@siafoundation/design-system'
import { EmptyState } from './EmptyState'
import { columns } from '../../contexts/uploads/columns'
import { useUploads } from '../../contexts/uploads'

export function UploadsTable() {
  const {
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
        isLoading={datasetState === 'loading'}
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
