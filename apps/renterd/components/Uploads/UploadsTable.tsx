import { Table } from '@siafoundation/design-system'
import { useUploads } from '../../contexts/uploads'
import { columns } from '../../contexts/uploads/columns'
import { EmptyState } from './EmptyState'

export function UploadsTable() {
  const {
    sortableColumns,
    toggleSort,
    datasetPage,
    dataState,
    sortField,
    sortDirection,
  } = useUploads()
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
