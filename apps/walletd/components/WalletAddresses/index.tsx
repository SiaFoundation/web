import { EmptyState, Table } from '@siafoundation/design-system'
import { useAddresses } from '../../contexts/addresses'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'
import { StateError } from './StateError'

export function WalletAddresses() {
  const {
    datasetPage,
    datasetState,
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
        columns={columns}
        sortableColumns={sortableColumns}
        sortDirection={sortDirection}
        sortField={sortField}
        toggleSort={toggleSort}
      />
    </div>
  )
}
