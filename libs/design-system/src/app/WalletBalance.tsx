import { Warning16 } from '@siafoundation/react-icons'
import type BigNumber from 'bignumber.js'
import { ValueScFiat } from '../components/ValueScFiat'
import { Panel } from '../core/Panel'
import { Text } from '../core/Text'
import { Tooltip } from '../core/Tooltip'
import { WalletBalanceTip } from './WalletBalanceTip'

export function WalletBalance({
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

  if (!isSynced) {
    return (
      <Tooltip
        content={
          syncingMessage || 'Blockchain is syncing, balance may be incorrect.'
        }
      >
        <Panel className="hidden sm:flex h-7 pl-2 pr-3 gap-1.5 items-center">
          <Text color="amber">
            <Warning16 />
          </Text>
          <ValueScFiat
            variant="value"
            value={balanceSc.spendable.plus(balanceSc.unconfirmed)}
            size="12"
            showTooltip={false}
          />
        </Panel>
      </Tooltip>
    )
  }

  return (
    <WalletBalanceTip side="bottom" balanceSc={balanceSc}>
      <Panel className="hidden sm:flex h-7 px-3 items-center">
        <ValueScFiat
          variant="value"
          value={balanceSc.spendable.plus(balanceSc.unconfirmed)}
          size="12"
          showTooltip={false}
        />
      </Panel>
    </WalletBalanceTip>
  )
}
