import {
  EntityList,
  EntityListItemProps,
  WalletLayoutActions,
  getTransactionType,
  Text,
  Warning16,
  BalanceEvolution,
} from '@siafoundation/design-system'
import {
  useWalletBalance,
  useWalletPending,
  useWalletTransactions,
} from '@siafoundation/react-renterd'
import { useMemo } from 'react'
import { useDialog } from '../../contexts/dialog'
import { routes } from '../../config/routes'
import BigNumber from 'bignumber.js'
import { RenterdSidenav } from '../RenterdSidenav'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'
import { useSyncStatus } from '../../hooks/useSyncStatus'

export function Wallet() {
  const transactions = useWalletTransactions({
    params: {
      // Endpoint currently returns wrong end of txn list
      // max: 50,
    },
    config: {
      swr: {
        refreshInterval: 60_000,
        revalidateOnFocus: false,
      },
    },
  })

  const pending = useWalletPending()

  const { openDialog } = useDialog()

  const entities: EntityListItemProps[] | null = useMemo(() => {
    if (!pending.data || !transactions.data) {
      return null
    }
    return [
      ...(pending.data || []).map((t): EntityListItemProps => {
        return {
          type: 'transaction',
          txType: getTransactionType(t),
          // hash: t.ID,
          // timestamp: new Date(t.Timestamp).getTime(),
          // onClick: () => openDialog('transactionDetails', t.ID),
          // sc: totals.sc,
          unconfirmed: true,
        }
      }),
      ...(transactions.data || [])
        .map((t): EntityListItemProps => {
          return {
            type: 'transaction',
            txType: getTransactionType(t.raw),
            hash: t.id,
            timestamp: new Date(t.timestamp).getTime(),
            onClick: () => openDialog('transactionDetails', t.id),
            sc: new BigNumber(t.inflow).minus(t.outflow),
          }
        })
        .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1)),
    ]
  }, [pending.data, transactions.data, openDialog])

  // This now works but the visx chart has an issue where the tooltip does not
  // find the correct nearest datum when the data is not at a consistent
  // interval due to axis scale issues. renterd needs to return clean data
  // like hostd or we need to wait for this issue to be fixed:
  // https://github.com/airbnb/visx/issues/1533
  // until then renterd will use a line graph which does not have the issue.
  const balances = useMemo(
    () =>
      transactions.data
        ?.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
        .reduce((acc, t, i) => {
          if (i === 0) {
            return acc.concat({
              sc: new BigNumber(t.inflow).minus(t.outflow).toNumber(),
              timestamp: new Date(t.timestamp).getTime(),
            })
          }
          return acc.concat({
            sc: new BigNumber(acc[i - 1].sc)
              .plus(t.inflow)
              .minus(t.outflow)
              .toNumber(),
            timestamp: new Date(t.timestamp).getTime(),
          })
        }, []),
    [transactions.data]
  )

  const balance = useWalletBalance()
  // TODO: add API to return scanHeight, move to isWalletSynced just like hostd
  const { isSynced } = useSyncStatus()

  return (
    <RenterdAuthedLayout
      routes={routes}
      sidenav={<RenterdSidenav />}
      openSettings={() => openDialog('settings')}
      title="Wallet"
      actions={
        <WalletLayoutActions
          isSynced={isSynced}
          sc={balance.data ? new BigNumber(balance.data) : undefined}
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
          // see comment above
          chartType="line"
          balances={balances}
          isLoading={transactions.isValidating}
        />
        <EntityList title="Transactions" entities={entities?.slice(0, 100)} />
      </div>
    </RenterdAuthedLayout>
  )
}
