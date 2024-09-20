import { RenterdSidenav } from '../RenterdSidenav'
import { routes } from '../../config/routes'
import { Table } from '@siafoundation/design-system'
import { useDialog } from '../../contexts/dialog'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'
import { AlertsActionsMenu } from './AlertsActionsMenu'
import { StateError } from './StateError'
import { useAlerts } from '../../contexts/alerts'
import { AlertsFilterMenu } from './AlertsFilterMenu'

export function Alerts() {
  const { openDialog } = useDialog()
  const {
    columns,
    datasetPage,
    sortField,
    sortDirection,
    sortableColumns,
    toggleSort,
    limit,
    dataState,
  } = useAlerts()

  return (
    <RenterdAuthedLayout
      title="Alerts"
      routes={routes}
      sidenav={<RenterdSidenav />}
      openSettings={() => openDialog('settings')}
      actions={<AlertsActionsMenu />}
      stats={<AlertsFilterMenu />}
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
              <StateError />
            ) : null
          }
          sortableColumns={sortableColumns}
          pageSize={limit}
          data={datasetPage}
          columns={columns}
          sortDirection={sortDirection}
          sortField={sortField}
          toggleSort={toggleSort}
          rowSize="auto"
        />
      </div>
    </RenterdAuthedLayout>
  )
}
