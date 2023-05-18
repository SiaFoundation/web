import {
  EntityList,
  EntityListItemProps,
  WalletLayoutActions,
  getTransactionTypes,
  BalanceEvolution,
  daysInMilliseconds,
  Text,
  Warning16,
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
          txType: getTransactionTypes(t.transaction, t.source),
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
            txType: getTransactionTypes(t.transaction, t.source),
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
      period: 'daily',
      start,
      periods: dayPeriods,
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

  const { isSynced } = useSyncStatus()

  return (
    <HostdAuthedLayout
      routes={routes}
      sidenav={<HostdSidenav />}
      openSettings={() => openDialog('settings')}
      title="Wallet"
      actions={
        <WalletLayoutActions
          isSynced={isSynced}
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
        !isSynced && (
          <div className="flex gap-2 items-center">
            <Text color="amber">
              <Warning16 />
            </Text>
            <Text size="14">
              Blockchain is syncing, transaction data may be incomplete.
            </Text>
          </div>
        )
      }
    >
      <div className="p-6 flex flex-col gap-5">
        <BalanceEvolution
          balances={balances}
          isLoading={metrics.isValidating}
        />
        <EntityList title="Transactions" entities={entities.slice(0, 100)} />
      </div>
    </HostdAuthedLayout>
  )
}
