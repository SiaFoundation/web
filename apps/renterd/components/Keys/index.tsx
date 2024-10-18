import { RenterdSidenav } from '../RenterdSidenav'
import { routes } from '../../config/routes'
import { Table } from '@siafoundation/design-system'
import { useDialog } from '../../contexts/dialog'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'
import { KeysActionsMenu } from './KeysActionsMenu'
import { StateError } from './StateError'
import { useKeys } from '../../contexts/keys'
import { KeysBatchMenu } from './KeysBatchMenu'
import { KeysStatsMenu } from './KeysStatsMenu'

export function Keys() {
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
  } = useKeys()

  return (
    <RenterdAuthedLayout
      title="Keys"
      routes={routes}
      sidenav={<RenterdSidenav />}
      openSettings={() => openDialog('settings')}
      actions={<KeysActionsMenu />}
      stats={<KeysStatsMenu />}
    >
      <div className="p-6 min-w-fit">
        <KeysBatchMenu />
        <Table
          testId="keysTable"
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
          context={cellContext}
          columns={columns}
          sortDirection={sortDirection}
          sortField={sortField}
          toggleSort={toggleSort}
          rowSize="default"
        />
      </div>
    </RenterdAuthedLayout>
  )
}
