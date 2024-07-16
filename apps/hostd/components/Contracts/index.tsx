import { Table } from '@siafoundation/design-system'
import { routes } from '../../config/routes'
import { useContracts } from '../../contexts/contracts'
import { useDialog } from '../../contexts/dialog'
import { HostdAuthedLayout } from '../HostdAuthedLayout'
import { HostdSidenav } from '../HostdSidenav'
import { ContractsActionsMenu } from './ContractsActionsMenu'
import { ContractsFiltersBar } from './ContractsFiltersBar'
import { StateError } from './StateError'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'

export function Contracts() {
  const { openDialog } = useDialog()
  const {
    columns,
    dataset,
    sortField,
    sortDirection,
    sortableColumns,
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
      actions={<ContractsActionsMenu />}
      stats={<ContractsFiltersBar />}
      size="full"
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
              <StateError />
            ) : null
          }
          pageSize={limit}
          data={dataset}
          columns={columns}
          sortableColumns={sortableColumns}
          sortDirection={sortDirection}
          sortField={sortField}
          toggleSort={toggleSort}
        />
      </div>
    </HostdAuthedLayout>
  )
}
