import {
  Button,
  Container,
  DatumCard,
  Flex,
  Grid,
  Heading,
  Panel,
  Text,
} from '@siafoundation/design-system'
import { WalletBalance } from '../components/WalletBalance'
import { useRouter } from 'next/router'
import { AuthedLayout } from '../components/AuthedLayout'
import { routes } from '../config/routes'
import { useDialog } from '../contexts/dialog'
import { useWallets } from '../contexts/wallets'
import {
  useSyncerPeers,
  useTxPoolTransactions,
} from '@siafoundation/react-siad'

export default function HomePage() {
  const { openDialog } = useDialog()
  const { wallets } = useWallets()
  const router = useRouter()
  const peers = useSyncerPeers()
  const txPool = useTxPoolTransactions()
  return (
    <AuthedLayout
      title=""
      actions={
        <Button
          size="2"
          variant="accent"
          onClick={() => openDialog('addWallet')}
        >
          Add wallet
        </Button>
      }
    >
      <Container size="4" css={{ padding: '$3-5' }}>
        <Flex direction="column" gap="6">
          <Flex direction="column" gap="2">
            <Heading font="mono">Overview</Heading>
            <Flex gap="3-5" wrap="wrap">
              <DatumCard
                label="Block height"
                entityType="block"
                entityValue={'455232'}
              />
              <DatumCard label="Connected peers" value={peers.data?.length} />
              <DatumCard
                label="Transactions in pool"
                value={txPool.data?.length}
              />
            </Flex>
          </Flex>
          <Flex direction="column" gap="2">
            <Heading font="mono">Wallets</Heading>
            <Grid columns="2" gap="3-5">
              {wallets.data?.map((wallet) => (
                <Panel
                  key={wallet.id}
                  css={{ padding: '$3', height: '200px', cursor: 'pointer' }}
                  onClick={() =>
                    router.push(routes.wallet.view.replace('[id]', wallet.id))
                  }
                >
                  <Flex direction="column">
                    <Heading>{wallet.name}</Heading>
                    <Text>{wallet.type}</Text>
                    <WalletBalance wallet={wallet} />
                  </Flex>
                </Panel>
              ))}
            </Grid>
          </Flex>
        </Flex>
      </Container>
    </AuthedLayout>
  )
}
