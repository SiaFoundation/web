import { RenterSidenav } from '../RenterSidenav'
import { routes } from '../../config/routes'
import { PaginatorKnownTotal, Table } from '@siafoundation/design-system'
import { useDialog } from '../../contexts/dialog'
import { useContracts } from '../../contexts/contracts'
import { ContractsViewDropdownMenu } from './ContractsViewDropdownMenu'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import { ContractsFilters } from './ContractsFilters'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'

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
    stateNoneMatchingFilters,
    stateNoneYet,
    hasFetched,
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
            isLoading={isLoading}
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
          isLoading={!stateNoneYet && isLoading}
          data={contracts}
          columns={columns}
          sortDirection={sortDirection}
          sortColumn={sortColumn}
          toggleSort={toggleSort}
          emptyState={
            hasFetched &&
            (stateNoneMatchingFilters ? (
              <StateNoneMatching />
            ) : (
              <StateNoneYet />
            ))
          }
        />
      </div>
    </RenterdAuthedLayout>
  )
}
