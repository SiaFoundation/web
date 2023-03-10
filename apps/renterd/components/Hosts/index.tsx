import { RenterSidenav } from '../RenterSidenav'
import { routes } from '../../config/routes'
import { Table } from '@siafoundation/design-system'
import { useDialog } from '../../contexts/dialog'
import { useHosts } from '../../contexts/hosts'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'
import { HostsActionsMenu } from './HostsActionsMenu'
import { HostsFilterMenu } from './HostsFilterMenu'

export function Hosts() {
  const { openDialog } = useDialog()
  const { dataset, columns, limit, dataState } = useHosts()

  return (
    <RenterdAuthedLayout
      title="Hosts"
      routes={routes}
      sidenav={<RenterSidenav />}
      openSettings={() => openDialog('settings')}
      size="full"
      nav={<HostsFilterMenu />}
      actions={<HostsActionsMenu />}
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
          data={dataset}
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
