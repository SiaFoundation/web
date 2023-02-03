import {
  EntityList,
  EntityListItemProps,
  WalletSparkline,
  WalletLayoutActions,
  getTransactionTypes,
  getTransactionTotals,
} from '@siafoundation/design-system'
import {
  useWalletPending,
  useWalletTransactions,
} from '@siafoundation/react-core'
import { useMemo } from 'react'
import { useDialog } from '../../contexts/dialog'
import { routes } from '../../config/routes'
import BigNumber from 'bignumber.js'
import { RenterSidenav } from '../RenterSidenav'
import { RenterdAuthedLayout } from '../RenterdAuthedLayout'

export function Wallet() {
  const transactions = useWalletTransactions({
    params: {},
  })
  const pending = useWalletPending()

  const { openDialog } = useDialog()

  const entities: EntityListItemProps[] = useMemo(
    () => [
      ...(pending.data || []).map((t): EntityListItemProps => {
        const totals = getTransactionTotals(t)
        return {
          type: 'transaction',
          txType: getTransactionTypes(t),
          // hash: t.ID,
          // timestamp: new Date(t.Timestamp).getTime(),
          // onClick: () => openDialog('transactionDetails', t.ID),
          sc: totals.sc,
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
    ],
    [pending, transactions, openDialog]
  )

  return (
    <RenterdAuthedLayout
      routes={routes}
      sidenav={<RenterSidenav />}
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
        <WalletSparkline />
        <EntityList title="Transactions" entities={entities} />
      </div>
    </RenterdAuthedLayout>
  )
}
