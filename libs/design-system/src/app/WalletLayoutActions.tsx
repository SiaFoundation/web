import { ArrowDownLeft16, ArrowUpRight16 } from '@siafoundation/react-icons'
import type BigNumber from 'bignumber.js'
import { Button } from '../core/Button'
import { WalletBalance } from './WalletBalance'

type Props = {
  isSynced: boolean
  isWalletSynced: boolean
  syncPercent: number
  walletScanPercent: number
  balanceSc?: {
    unconfirmed: BigNumber
    confirmed: BigNumber
    spendable: BigNumber
  }
  receiveSiacoin?: () => void
  sendSiacoin: () => void
}

export function WalletLayoutActions({
  isSynced,
  isWalletSynced,
  syncPercent,
  walletScanPercent,
  balanceSc,
  sendSiacoin,
  receiveSiacoin,
}: Props) {
  return (
    <>
      {balanceSc && (
        <WalletBalance
          isSynced={isSynced && isWalletSynced}
          syncingMessage={
            !isSynced
              ? `Blockchain is syncing (${syncPercent}%), balance may be incorrect.`
              : `Wallet is scanning (${walletScanPercent}%), balance may be incorrect.`
          }
          balanceSc={balanceSc}
        />
      )}
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
