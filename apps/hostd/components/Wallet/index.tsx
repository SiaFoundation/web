import {
  EntityList,
  EntityListItemProps,
  WalletLayoutActions,
  getTransactionTypes,
  // getTransactionTotals,
} from '@siafoundation/design-system'
import {
  useWalletPending,
  useWalletTransactions,
} from '@siafoundation/react-hostd'
import { useMemo } from 'react'
import { useDialog } from '../../contexts/dialog'
import { routes } from '../../config/routes'
import BigNumber from 'bignumber.js'
import { HostdSidenav } from '../HostdSidenav'
import { HostdAuthedLayout } from '../HostdAuthedLayout'

export function Wallet() {
  const transactions = useWalletTransactions({
    config: {
      swr: {
        revalidateOnFocus: false,
        refreshInterval: 60_000,
      },
    },
  })
  const pending = useWalletPending()

  const { openDialog } = useDialog()

  const entities: EntityListItemProps[] = useMemo(
    () => [
      ...(pending.data || []).map((t): EntityListItemProps => {
        // const totals = getTransactionTotals(t)
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
            txType: getTransactionTypes(t.transaction),
            hash: t.id,
            timestamp: new Date(t.timestamp).getTime(),
            onClick: () => openDialog('transactionDetails', t.id),
            sc: new BigNumber(t.inflow).minus(t.outflow),
          }
        })
        .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1)),
    ],
    [pending, transactions, openDialog]
  )

  // const txns: { inflow: string; outflow: string; timestamp: string }[] =
  //   useMemo(
  //     () =>
  //       (transactions.data || [])
  //         .map((t) => {
  //           return {
  //             inflow: t.inflow,
  //             outflow: t.outflow,
  //             timestamp: t.timestamp,
  //           }
  //         })
  //         .sort((a, b) => (a.timestamp >= b.timestamp ? 1 : -1)),
  //     [transactions]
  //   )

  return (
    <HostdAuthedLayout
      routes={routes}
      sidenav={<HostdSidenav />}
      openSettings={() => openDialog('settings')}
      title="Wallet"
      actions={
        <WalletLayoutActions
          receiveSiacoin={() => openDialog('addressDetails')}
          sendSiacoin={() => openDialog('sendSiacoin')}
        />
      }
    >
      <div className="p-5 flex flex-col gap-5">
        {/* <WalletSparkline transactions={txns} /> */}
        <EntityList title="Transactions" entities={entities.slice(0, 100)} />
      </div>
    </HostdAuthedLayout>
  )
}
