import { EmptyState, Table } from '@siafoundation/design-system'
import { useTransactions } from '../../contexts/transactions'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'
import { StateError } from './StateError'

export function Wallet() {
  const {
    dataset,
    visibleColumns,
    cellContext,
    sortableColumns,
    sortDirection,
    sortField,
    toggleSort,
    defaultPageSize,
  } = useTransactions()

  return (
    <div className="flex flex-col gap-4 px-6 py-7 min-w-fit">
      <Table
        testId="eventsTable"
        isLoading={dataset.state === 'loading'}
        emptyState={
          <EmptyState
            datasetState={dataset.state}
            noneMatching={<StateNoneMatching />}
            noneYet={<StateNoneYet />}
            error={<StateError />}
          />
        }
        pageSize={defaultPageSize}
        data={dataset.data}
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
