import { EmptyState, Table } from '@siafoundation/design-system'
import { useEvents } from '../../contexts/events'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'
import { StateError } from './StateError'

export function Wallet() {
  const {
    datasetPage,
    datasetState,
    visibleColumns,
    cellContext,
    sortableColumns,
    sortDirection,
    sortField,
    toggleSort,
  } = useEvents()

  return (
    <div className="px-6 py-7 min-w-fit">
      <Table
        testId="eventsTable"
        isLoading={datasetState === 'loading'}
        emptyState={
          <EmptyState
            datasetState={datasetState}
            noneMatching={<StateNoneMatching />}
            noneYet={<StateNoneYet />}
            error={<StateError />}
          />
        }
        pageSize={6}
        data={datasetPage}
        context={cellContext}
        columns={visibleColumns}
        sortableColumns={sortableColumns}
        sortDirection={sortDirection}
        sortField={sortField}
        toggleSort={toggleSort}
      />
    </div>
  )
}
