import { Table } from '@siafoundation/design-system'
import { useAddresses } from '../../contexts/addresses'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'
import { StateError } from './StateError'

export function WalletAddresses() {
  const {
    dataset,
    dataState,
    columns,
    cellContext,
    sortableColumns,
    sortDirection,
    sortField,
    toggleSort,
  } = useAddresses()

  return (
    <div className="px-6 py-7 min-w-fit">
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
        pageSize={6}
        data={dataset}
        context={cellContext}
        columns={columns}
        sortableColumns={sortableColumns}
        sortDirection={sortDirection}
        sortField={sortField}
        toggleSort={toggleSort}
      />
    </div>
  )
}
