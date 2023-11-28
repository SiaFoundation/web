import {
  EntityList,
  WalletLayoutActions,
  BalanceEvolution,
  PaginatorUnknownTotal,
} from '@siafoundation/design-system'
import { useWallet } from '@siafoundation/react-hostd'
import { useDialog } from '../../contexts/dialog'
import { routes } from '../../config/routes'
import BigNumber from 'bignumber.js'
import { HostdSidenav } from '../HostdSidenav'
import { HostdAuthedLayout } from '../HostdAuthedLayout'
import { useSyncStatus } from '../../hooks/useSyncStatus'
import { EmptyState } from './EmptyState'
import { useTransactions } from '../../contexts/transactions'
import { WalletFilterBar } from './WalletFilterBar'

export function Wallet() {
  const { openDialog } = useDialog()
  const wallet = useWallet()
  const { isSynced, isWalletSynced, syncPercent, walletScanPercent } =
    useSyncStatus()

  const { dataset, balances, metrics, offset, limit, dataState, pageCount } =
    useTransactions()

  return (
    <HostdAuthedLayout
      routes={routes}
      sidenav={<HostdSidenav />}
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
        {balances?.length && balances.find((b) => b.sc) ? (
          <BalanceEvolution
            balances={balances}
            isLoading={metrics.isValidating}
          />
        ) : null}
        <EntityList
          title="Transactions"
          dataset={dataset}
          isLoading={dataState === 'loading'}
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
    </HostdAuthedLayout>
  )
}
