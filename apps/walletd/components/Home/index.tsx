import {
  Button,
  Container,
  Heading,
  Panel,
  Text,
  Add16,
} from '@siafoundation/design-system'
import { useRouter } from 'next/router'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { useWallets } from '../../contexts/wallets'
import { WalletdAuthedLayout } from '../WalletdAuthedLayout'
import { WalletdSidenav } from '../WalletdSidenav'

export function Home() {
  const { openDialog } = useDialog()
  const { wallets } = useWallets()
  const router = useRouter()
  return (
    <WalletdAuthedLayout
      routes={routes}
      sidenav={<WalletdSidenav />}
      openSettings={() => openDialog('settings')}
      title="Wallets"
      actions={
        <Button variant="accent" onClick={() => openDialog('settings')}>
          <Add16 />
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
    </WalletdAuthedLayout>
  )
}
