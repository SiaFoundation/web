import { Table } from '@siafoundation/design-system'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'
import { StateError } from './StateError'
import { useAlerts } from '../../contexts/alerts'

export function Alerts() {
  const {
    visibleColumns,
    datasetPage,
    sortField,
    sortDirection,
    sortableColumns,
    toggleSort,
    limit,
    datasetState,
  } = useAlerts()

  return (
    <div className="p-6 min-w-fit">
      <Table
        isLoading={datasetState === 'loading'}
        emptyState={
          datasetState === 'noneMatchingFilters' ? (
            <StateNoneMatching />
          ) : datasetState === 'noneYet' ? (
            <StateNoneYet />
          ) : datasetState === 'error' ? (
            <StateError />
          ) : null
        }
        sortableColumns={sortableColumns}
        pageSize={limit}
        data={datasetPage}
        columns={visibleColumns}
        sortDirection={sortDirection}
        sortField={sortField}
        toggleSort={toggleSort}
        rowSize="auto"
      />
    </div>
  )
}
