import { Text } from '../core/Text'
import BigNumber from 'bignumber.js'
import { Tooltip } from '../core/Tooltip'
import { ValueScFiat } from '../components/ValueScFiat'
import { Separator } from '../core/Separator'

export function WalletBalanceTip({
  side,
  balanceSc,
  children,
}: {
  side?: 'left' | 'right' | 'top' | 'bottom'
  balanceSc?: {
    unconfirmed: BigNumber
    confirmed: BigNumber
    spendable: BigNumber
    immature: BigNumber
  }
  children: React.ReactNode
}) {
  if (!balanceSc) {
    return null
  }

  return (
    <Tooltip
      side={side}
      content={
        <div className="flex flex-col justify-center gap-2">
          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <Text size="12">spendable</Text>
              <Text size="12" color="subtle">
                All confirmed outputs not in-use.
              </Text>
            </div>
            <div className="flex justify-end">
              <ValueScFiat
                displayBoth
                variant="value"
                value={balanceSc.spendable}
              />
            </div>
          </div>
          {balanceSc.immature && (
            <>
              <Separator className="w-full" />
              <div className="flex gap-4">
                <div className="flex flex-col flex-1">
                  <Text size="12">immature</Text>
                  <Text size="12" color="subtle">
                    All confirmed but still locked outputs.
                  </Text>
                </div>
                <div className="flex justify-end">
                  <ValueScFiat
                    displayBoth
                    variant="value"
                    value={balanceSc.unconfirmed}
                  />
                </div>
              </div>
            </>
          )}
          <Separator className="w-full" />
          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <Text size="12">confirmed</Text>
              <Text size="12" color="subtle">
                All confirmed outputs.
              </Text>
            </div>
            <div className="flex justify-end">
              <ValueScFiat
                displayBoth
                variant="value"
                value={balanceSc.confirmed}
              />
            </div>
          </div>
          <Separator className="w-full" />
          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <Text size="12">unconfirmed</Text>
              <Text size="12" color="subtle">
                All unconfirmed outputs not in-use.
              </Text>
            </div>
            <div className="flex justify-end">
              <ValueScFiat
                displayBoth
                variant="value"
                value={balanceSc.unconfirmed}
              />
            </div>
          </div>
        </div>
      }
    >
      <div>{children}</div>
    </Tooltip>
  )
}
