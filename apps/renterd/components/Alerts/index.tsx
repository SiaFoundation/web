import { Table } from '@siafoundation/design-system'
import { routes } from '../../config/routes'
import { useAlerts } from '../../contexts/alerts'
import { useDialog } from '../../contexts/dialog'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import { RenterdSidenav } from '../RenterdSidenav'
import { AlertsActionsMenu } from './AlertsActionsMenu'
import { AlertsFilterMenu } from './AlertsFilterMenu'
import { StateError } from './StateError'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'

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
    cellContext,
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
          context={cellContext}
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
