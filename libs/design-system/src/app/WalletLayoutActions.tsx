import { Button } from '../core'
import { ArrowUpRight16, ArrowDownLeft16 } from '../icons'
import { WalletBalance } from './WalletBalance'

type Props = {
  receiveSiacoin: () => void
  sendSiacoin: () => void
}

export function WalletLayoutActions({ sendSiacoin, receiveSiacoin }: Props) {
  return (
    <>
      <WalletBalance />
      <Button size="1" onClick={receiveSiacoin}>
        <ArrowDownLeft16 />
        Receive
      </Button>
      <Button size="1" variant="accent" onClick={sendSiacoin}>
        <ArrowUpRight16 />
        Send
      </Button>
    </>
  )
}
