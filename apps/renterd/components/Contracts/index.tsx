import { RenterSidenav } from '../RenterSidenav'
import { routes } from '../../config/routes'
import { PaginatorKnownTotal, Table } from '@siafoundation/design-system'
import { useDialog } from '../../contexts/dialog'
import { useContracts } from '../../contexts/contracts'
import { ContractsViewDropdownMenu } from './ContractsViewDropdownMenu'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import { ContractsFilters } from './ContractsFilters'

export function Contracts() {
  const { openDialog } = useDialog()
  const {
    columns,
    contracts,
    sortColumn,
    sortDirection,
    toggleSort,
    limit,
    offset,
    isLoading,
    datasetCount,
    pageCount,
  } = useContracts()

  return (
    <RenterdAuthedLayout
      title="Contracts"
      routes={routes}
      sidenav={<RenterSidenav />}
      openSettings={() => openDialog('settings')}
      filters={<ContractsFilters />}
      size="full"
      actions={
        <div className="flex gap-2">
          <PaginatorKnownTotal
            offset={offset}
            limit={limit}
            datasetTotal={datasetCount}
            pageTotal={pageCount}
          />
          <ContractsViewDropdownMenu />
        </div>
      }
    >
      <div className="p-5 min-w-fit">
        <Table
          pageSize={limit}
          isLoading={isLoading}
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
