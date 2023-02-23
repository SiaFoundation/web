import { RenterSidenav } from '../RenterSidenav'
import { routes } from '../../config/routes'
import { PaginatorKnownTotal, Table } from '@siafoundation/design-system'
import { useDialog } from '../../contexts/dialog'
import { useContracts } from '../../contexts/contracts'
import { ContractsViewDropdownMenu } from './ContractsViewDropdownMenu'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'
import { ContractsFilterMenu } from './ContractFilterMenu'

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
    emptyNoneMatchingFilters,
    emptyNoneYet,
    hasFetched,
  } = useContracts()

  return (
    <RenterdAuthedLayout
      title="Active contracts"
      routes={routes}
      sidenav={<RenterSidenav />}
      openSettings={() => openDialog('settings')}
      filters={<ContractsFilterMenu />}
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
          isLoading={!emptyNoneYet && !emptyNoneMatchingFilters && isLoading}
          emptyState={
            hasFetched &&
            (emptyNoneMatchingFilters ? (
              <StateNoneMatching />
            ) : (
              <StateNoneYet />
            ))
          }
          pageSize={limit}
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
