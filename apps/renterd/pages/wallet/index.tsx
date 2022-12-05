import {
  EntityList,
  EntityListItemProps,
  WalletSparkline,
  WalletLayoutActions,
  getTransactionTypes,
} from '@siafoundation/design-system'
import { useWalletTransactions } from '@siafoundation/react-core'
import { useMemo } from 'react'
import { useDialog } from '../../contexts/dialog'
import { routes } from '../../config/routes'
import BigNumber from 'bignumber.js'
import { RenterSidenav } from '../../components/RenterSidenav'
import { RenterdAuthedLayout } from '../../components/RenterdAuthedLayout'

export default function WalletView() {
  const transactions = useWalletTransactions()

  const { openDialog } = useDialog()

  const entities: EntityListItemProps[] = useMemo(
    () =>
      transactions.data
        ?.map((t): EntityListItemProps => {
          return {
            type: 'transaction',
            txType: getTransactionTypes(t.Raw),
            hash: t.ID,
            timestamp: new Date(t.Timestamp).getTime(),
            onClick: () => openDialog('transactionDetails', t.ID),
            sc: new BigNumber(t.Inflow).minus(t.Outflow),
          }
        })
        .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1)) || [],
    [transactions, openDialog]
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
      <WalletSparkline />
      <div className="flex flex-col gap-2">
        <EntityList title="Transactions" entities={entities} />
      </div>
    </RenterdAuthedLayout>
  )
}
