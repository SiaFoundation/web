import {
  Button,
  Container,
  EntityList,
  EntityListItemProps,
  EntityTypes,
  Flex,
  Text,
} from '@siafoundation/design-system'
import { times } from 'lodash'
import { useRouter } from 'next/router'
// import {
//   useWalletAddresses,
//   useWalletBalance,
//   useWalletSeedIndex,
//   useWalletTransactions,
//   useWalletUtxos,
// } from '@siafoundation/react-siad'
import { AuthedLayout } from '../../components/AuthedLayout'
import { Wallet } from '../../components/User/Wallet'
import { WalletSparkline } from '../../components/WalletSparkline'
import { fakeWallets } from '../../lib/fakeWallets'
import BigNumber from 'bignumber.js'

const inSc = (i: number) => i * 1e24

const entities: EntityListItemProps[] = times(20, (i) => ({
  type: EntityTypes.transaction,
  hash: '39vewj8kxkpx828hffh28' + i,
  timestamp: new Date().getTime() - 1_000 * 60 * 60 * 24 * i,
  sc: new BigNumber(inSc(1e1) - i * inSc(1e8)),
}))

export default function WalletView() {
  const router = useRouter()
  const walletId = router.query.id as string
  // const balance = useWalletBalance({
  //   refreshInterval: 5_000,
  // })
  // const transactions = useWalletTransactions()
  // const utxos = useWalletUtxos()
  // const seedIndex = useWalletSeedIndex()
  // const addresses = useWalletAddresses()
  // const peers = useSyncerPeers()
  // const connect = useSyncerConnect()
  // const poolTransactions = useTxPoolTransactions({
  //   refreshInterval: 5_000,
  // })
  // const broadcast = useTxPoolBroadcast()
  // const tip = useConsensusTip({
  //   refreshInterval: 1_000,
  // })

  const wallet = fakeWallets.find((w) => w.id === walletId)

  return (
    <AuthedLayout
      title={`Wallet ${wallet?.name}`}
      actions={
        <>
          <Wallet />
          <Button variant="accent" size="2">
            Send
          </Button>
          <Button variant="accent" size="2">
            Receive
          </Button>
        </>
      }
    >
      <Flex direction="column" gap="2" css={{ paddingBottom: '$5' }}>
        <WalletSparkline entities={entities} />
        <Container size="4">
          <Flex direction="column" gap="1">
            <EntityList
              title="Transactions"
              actions={
                <Flex gap="3" align="center">
                  <Flex>
                    <Text weight="semibold" color="subtle">
                      Filters
                    </Text>
                  </Flex>
                  <Flex>
                    <Text weight="semibold" color="subtle">
                      Sort by
                    </Text>
                  </Flex>
                </Flex>
              }
              entities={entities}
            />
          </Flex>
        </Container>
      </Flex>
    </AuthedLayout>
  )
}
