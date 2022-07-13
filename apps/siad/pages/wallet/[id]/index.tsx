import {
  Button,
  Container,
  EntityList,
  EntityListItemProps,
  Flex,
  NextLinkButton,
  Text,
  Tooltip,
  truncate,
} from '@siafoundation/design-system'
import { useRouter } from 'next/router'
import { useWalletTransactions } from '@siafoundation/react-siad'
import { AuthedLayout } from '../../../components/AuthedLayout'
import { Wallet } from '../../../components/User/Wallet'
import { WalletSparkline } from '../../../components/WalletSparkline'
import { useWallets } from '../../../contexts/wallets'
import { routes } from '../../../config/routes'
import { useMemo } from 'react'
import { useDialog } from '../../../contexts/dialog'
import BigNumber from 'bignumber.js'

export default function WalletView() {
  const router = useRouter()
  const walletId = router.query.id as string
  const transactions = useWalletTransactions()

  const { activeWallet } = useWallets()

  const { openDialog } = useDialog()

  const entities: EntityListItemProps[] = useMemo(
    () =>
      transactions.data
        ?.map((t): EntityListItemProps => {
          return {
            type: 'transaction',
            hash: String(t.ID),
            timestamp: t.Timestamp.getTime(),
            onClick: () => openDialog('transactionDetails', String(t.ID)),
            sc: new BigNumber(String(t.Inflow)).minus(String(t.Outflow)),
          }
        })
        .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1)) || [],
    [transactions, openDialog]
  )

  return (
    <AuthedLayout
      title={`Wallets / ${truncate(activeWallet?.name, 20)}`}
      actions={
        <>
          <Wallet />
          <Button variant="accent" size="2">
            Send
          </Button>
          <NextLinkButton
            href={routes.wallet.receive.replace('[id]', walletId)}
            variant="accent"
            size="2"
          >
            Receive
          </NextLinkButton>
        </>
      }
    >
      <Container size="4" css={{ padding: '0 $3-5' }}>
        <Flex direction="column" gap="3" css={{ margin: '$3-5 0' }}>
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
        </Flex>
      </Container>
    </AuthedLayout>
  )
}
