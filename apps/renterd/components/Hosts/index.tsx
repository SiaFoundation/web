import { RenterdSidenav } from '../RenterdSidenav'
import { routes } from '../../config/routes'
import { Table } from '@siafoundation/design-system'
import { useDialog } from '../../contexts/dialog'
import { useHosts } from '../../contexts/hosts'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import { StateEmpty } from './StateEmpty'
import { HostsActionsMenu } from './HostsActionsMenu'
import { HostsFilterBar } from './HostsFilterBar'

export function Hosts() {
  const { openDialog } = useDialog()
  const { dataset, columns, limit, dataState, tableContext } = useHosts()

  return (
    <RenterdAuthedLayout
      title="Hosts"
      routes={routes}
      sidenav={<RenterdSidenav />}
      openSettings={() => openDialog('settings')}
      size="full"
      actions={<HostsActionsMenu />}
      stats={<HostsFilterBar />}
    >
      <div className="p-6 min-w-fit">
        <Table
          isLoading={dataState === 'loading'}
          emptyState={<StateEmpty />}
          context={tableContext}
          pageSize={limit}
          data={dataset}
          columns={columns}
          rowSize="default"
          // sortField={sortField}
          // sortDirection={sortDirection}
          // toggleSort={toggleSort}
        />
      </div>
    </RenterdAuthedLayout>
  )
}
