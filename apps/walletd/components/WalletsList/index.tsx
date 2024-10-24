import { Table } from '@siafoundation/design-system'
import { useWallets } from '../../contexts/wallets'
import { StateNoneYet } from './StateNoneYet'
import { StateNoneMatching } from './StateNoneMatching'
import { StateError } from './StateError'

export function WalletsList() {
  const {
    dataset,
    dataState,
    context,
    columns,
    sortableColumns,
    sortDirection,
    sortField,
    toggleSort,
  } = useWallets()

  return (
    <div className="px-6 py-7 min-w-fit">
      {dataState === 'noneYet' && <StateNoneYet />}
      {dataState !== 'noneYet' && (
        <Table
          testId="walletsTable"
          isLoading={dataState === 'loading'}
          emptyState={
            dataState === 'noneMatchingFilters' ? (
              <StateNoneMatching />
            ) : dataState === 'error' ? (
              <StateError />
            ) : null
          }
          pageSize={6}
          data={dataset}
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
