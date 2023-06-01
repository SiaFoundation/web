import { RenterdSidenav } from '../RenterdSidenav'
import { routes } from '../../config/routes'
import { Table } from '@siafoundation/design-system'
import { useDialog } from '../../contexts/dialog'
import { useHosts } from '../../contexts/hosts'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'
import { HostsActionsMenu } from './HostsActionsMenu'
import { StateError } from './StateError'
import { HostsFilterBar } from './HostsFilterBar'

export function Hosts() {
  const { openDialog } = useDialog()
  const { dataset, columns, limit, dataState, autopilotMode, error } =
    useHosts()

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
          emptyState={
            dataState === 'noneMatchingFilters' ? (
              <StateNoneMatching />
            ) : dataState === 'noneYet' ? (
              <StateNoneYet />
            ) : dataState === 'error' ? (
              <StateError autopilotMode={autopilotMode} error={error} />
            ) : null
          }
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
