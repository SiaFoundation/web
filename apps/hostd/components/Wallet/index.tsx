import { BalanceEvolution, Table } from '@siafoundation/design-system'
import { useTransactions } from '../../contexts/transactions'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'
import { StateError } from './StateError'

export function Wallet() {
  const {
    balances,
    metrics,
    dataset,
    dataState,
    columns,
    cellContext,
    sortableColumns,
    sortDirection,
    sortField,
    toggleSort,
    defaultPageSize,
  } = useTransactions()

  return (
    <div className="flex flex-col gap-4 px-6 py-7 min-w-fit">
      {balances?.length && balances.find((b) => b.sc) ? (
        <BalanceEvolution
          balances={balances}
          isLoading={metrics.isValidating}
        />
      ) : null}
      <Table
        testId="eventsTable"
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
        pageSize={defaultPageSize}
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
