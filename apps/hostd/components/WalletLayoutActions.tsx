import {
  Button,
  NextLinkButton,
  ArrowUpRight16,
  ArrowDownLeft16,
} from '@siafoundation/design-system'
import { WalletBalance } from './WalletBalance'
import { routes } from '../config/routes'

export function WalletLayoutActions() {
  return (
    <>
      <WalletBalance />
      <NextLinkButton href={routes.wallet.addresses} size="1">
        <ArrowDownLeft16 />
        Receive
      </NextLinkButton>
      <Button size="1" variant="accent">
        <ArrowUpRight16 />
        Send
      </Button>
    </>
  )
}
