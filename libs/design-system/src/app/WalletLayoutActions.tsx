import BigNumber from 'bignumber.js'
import { Button } from '../core/Button'
import { ArrowUpRight16, ArrowDownLeft16 } from '../icons/carbon'
import { WalletBalance } from './WalletBalance'

type Props = {
  sc?: BigNumber
  receiveSiacoin: () => void
  sendSiacoin: () => void
}

export function WalletLayoutActions({
  sc,
  sendSiacoin,
  receiveSiacoin,
}: Props) {
  return (
    <>
      <WalletBalance sc={sc} />
      <Button size="small" onClick={receiveSiacoin}>
        <ArrowDownLeft16 />
        Receive
      </Button>
      <Button size="small" variant="accent" onClick={sendSiacoin}>
        <ArrowUpRight16 />
        Send
      </Button>
    </>
  )
}
