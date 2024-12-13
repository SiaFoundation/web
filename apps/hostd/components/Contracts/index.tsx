import { EmptyState, Table } from '@siafoundation/design-system'
import { useContracts } from '../../contexts/contracts'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'
import { StateError } from './StateError'

export function Contracts() {
  const {
    columns,
    datasetPage,
    sortField,
    sortDirection,
    sortableColumns,
    toggleSort,
    limit,
    datasetState,
    cellContext,
  } = useContracts()

  return (
    <div className="p-6 min-w-fit">
      <Table
        testId="contractsTable"
        context={cellContext}
        isLoading={datasetState === 'loading'}
        emptyState={
          <EmptyState
            datasetState={datasetState}
            noneMatching={<StateNoneMatching />}
            noneYet={<StateNoneYet />}
            error={<StateError />}
          />
        }
        pageSize={limit}
        data={datasetPage}
        columns={columns}
        sortableColumns={sortableColumns}
        sortDirection={sortDirection}
        sortField={sortField}
        toggleSort={toggleSort}
      />
    </div>
  )
}
