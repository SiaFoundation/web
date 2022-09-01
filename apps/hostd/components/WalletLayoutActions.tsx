import {
  Button,
  NextLinkButton,
  ArrowUpRight16,
  ArrowDownLeft16,
} from '@siafoundation/design-system'
import { WalletBalance } from './WalletBalance'
import { routes } from '../config/routes'
import { useDialog } from '../contexts/dialog'

export function WalletLayoutActions() {
  const { openDialog } = useDialog()
  return (
    <>
      <WalletBalance />
      <NextLinkButton href={routes.wallet.addresses} size="1">
        <ArrowDownLeft16 />
        Receive
      </NextLinkButton>
      <Button
        size="1"
        variant="accent"
        onClick={() => openDialog('sendSiacoin')}
      >
        <ArrowUpRight16 />
        Send
      </Button>
    </>
  )
}
