import { Table } from '@siafoundation/design-system'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'
import { StateError } from './StateError'
import { useKeys } from '../../contexts/keys'

export function Keys() {
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
  } = useKeys()

  return (
    <div className="p-6 min-w-fit">
      <Table
        testId="keysTable"
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
        sortableColumns={sortableColumns}
        pageSize={limit}
        data={datasetPage}
        context={cellContext}
        columns={columns}
        sortDirection={sortDirection}
        sortField={sortField}
        toggleSort={toggleSort}
        rowSize="default"
      />
    </div>
  )
}
