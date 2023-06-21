import { Table } from '@siafoundation/design-system'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { WalletdAuthedLayout } from '../WalletdAuthedLayout'
import { WalletdSidenav } from '../WalletdSidenav'
import { WalletsActionsMenu } from './WalletsActionsMenu'
import { useRouter } from 'next/router'
import { useEvents } from '../../contexts/events'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'
import { StateError } from './StateError'

export function Wallet() {
  const router = useRouter()
  const name = router.query.name as string
  const { openDialog } = useDialog()
  const {
    dataset,
    dataState,
    columns,
    sortableColumns,
    sortDirection,
    sortField,
    toggleSort,
  } = useEvents()

  return (
    <WalletdAuthedLayout
      routes={routes}
      sidenav={<WalletdSidenav />}
      openSettings={() => openDialog('settings')}
      title={`${name}`}
      // nav={<WalletsNavMenu />}
      actions={<WalletsActionsMenu />}
      // stats={<WalletsFiltersBar />}
      size="3"
    >
      <div className="px-6 py-7">
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
          pageSize={6}
          data={dataset}
          columns={columns}
          sortableColumns={sortableColumns}
          sortDirection={sortDirection}
          sortField={sortField}
          toggleSort={toggleSort}
        />
      </div>
    </WalletdAuthedLayout>
  )
}
