import { RenterSidenav } from '../RenterSidenav'
import { routes } from '../../config/routes'
import { Table } from '@siafoundation/design-system'
import { useDialog } from '../../contexts/dialog'
import { useContracts } from '../../contexts/contracts'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'
import { ContractsFilterMenu } from './ContractsFilterMenu'
import { ContractsActionsMenu } from './ContractsActionsMenu'

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
  } = useContracts()

  return (
    <RenterdAuthedLayout
      title="Active contracts"
      routes={routes}
      sidenav={<RenterSidenav />}
      openSettings={() => openDialog('settings')}
      nav={<ContractsFilterMenu />}
      size="full"
      actions={<ContractsActionsMenu />}
    >
      <div className="p-5 min-w-fit">
        <Table
          isLoading={dataState === 'loading'}
          emptyState={
            dataState === 'noneMatchingFilters' ? (
              <StateNoneMatching />
            ) : dataState === 'noneYet' ? (
              <StateNoneYet />
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
