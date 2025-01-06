import { EmptyState, Table } from '@siafoundation/design-system'
import { useUploads } from '../../contexts/uploads'
import { StateNoneYet } from './StateNoneYet'
import { StateError } from './StateError'

export function UploadsTable() {
  const {
    activeData: { datasetPage },
    activeTableState: {
      visibleColumns,
      sortableColumns,
      toggleSort,
      sortField,
      sortDirection,
    },
    activeDatasetState,
  } = useUploads()
  return (
    <div className="relative">
      <Table
        testId="uploadsTable"
        isLoading={activeDatasetState === 'loading'}
        emptyState={
          <EmptyState
            datasetState={activeDatasetState}
            noneYet={<StateNoneYet />}
            error={<StateError />}
          />
        }
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
