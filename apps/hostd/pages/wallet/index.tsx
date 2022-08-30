import {
  EntityList,
  EntityListItemProps,
  Flex,
  Text,
  Tooltip,
} from '@siafoundation/design-system'
import { useWalletTransactions } from '@siafoundation/react-core'
import { AuthedLayout } from '../../components/AuthedLayout'
import { WalletSparkline } from '../../components/WalletSparkline'
import { useMemo } from 'react'
import { useDialog } from '../../contexts/dialog'
import BigNumber from 'bignumber.js'
import { WalletLayoutActions } from '../../components/WalletLayoutActions'

export default function WalletView() {
  const transactions = useWalletTransactions()

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
    <AuthedLayout title="Wallet" actions={<WalletLayoutActions />}>
      <WalletSparkline />
      <Flex direction="column" gap="1">
        <EntityList
          title="Transactions"
          actions={
            <Flex gap="3" align="center">
              <Flex>
                <Tooltip content="Coming soon">
                  <Text weight="semibold" color="subtle">
                    Filters
                  </Text>
                </Tooltip>
              </Flex>
              <Flex>
                <Tooltip content="Coming soon">
                  <Text weight="semibold" color="subtle">
                    Sort by
                  </Text>
                </Tooltip>
              </Flex>
            </Flex>
          }
          entities={entities}
        />
      </Flex>
    </AuthedLayout>
  )
}
