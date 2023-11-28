import {
  EntityList,
  PaginatorUnknownTotal,
  WalletLayoutActions,
} from '@siafoundation/design-system'
import { useWallet } from '@siafoundation/react-renterd'
import { useDialog } from '../../contexts/dialog'
import { routes } from '../../config/routes'
import BigNumber from 'bignumber.js'
import { RenterdSidenav } from '../RenterdSidenav'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import { useSyncStatus } from '../../hooks/useSyncStatus'
import { EmptyState } from './EmptyState'
import { useTransactions } from '../../contexts/transactions'
import { WalletFilterBar } from './WalletFilterBar'

export function Wallet() {
  const { openDialog } = useDialog()
  const wallet = useWallet()
  const { dataset, offset, limit, pageCount, dataState } = useTransactions()
  const { isSynced, syncPercent, isWalletSynced, walletScanPercent } =
    useSyncStatus()

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
                }
              : undefined
          }
          receiveSiacoin={() => openDialog('addressDetails')}
          sendSiacoin={() => openDialog('sendSiacoin')}
        />
      }
      stats={<WalletFilterBar />}
    >
      <div className="p-6 flex flex-col gap-5">
        {/* {balances?.length ? (
          <BalanceEvolution
            // see comment above
            chartType="line"
            balances={balances}
            isLoading={transactions.isValidating}
          />
        ) : null} */}
        <EntityList
          title="Transactions"
          entities={dataset?.slice(0, 100)}
          emptyState={<EmptyState />}
          actions={
            <PaginatorUnknownTotal
              offset={offset}
              limit={limit}
              pageTotal={pageCount}
              isLoading={dataState === 'loading'}
            />
          }
        />
      </div>
    </RenterdAuthedLayout>
  )
}
