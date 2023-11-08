import { Text } from '../core/Text'
import { humanSiacoin } from '@siafoundation/sia-js'
import BigNumber from 'bignumber.js'
import { Tooltip } from '../core/Tooltip'
import { ValueSc } from '../components/ValueSc'

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

  if (!isSynced) {
    return (
      <Tooltip
        side="right"
        content={
          syncingMessage || 'Blockchain is syncing, balance may be incorrect.'
        }
      >
        <Text size="12" weight="medium">
          {humanSiacoin(balanceSc.spendable.plus(balanceSc.unconfirmed), {
            fixed: 0,
          })}
        </Text>
      </Tooltip>
    )
  }

  return (
    <Tooltip
      side="right"
      content={
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <div className="flex flex-col flex-1">
              <Text>spendable</Text>
              <Text color="subtle">All confirmed outputs not in-use.</Text>
            </div>
            <div className="flex justify-end">
              <ValueSc variant="value" value={balanceSc.spendable} />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col flex-1">
              <Text>confirmed</Text>
              <Text color="subtle">All confirmed outputs.</Text>
            </div>
            <div className="flex justify-end">
              <ValueSc variant="value" value={balanceSc.confirmed} />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col flex-1">
              <Text>unconfirmed</Text>
              <Text color="subtle">All unconfirmed outputs not in-use.</Text>
            </div>
            <div className="flex justify-end">
              <ValueSc variant="value" value={balanceSc.unconfirmed} />
            </div>
          </div>
        </div>
      }
    >
      <Text size="12" weight="medium">
        {humanSiacoin(balanceSc.spendable.plus(balanceSc.unconfirmed), {
          fixed: 0,
        })}
      </Text>
    </Tooltip>
  )
}
