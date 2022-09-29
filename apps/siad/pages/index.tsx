import {
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Panel,
  Text,
  AppAuthedLayout,
} from '@siafoundation/design-system'
import { useRouter } from 'next/router'
import { routes } from '../config/routes'
import { useDialog } from '../contexts/dialog'
import { useWallets } from '../contexts/wallets'

export default function HomePage() {
  const { openDialog } = useDialog()
  const { wallets } = useWallets()
  const router = useRouter()
  return (
    <AppAuthedLayout
      routes={routes}
      openSettings={() => openDialog('privacy')}
      title="siad"
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
                    {/* <WalletBalance wallet={wallet} /> */}
                  </Flex>
                </Panel>
              ))}
            </Grid>
          </Flex>
        </Flex>
      </Container>
    </AppAuthedLayout>
  )
}
