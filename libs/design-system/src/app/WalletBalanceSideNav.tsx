import type BigNumber from 'bignumber.js'
import { ValueScFiat } from '../components/ValueScFiat'
import { Tooltip } from '../core/Tooltip'
import { WalletBalanceTip } from './WalletBalanceTip'

export function WalletBalanceSideNav({
  balanceSc,
  isSynced,
  syncingMessage,
}: {
  balanceSc?: {
    unconfirmed: BigNumber
    confirmed: BigNumber
    spendable: BigNumber
  }
  isSynced: boolean
  syncingMessage?: string
}) {
  if (!balanceSc) {
    return null
  }

  const el = (
    <ValueScFiat
      showTooltip={false}
      value={balanceSc.spendable.plus(balanceSc.unconfirmed)}
      variant="value"
      size="12"
      fixed={0}
      fixedFiat={0}
    />
  )

  if (!isSynced) {
    return (
      <Tooltip
        side="right"
        content={
          syncingMessage || 'Blockchain is syncing, balance may be incorrect.'
        }
      >
        <div>{el}</div>
      </Tooltip>
    )
  }

  return (
    <WalletBalanceTip side="right" balanceSc={balanceSc}>
      {el}
    </WalletBalanceTip>
  )
}
