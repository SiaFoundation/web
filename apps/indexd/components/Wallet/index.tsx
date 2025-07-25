import { EmptyState, Table } from '@siafoundation/design-system'
import { useTransactions } from '../../contexts/transactions'
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
    defaultPageSize,
  } = useTransactions()

  return (
    <div className="flex flex-col gap-4 px-6 py-7 min-w-fit">
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
        pageSize={defaultPageSize}
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
