import { Table } from '@siafoundation/design-system'
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
    dataState,
    cellContext,
  } = useContracts()

  return (
    <div className="p-6 min-w-fit">
      <Table
        testId="contractsTable"
        context={cellContext}
        isLoading={dataState === 'loading'}
        emptyState={
          dataState === 'noneMatchingFilters' ? (
            <StateNoneMatching />
          ) : dataState === 'noneYet' ? (
            <StateNoneYet />
          ) : dataState === 'error' ? (
            <StateError />
          ) : null
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
