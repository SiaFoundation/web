import {
  Application16,
  Link,
  Terminal16,
  Text,
  Wallet16,
} from '@siafoundation/design-system'
import { routes } from '../../../config/routes'
import { useRouter } from 'next/router'
import { NavbarHoverCard } from './NavbarHoverCard'

export function WalletNav() {
  const router = useRouter()

  return (
    <NavbarHoverCard
      trigger={
        <Link
          weight="medium"
          underline={
            router.asPath.startsWith(routes.wallet.index) ? 'accent' : 'hover'
          }
          href={routes.wallet.index}
        >
          Wallet
        </Link>
      }
      title={'Manage your wallet on the Sia network.'}
    >
      <Text color="verySubtle">Software</Text>
      <Link
        underline="hover"
        weight="medium"
        size="14"
        href={routes.wallet.coreSoftware}
        className="flex gap-2 items-center"
      >
        <Terminal16 />
        Core software
      </Link>
      <Link
        underline="hover"
        weight="medium"
        size="14"
        href={routes.wallet.thirdPartySoftware}
        className="flex gap-2 items-center"
      >
        <Application16 />
        Third-party software
      </Link>
      <Text color="verySubtle">Guides</Text>
      <Link
        underline="hover"
        weight="medium"
        size="14"
        href={routes.wallet.guides}
        className="flex gap-2 items-center"
      >
        <Wallet16 />
        Setting up a Ledger hardware wallet
      </Link>
    </NavbarHoverCard>
  )
}
