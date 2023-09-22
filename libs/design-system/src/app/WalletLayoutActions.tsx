import BigNumber from 'bignumber.js'
import { Button } from '../core/Button'
import { ArrowUpRight16, ArrowDownLeft16 } from '@siafoundation/react-icons'
import { WalletBalance } from './WalletBalance'

type Props = {
  isSynced: boolean
  isWalletSynced: boolean
  syncPercent: number
  walletScanPercent: number
  sc?: BigNumber
  receiveSiacoin?: () => void
  sendSiacoin: () => void
}

export function WalletLayoutActions({
  isSynced,
  isWalletSynced,
  syncPercent,
  walletScanPercent,
  sc,
  sendSiacoin,
  receiveSiacoin,
}: Props) {
  return (
    <>
      <WalletBalance
        isSynced={isSynced && isWalletSynced}
        syncingMessage={
          !isSynced
            ? `Blockchain is syncing (${syncPercent}%), balance may be incorrect.`
            : `Wallet is scanning (${walletScanPercent}%), balance may be incorrect.`
        }
        sc={sc}
      />
      {receiveSiacoin && (
        <Button size="small" onClick={receiveSiacoin}>
          <ArrowDownLeft16 />
          Receive
        </Button>
      )}
      <Button size="small" variant="accent" onClick={sendSiacoin}>
        <ArrowUpRight16 />
        Send
      </Button>
    </>
  )
}
