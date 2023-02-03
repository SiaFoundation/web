import { RenterSidenav } from '../RenterSidenav'
import { routes } from '../../config/routes'
import { Table } from '@siafoundation/design-system'
import { useDialog } from '../../contexts/dialog'
import { useContracts } from '../../hooks/useContracts'
import { ContractsViewDropdownMenu } from './ContractsViewDropdownMenu'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
// import { ContractsFilters } from './ContractsFilters'

export function Contracts() {
  const { openDialog } = useDialog()
  const { columns, contracts, sortColumn, sortDirection, toggleSort } =
    useContracts()

  return (
    <RenterdAuthedLayout
      title={`Contracts (${contracts.length})`}
      routes={routes}
      sidenav={<RenterSidenav />}
      openSettings={() => openDialog('settings')}
      // filters={<ContractsFilters />}
      size="full"
      actions={
        <div className="flex gap-2">
          <ContractsViewDropdownMenu />
        </div>
      }
    >
      <div className="p-5 min-w-fit">
        <Table
          data={contracts}
          columns={columns}
          sortDirection={sortDirection}
          sortColumn={sortColumn}
          toggleSort={toggleSort}
        />
      </div>
    </RenterdAuthedLayout>
  )
}
