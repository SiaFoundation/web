import {
  EntityList,
  EntityListItemProps,
  WalletLayoutActions,
  getTransactionTypes,
  Text,
  Warning16,
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
          txType: getTransactionTypes(t),
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
            txType: getTransactionTypes(t.Raw),
            hash: t.ID,
            timestamp: new Date(t.Timestamp).getTime(),
            onClick: () => openDialog('transactionDetails', t.ID),
            sc: new BigNumber(t.Inflow).minus(t.Outflow),
          }
        })
        .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1)),
    ]
  }, [pending.data, transactions.data, openDialog])

  // const txns: { inflow: string; outflow: string; timestamp: string }[] =
  //   useMemo(
  //     () =>
  //       transactions.data
  //         ?.map((t) => ({
  //           inflow: t.Inflow,
  //           outflow: t.Outflow,
  //           timestamp: t.Timestamp,
  //         }))
  //         .sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1)),
  //     [transactions.data]
  //   )

  const balance = useWalletBalance()
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
        {/* <WalletSparkline transactions={txns} /> */}
        <EntityList title="Transactions" entities={entities?.slice(0, 100)} />
      </div>
    </RenterdAuthedLayout>
  )
}
