import { Table } from '@siafoundation/design-system'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { useKeys } from '../../contexts/keys'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import { RenterdSidenav } from '../RenterdSidenav'
import { KeysActionsMenu } from './KeysActionsMenu'
import { StateError } from './StateError'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'

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
          rowSize="default"
        />
      </div>
    </RenterdAuthedLayout>
  )
}
