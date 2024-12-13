import { EmptyState, Table } from '@siafoundation/design-system'
import { useWallets } from '../../contexts/wallets'
import { StateNoneYet } from './StateNoneYet'
import { StateNoneMatching } from './StateNoneMatching'
import { StateError } from './StateError'

export function WalletsList() {
  const {
    datasetPage,
    datasetState,
    context,
    columns,
    sortableColumns,
    sortDirection,
    sortField,
    toggleSort,
  } = useWallets()

  return (
    <div className="px-6 py-7 min-w-fit">
      {datasetState === 'noneYet' && <StateNoneYet />}
      {datasetState !== 'noneYet' && (
        <Table
          testId="walletsTable"
          isLoading={datasetState === 'loading'}
          emptyState={
            <EmptyState
              datasetState={datasetState}
              noneMatching={<StateNoneMatching />}
              error={<StateError />}
            />
          }
          pageSize={6}
          data={datasetPage}
          context={context}
          columns={columns}
          sortableColumns={sortableColumns}
          sortDirection={sortDirection}
          sortField={sortField}
          toggleSort={toggleSort}
        />
      )}
    </div>
  )
}
