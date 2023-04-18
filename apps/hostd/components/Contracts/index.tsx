import { HostdSidenav } from '../HostdSidenav'
import { routes } from '../../config/routes'
import { Table } from '@siafoundation/design-system'
import { useDialog } from '../../contexts/dialog'
import { useContracts } from '../../contexts/contracts'
import { HostdAuthedLayout } from '../HostdAuthedLayout'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'
import { StateError } from './StateError'
import { ContractsActionsMenu } from './ContractsActionsMenu'
import { ContractsFilterMenu } from './ContractsFilterMenu'

export function Contracts() {
  const { openDialog } = useDialog()
  const {
    columns,
    dataset,
    sortColumn,
    sortDirection,
    toggleSort,
    limit,
    dataState,
    cellContext,
  } = useContracts()

  return (
    <HostdAuthedLayout
      title="Contracts"
      routes={routes}
      sidenav={<HostdSidenav />}
      openSettings={() => openDialog('settings')}
      nav={<ContractsFilterMenu />}
      size="full"
      actions={<ContractsActionsMenu />}
    >
      <div className="p-5 min-w-fit">
        <Table
          context={cellContext}
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
          pageSize={limit}
          data={dataset}
          columns={columns}
          sortDirection={sortDirection}
          sortColumn={sortColumn}
          toggleSort={toggleSort}
        />
      </div>
    </HostdAuthedLayout>
  )
}
