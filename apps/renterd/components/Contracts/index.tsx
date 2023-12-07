import { RenterdSidenav } from '../RenterdSidenav'
import { routes } from '../../config/routes'
import { ScrollArea, Table } from '@siafoundation/design-system'
import { useDialog } from '../../contexts/dialog'
import { useContracts } from '../../contexts/contracts'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'
import { ContractsActionsMenu } from './ContractsActionsMenu'
import { StateError } from './StateError'
import { ContractsFilterBar } from './ContractsFilterBar'
import { cx } from 'class-variance-authority'
import { ContractMetrics } from './ContractMetrics'

export function Contracts() {
  const { openDialog } = useDialog()
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
    error,
    viewMode,
    selectedContract,
  } = useContracts()

  const listHeight =
    viewMode === 'detail'
      ? datasetPage && datasetPage.length
        ? `${400 - Math.max((2 - datasetPage.length) * 100, 0)}px`
        : '400px'
      : '100%'

  return (
    <RenterdAuthedLayout
      title="Active contracts"
      routes={routes}
      sidenav={<RenterdSidenav />}
      openSettings={() => openDialog('settings')}
      stats={<ContractsFilterBar />}
      actions={<ContractsActionsMenu />}
      size="full"
      scroll={false}
    >
      <div className="relative flex flex-col overflow-hidden h-full w-full">
        <div
          className={cx(
            'absolute w-full',
            viewMode === 'detail' ? 'block' : 'invisible',
            'transition-all',
            'p-6'
          )}
          style={{
            height: `calc(100% - ${listHeight})`,
          }}
        >
          <ContractMetrics />
        </div>
        <div
          className={cx(
            'absolute overflow-hidden transition-all w-full',
            'duration-300',
            'overflow-hidden'
          )}
          style={{
            bottom: 0,
            height: listHeight,
          }}
        >
          <ScrollArea className="z-0" id="scroll-hosts">
            <div
              className={cx(
                viewMode === 'detail' ? 'pb-6 px-6' : 'p-6',
                'min-w-fit'
              )}
            >
              <Table
                context={cellContext}
                isLoading={dataState === 'loading'}
                emptyState={
                  dataState === 'noneMatchingFilters' ? (
                    <StateNoneMatching />
                  ) : dataState === 'noneYet' ? (
                    <StateNoneYet />
                  ) : dataState === 'error' ? (
                    <StateError error={error} />
                  ) : null
                }
                sortableColumns={sortableColumns}
                pageSize={limit}
                data={datasetPage}
                columns={columns}
                sortDirection={sortDirection}
                sortField={sortField}
                toggleSort={toggleSort}
                focusId={selectedContract?.id}
                rowSize="default"
              />
            </div>
          </ScrollArea>
        </div>
      </div>
    </RenterdAuthedLayout>
  )
}
