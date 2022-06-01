import {
  Box,
  Button,
  Checkmark16,
  Container,
  Flex,
  Panel,
  Text,
} from '@siafoundation/design-system'
// import {
//   useWalletAddresses,
//   useWalletBalance,
//   useWalletSeedIndex,
//   useWalletTransactions,
//   useWalletUtxos,
// } from '@siafoundation/react-siad'
import { useParams } from 'react-router-dom'
import { AuthedLayout } from '../components/AuthedLayout'
import { Wallet } from '../components/User/Wallet'
import { WalletSparkline } from '../components/WalletSparkline'

export function WalletView() {
  const { walletId } = useParams()
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
  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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
      <Flex direction="column" gap="4" css={{ paddingBottom: '$5' }}>
        <Box css={{ height: '200px', width: '100%' }}>
          <WalletSparkline />
        </Box>
        <Container size="4">
          <Flex direction="column" gap="1">
            <Panel css={{ position: 'relative' }}>
              <Flex
                css={{
                  padding: '$3 $3 $2-5',
                  borderBottom: '1px solid $brandGray3',
                }}
                align="center"
                justify="between"
              >
                <Flex css={{ flex: 3 }}>
                  <Text weight="semibold" color="subtle">
                    Amount
                  </Text>
                </Flex>
                <Flex css={{ flex: 3 }}>
                  <Text weight="semibold" color="subtle">
                    Transaction ID
                  </Text>
                </Flex>
                <Flex css={{ flex: 3 }}>
                  <Text weight="semibold" color="subtle">
                    Time
                  </Text>
                </Flex>
                <Flex css={{ flex: 2 }}>
                  <Text weight="semibold" color="subtle">
                    Type
                  </Text>
                </Flex>
                <Flex css={{ flex: 1 }}>
                  <Text weight="semibold" color="subtle">
                    Status
                  </Text>
                </Flex>
              </Flex>
              {rows.map((i) => (
                <Flex
                  css={{
                    height: '70px',
                    padding: '0 $3',
                    borderBottom: '1px solid $brandGray2',
                    '&:last-of-type': {
                      borderBottom: 'none',
                    },
                  }}
                  align="center"
                  justify="between"
                >
                  <Flex css={{ flex: 3 }}>
                    <Text weight="semibold" color="contrast">
                      {(Math.random() * 10000).toFixed(0)} SC
                    </Text>
                  </Flex>
                  <Flex css={{ flex: 3 }}>
                    <Text weight="semibold" color="contrast">
                      00fx9f2m4f9dw0842fd
                    </Text>
                  </Flex>
                  <Flex css={{ flex: 3 }}>
                    <Text weight="semibold" color="contrast">
                      Jan 25, 2022
                    </Text>
                  </Flex>
                  <Flex css={{ flex: 2 }}>
                    <Text weight="semibold" color="contrast">
                      Siacoin
                    </Text>
                  </Flex>
                  <Flex css={{ flex: 1 }}>
                    <Text weight="semibold" color="contrast">
                      <Checkmark16 />
                    </Text>
                  </Flex>
                </Flex>
              ))}
            </Panel>
          </Flex>
        </Container>
      </Flex>
    </AuthedLayout>
  )
}
