import { RenterSidenav } from '../RenterSidenav'
import { routes } from '../../config/routes'
import { PaginatorUnknownTotal, Table } from '@siafoundation/design-system'
import { useDialog } from '../../contexts/dialog'
import { useHosts } from '../../contexts/hosts'
import { HostsViewDropdownMenu } from './HostsViewDropdownMenu'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'

export function Hosts() {
  const { openDialog } = useDialog()
  const {
    hosts,
    columns,
    offset,
    limit,
    isLoading,
    pageCount,
    hasFetched,
    emptyNoneMatchingFilters,
    emptyNoneYet,
  } = useHosts()

  return (
    <RenterdAuthedLayout
      title="Hosts"
      routes={routes}
      sidenav={<RenterSidenav />}
      openSettings={() => openDialog('settings')}
      size="full"
      actions={
        <div className="flex gap-2">
          <PaginatorUnknownTotal
            offset={offset}
            limit={limit}
            pageTotal={pageCount}
          />
          <HostsViewDropdownMenu />
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
          data={hosts}
          columns={columns}
          rowSize="default"
          // sortColumn={sortColumn}
          // sortDirection={sortDirection}
          // toggleSort={toggleSort}
        />
      </div>
    </RenterdAuthedLayout>
  )
}
