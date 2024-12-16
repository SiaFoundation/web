import { EmptyState, Table } from '@siafoundation/design-system'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'
import { StateError } from './StateError'
import { useKeys } from '../../contexts/keys'

export function Keys() {
  const {
    visibleColumns,
    datasetPage,
    sortField,
    sortDirection,
    sortableColumns,
    toggleSort,
    limit,
    datasetState,
    cellContext,
  } = useKeys()

  return (
    <div className="p-6 min-w-fit">
      <Table
        testId="keysTable"
        isLoading={datasetState === 'loading'}
        emptyState={
          <EmptyState
            datasetState={datasetState}
            noneMatching={<StateNoneMatching />}
            noneYet={<StateNoneYet />}
            error={<StateError />}
          />
        }
        sortableColumns={sortableColumns}
        pageSize={limit}
        data={datasetPage}
        context={cellContext}
        columns={visibleColumns}
        sortDirection={sortDirection}
        sortField={sortField}
        toggleSort={toggleSort}
        rowSize="default"
      />
    </div>
  )
}
