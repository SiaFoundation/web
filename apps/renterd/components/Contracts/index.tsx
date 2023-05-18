import { RenterdSidenav } from '../RenterdSidenav'
import { routes } from '../../config/routes'
import { Table } from '@siafoundation/design-system'
import { useDialog } from '../../contexts/dialog'
import { useContracts } from '../../contexts/contracts'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'
import { ContractsActionsMenu } from './ContractsActionsMenu'
import { StateError } from './StateError'
import { ContractsFilterBar } from './ContractsFilterBar'

export function Contracts() {
  const { openDialog } = useDialog()
  const {
    columns,
    datasetPage,
    sortColumn,
    sortDirection,
    toggleSort,
    limit,
    dataState,
    cellContext,
    error,
  } = useContracts()

  return (
    <RenterdAuthedLayout
      title="Active contracts"
      routes={routes}
      sidenav={<RenterdSidenav />}
      openSettings={() => openDialog('settings')}
      stats={<ContractsFilterBar />}
      size="full"
      actions={<ContractsActionsMenu />}
    >
      <div className="p-6 min-w-fit">
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
          pageSize={limit}
          data={datasetPage}
          columns={columns}
          sortDirection={sortDirection}
          sortColumn={sortColumn}
          toggleSort={toggleSort}
        />
      </div>
    </RenterdAuthedLayout>
  )
}
