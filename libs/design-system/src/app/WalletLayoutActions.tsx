import { NextLinkButton, Button } from '../core'
import { ArrowUpRight16, ArrowDownLeft16 } from '../icons'
import { WalletBalance } from './WalletBalance'

type Props = {
  routes: {
    wallet: {
      addresses: string
    }
  }
  sendSiacoin: () => void
}

export function WalletLayoutActions({ routes, sendSiacoin }: Props) {
  return (
    <>
      <WalletBalance />
      <NextLinkButton href={routes.wallet.addresses} size="1">
        <ArrowDownLeft16 />
        Receive
      </NextLinkButton>
      <Button size="1" variant="accent" onClick={sendSiacoin}>
        <ArrowUpRight16 />
        Send
      </Button>
    </>
  )
}
