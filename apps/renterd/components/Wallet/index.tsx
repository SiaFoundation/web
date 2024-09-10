import {
  BalanceEvolution,
  Table,
  WalletLayoutActions,
} from '@siafoundation/design-system'
import { useWallet } from '@siafoundation/renterd-react'
import { useDialog } from '../../contexts/dialog'
import { routes } from '../../config/routes'
import BigNumber from 'bignumber.js'
import { RenterdSidenav } from '../RenterdSidenav'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import { useSyncStatus } from '../../hooks/useSyncStatus'
import { useTransactions } from '../../contexts/transactions'
import { WalletFilterBar } from './WalletFilterBar'
import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'
import { StateError } from './StateError'

export function Wallet() {
  const { openDialog } = useDialog()
  const wallet = useWallet()
  const { isSynced, isWalletSynced, syncPercent, walletScanPercent } =
    useSyncStatus()

  const {
    balances,
    metrics,
    dataset,
    dataState,
    columns,
    cellContext,
    sortableColumns,
    sortDirection,
    sortField,
    toggleSort,
    defaultPageSize,
  } = useTransactions()

  return (
    <RenterdAuthedLayout
      routes={routes}
      sidenav={<RenterdSidenav />}
      openSettings={() => openDialog('settings')}
      title="Wallet"
      actions={
        <WalletLayoutActions
          isSynced={isSynced}
          isWalletSynced={isWalletSynced}
          syncPercent={syncPercent}
          walletScanPercent={walletScanPercent}
          balanceSc={
            wallet.data
              ? {
                  spendable: new BigNumber(wallet.data.spendable),
                  unconfirmed: new BigNumber(wallet.data.unconfirmed),
                  confirmed: new BigNumber(wallet.data.confirmed),
                  immature: new BigNumber(wallet.data.immature),
                }
              : undefined
          }
          receiveSiacoin={() => openDialog('addressDetails')}
          sendSiacoin={() => openDialog('sendSiacoin')}
        />
      }
      stats={<WalletFilterBar />}
    >
      <div className="flex flex-col gap-4 px-6 py-7 min-w-fit">
        {balances?.length ? (
          <BalanceEvolution
            // see comment above
            chartType="line"
            balances={balances}
            isLoading={metrics.isValidating}
          />
        ) : null}
        <Table
          testId="eventsTable"
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
          pageSize={defaultPageSize}
          data={dataset}
          context={cellContext}
          columns={columns}
          sortableColumns={sortableColumns}
          sortDirection={sortDirection}
          sortField={sortField}
          toggleSort={toggleSort}
        />
      </div>
    </RenterdAuthedLayout>
  )
}
