import {
  EntityList,
  EntityListItemProps,
  WalletLayoutActions,
  getTransactionType,
  BalanceEvolution,
  daysInMilliseconds,
  WalletSyncWarning,
} from '@siafoundation/design-system'
import {
  useMetricsPeriod,
  useWallet,
  useWalletPending,
  useWalletTransactions,
} from '@siafoundation/react-hostd'
import { useMemo } from 'react'
import { useDialog } from '../../contexts/dialog'
import { routes } from '../../config/routes'
import BigNumber from 'bignumber.js'
import { HostdSidenav } from '../HostdSidenav'
import { HostdAuthedLayout } from '../HostdAuthedLayout'
import { useSyncStatus } from '../../hooks/useSyncStatus'
import { EmptyState } from './EmptyState'

export function Wallet() {
  const transactions = useWalletTransactions({
    params: {
      limit: 50,
      offset: 0,
    },
  })
  const pending = useWalletPending()

  const { openDialog } = useDialog()

  const wallet = useWallet()

  const entities: EntityListItemProps[] = useMemo(
    () => [
      ...(pending.data || []).map((t): EntityListItemProps => {
        return {
          type: 'transaction',
          txType: getTransactionType(t.transaction, t.source),
          hash: t.ID,
          timestamp: new Date(t.timestamp).getTime(),
          sc: new BigNumber(t.inflow).minus(t.outflow),
          unconfirmed: true,
        }
      }),
      ...(transactions.data || [])
        .map((t): EntityListItemProps => {
          return {
            type: 'transaction',
            txType: getTransactionType(t.transaction, t.source),
            hash: t.ID,
            timestamp: new Date(t.timestamp).getTime(),
            onClick: () => openDialog('transactionDetails', t.ID),
            sc: new BigNumber(t.inflow).minus(t.outflow),
          }
        })
        .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1)),
    ],
    [pending, transactions, openDialog]
  )

  const dayPeriods = 30
  const start = useMemo(() => {
    const today = new Date().getTime()
    const periodsInMs = daysInMilliseconds(dayPeriods)
    const periodsAgo = today - periodsInMs
    return new Date(periodsAgo).toISOString()
  }, [])

  const metrics = useMetricsPeriod({
    params: {
      interval: 'daily',
      start,
    },
  })
  const balances = useMemo(
    () =>
      (metrics.data || [])
        .map((t) => {
          return {
            sc: Number(t.balance),
            timestamp: new Date(t.timestamp).getTime(),
          }
        })
        .sort((a, b) => (a.timestamp >= b.timestamp ? 1 : -1)),
    [metrics.data]
  )
  console.log(balances)

  const { isSynced, isWalletSynced, syncPercent, walletScanPercent } =
    useSyncStatus()

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
          sc={
            wallet.data
              ? new BigNumber(wallet.data.spendable).plus(
                  wallet.data.unconfirmed
                )
              : undefined
          }
          receiveSiacoin={() => openDialog('addressDetails')}
          sendSiacoin={() => openDialog('sendSiacoin')}
        />
      }
      stats={
        <WalletSyncWarning
          isSynced={isSynced}
          isWalletSynced={isWalletSynced}
          syncPercent={syncPercent}
          walletScanPercent={walletScanPercent}
        />
      }
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
          entities={entities.slice(0, 100)}
          emptyState={<EmptyState />}
        />
      </div>
    </HostdAuthedLayout>
  )
}
