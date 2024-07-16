import { Table } from '@siafoundation/design-system'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { useWallets } from '../../contexts/wallets'
import { WalletdAuthedLayout } from '../WalletdAuthedLayout'
import { WalletdSidenav } from '../WalletdSidenav'
import { StateError } from './StateError'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'
import { WalletsActionsMenu } from './WalletsActionsMenu'
import { WalletsFiltersBar } from './WalletsFiltersBar'

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
            testId="walletsTable"
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
