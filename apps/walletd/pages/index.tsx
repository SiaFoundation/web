import {
  Button,
  Container,
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
      appName="walletd"
      routes={routes}
      connectivityRoute="/consensus/state"
      openSettings={() => openDialog('privacy')}
      isSynced
      profile={<>hello</>}
      title="walletd"
      actions={
        <Button
          size="medium"
          variant="accent"
          onClick={() => openDialog('addWallet')}
        >
          Add wallet
        </Button>
      }
    >
      <Container size="4" className="p-7">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <Heading font="mono">Wallets</Heading>
            <div className="grid grid-cols-2 gap-7">
              {wallets.data?.map((wallet) => (
                <Panel
                  key={wallet.id}
                  className="p-6 h-[200px] cursor-pointer"
                  onClick={() =>
                    router.push(routes.wallet.view.replace('[id]', wallet.id))
                  }
                >
                  <div className="flex flex-col gap-1">
                    <Heading>{wallet.name}</Heading>
                    <Text>{wallet.type}</Text>
                    {/* <WalletBalance wallet={wallet} /> */}
                  </div>
                </Panel>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </AppAuthedLayout>
  )
}
