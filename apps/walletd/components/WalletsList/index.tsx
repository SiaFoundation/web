import { Table } from '@siafoundation/design-system'
import { useWallets } from '../../contexts/wallets'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { WalletdAuthedLayout } from '../WalletdAuthedLayout'
import { WalletdSidenav } from '../WalletdSidenav'
import { WalletsActionsMenu } from './WalletsActionsMenu'
import { WalletsFiltersBar } from './WalletsFiltersBar'
import { StateNoneYet } from './StateNoneYet'
import { StateNoneMatching } from './StateNoneMatching'
import { StateError } from './StateError'

export function WalletsList() {
  const { openDialog } = useDialog()
  const {
    dataset,
    dataState,
    context,
    columns,
    sortableColumns,
    sortDirection,
    sortField,
    toggleSort,
  } = useWallets()

  return (
    <WalletdAuthedLayout
      routes={routes}
      sidenav={<WalletdSidenav />}
      openSettings={() => openDialog('settings')}
      title="Wallets"
      actions={<WalletsActionsMenu />}
      stats={<WalletsFiltersBar />}
      size="3"
    >
      <div className="px-6 py-7 min-w-fit">
        {dataState === 'noneYet' && <StateNoneYet />}
        {dataState !== 'noneYet' && (
          <Table
            isLoading={dataState === 'loading'}
            emptyState={
              dataState === 'noneMatchingFilters' ? (
                <StateNoneMatching />
              ) : dataState === 'error' ? (
                <StateError />
              ) : null
            }
            pageSize={6}
            data={dataset}
            context={context}
            columns={columns}
            sortableColumns={sortableColumns}
            sortDirection={sortDirection}
            sortField={sortField}
            toggleSort={toggleSort}
          />
        )}
      </div>
    </WalletdAuthedLayout>
  )
}
