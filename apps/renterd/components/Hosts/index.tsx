import { RenterSidenav } from '../RenterSidenav'
import { routes } from '../../config/routes'
import { PaginatorUnknownTotal, Table } from '@siafoundation/design-system'
import { useDialog } from '../../contexts/dialog'
import { useHosts } from '../../contexts/hosts'
import { HostsViewDropdownMenu } from './HostsViewDropdownMenu'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'

export function Hosts() {
  const { openDialog } = useDialog()
  const { hosts, columns, offset, limit, isLoading, pageCount } = useHosts()

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
          pageSize={limit}
          isLoading={isLoading}
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
