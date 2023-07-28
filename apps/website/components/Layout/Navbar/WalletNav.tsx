import {
  Application16,
  Terminal16,
  Text,
  Wallet16,
} from '@siafoundation/design-system'
import { routes } from '../../../config/routes'
import { useRouter } from 'next/router'
import { NavItem } from './NavItem'
import { NavbarLink } from './NavbarLink'

export function WalletNav() {
  const router = useRouter()

  return (
    <NavItem
      trigger={
        <NavbarLink
          size="16"
          underline={
            router.asPath.startsWith(routes.wallet.index) ? 'accent' : 'hover'
          }
          href={routes.wallet.index}
          title="Wallet"
        />
      }
      title={'Manage your wallet on the Sia network.'}
    >
      <Text color="verySubtle">Software</Text>
      <NavbarLink
        href={routes.wallet.coreSoftware}
        icon={<Terminal16 />}
        title="Core software"
      />
      <NavbarLink
        href={routes.wallet.thirdPartySoftware}
        icon={<Application16 />}
        title="Third-party software"
      />
      <Text color="verySubtle">Guides</Text>
      <NavbarLink
        href={routes.wallet.guides}
        icon={<Wallet16 />}
        title="Setting up a Ledger hardware wallet"
      />
    </NavItem>
  )
}
