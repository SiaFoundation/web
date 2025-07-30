import { EmptyState, ScrollArea, Table } from '@siafoundation/design-system'
import { useContracts } from '../../contexts/contracts'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'
import { StateError } from './StateError'
import { cx } from 'class-variance-authority'
import { ContractMetrics } from './ContractMetrics'

export function Contracts() {
  const {
    visibleColumns,
    datasetPage,
    sortField,
    sortDirection,
    sortableColumns,
    toggleSort,
    limit,
    datasetState,
    cellContext,
    error,
    viewMode,
    filters,
    selectedContract,
  } = useContracts()

  const showDetailView =
    viewMode === 'detail' && (!filters.length || selectedContract)
  const listHeight = showDetailView
    ? datasetPage && datasetPage.length
      ? `${400 - Math.max((2 - datasetPage.length) * 100, 0)}px`
      : '400px'
    : '100%'

  return (
    <div className="relative flex flex-col overflow-hidden h-full w-full">
      <div
        className={cx(
          'absolute w-full',
          showDetailView ? 'block' : 'invisible',
          'transition-all',
          'p-6',
        )}
        style={{
          height: showDetailView ? `calc(100% - ${listHeight})` : 0,
        }}
      >
        {showDetailView ? <ContractMetrics /> : null}
      </div>
      <div
        className={cx(
          'absolute overflow-hidden transition-all w-full',
          'duration-300',
          'overflow-hidden',
        )}
        style={{
          bottom: 0,
          height: listHeight,
        }}
      >
        <ScrollArea className="z-0">
          <div
            className={cx(showDetailView ? 'pb-6 px-6' : 'p-6', 'min-w-fit')}
          >
            <Table
              testId="contractsTable"
              context={cellContext}
              isLoading={datasetState === 'loading'}
              emptyState={
                <EmptyState
                  datasetState={datasetState}
                  noneMatching={<StateNoneMatching />}
                  noneYet={<StateNoneYet />}
                  error={<StateError error={error} />}
                />
              }
              sortableColumns={sortableColumns}
              pageSize={limit}
              data={datasetPage}
              columns={visibleColumns}
              sortDirection={sortDirection}
              sortField={sortField}
              toggleSort={toggleSort}
              rowSize="default"
            />
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
