import {
  EntityList,
  EntityListItemProps,
  Text,
  Tooltip,
  WalletSparkline,
  WalletLayoutActions,
} from '@siafoundation/design-system'
import { useWalletTransactions } from '@siafoundation/react-core'
import { HostdAuthedLayout } from '../../components/HostdAuthedLayout'
import { useMemo } from 'react'
import { useDialog } from '../../contexts/dialog'
import BigNumber from 'bignumber.js'

export default function WalletView() {
  const transactions = useWalletTransactions({
    params: {},
  })

  const { openDialog } = useDialog()

  const entities: EntityListItemProps[] = useMemo(
    () =>
      transactions.data
        ?.map((t): EntityListItemProps => {
          return {
            type: 'transaction',
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
    <HostdAuthedLayout
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
        <EntityList
          title="Transactions"
          actions={
            <div className="flex gap-6 items-center">
              <div className="flex gap-1">
                <Tooltip content="Coming soon">
                  <Text weight="semibold" color="subtle">
                    Filters
                  </Text>
                </Tooltip>
              </div>
              <div className="flex gap-1">
                <Tooltip content="Coming soon">
                  <Text weight="semibold" color="subtle">
                    Sort by
                  </Text>
                </Tooltip>
              </div>
            </div>
          }
          entities={entities}
        />
      </div>
    </HostdAuthedLayout>
  )
}
