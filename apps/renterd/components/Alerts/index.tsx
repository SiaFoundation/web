import { Table } from '@siafoundation/design-system'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'
import { StateError } from './StateError'
import { useAlerts } from '../../contexts/alerts'

export function Alerts() {
  const {
    columns,
    datasetPage,
    sortField,
    sortDirection,
    sortableColumns,
    toggleSort,
    limit,
    dataState,
  } = useAlerts()

  return (
    <div className="p-6 min-w-fit">
      <Table
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
        columns={columns}
        sortDirection={sortDirection}
        sortField={sortField}
        toggleSort={toggleSort}
        rowSize="auto"
      />
    </div>
  )
}
