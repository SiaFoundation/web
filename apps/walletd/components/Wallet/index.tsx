import { Table } from '@siafoundation/design-system'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { WalletdAuthedLayout } from '../WalletdAuthedLayout'
import { WalletdSidenav } from '../WalletdSidenav'
import { WalletActionsMenu } from './WalletActionsMenu'
import { useEvents } from '../../contexts/events'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'
import { StateError } from './StateError'
import { useWallets } from '../../contexts/wallets'
import { WalletNavMenu } from './WalletNavMenu'
import { EventsFilterBar } from './EventsFilterBar'

export function Wallet() {
  const { openDialog } = useDialog()
  const { wallet } = useWallets()
  const {
    dataset,
    dataState,
    columns,
    cellContext,
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
      title={wallet?.name}
      nav={<WalletNavMenu />}
      actions={<WalletActionsMenu />}
      stats={<EventsFilterBar />}
      size="full"
    >
      <div className="px-6 py-7 min-w-fit">
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
          context={cellContext}
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
