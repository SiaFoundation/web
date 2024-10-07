import {
  Text,
  ValueSc,
  ValueNum,
  useSiacoinFiat,
  ScrollArea,
} from '@siafoundation/design-system'
import { TBToBytes, humanBytes, toHastings } from '@siafoundation/units'
import { useConfig } from '../../contexts/config'
import { useApp } from '../../contexts/app'
import { useEstimatedSpending } from './useEstimatedSpending'

export function ConfigStats() {
  const { autopilotInfo } = useApp()
  const { redundancyMultiplier, storageTB, configViewMode } = useConfig()

  const { estimatedSpendingPerMonth, estimatedSpendingPerTB } =
    useEstimatedSpending()

  const perMonth = useSiacoinFiat({ sc: estimatedSpendingPerMonth })
  const perTB = useSiacoinFiat({ sc: estimatedSpendingPerTB })

  if (!autopilotInfo.data?.isAutopilotEnabled) {
    return null
  }
  const canEstimate =
    estimatedSpendingPerMonth && estimatedSpendingPerTB && storageTB

  return !canEstimate ? (
    <Text size="12" font="mono" weight="medium">
      {configViewMode === 'advanced'
        ? 'Enter expected storage, period, and allowance values to estimate monthly spending.'
        : 'Enter expected storage and max price to estimate monthly spending.'}
    </Text>
  ) : (
    <ScrollArea>
      <div className="flex gap-4 items-center h-full">
        <Text size="12" font="mono" weight="medium">
          Estimate:
        </Text>
        <div className="flex gap-1">
          <ValueSc
            size="12"
            value={toHastings(estimatedSpendingPerTB)}
            dynamicUnits={false}
            fixed={0}
            variant="value"
          />
          {perTB.fiat && (
            <div className="flex">
              <ValueNum
                size="12"
                weight="medium"
                value={perTB.fiat}
                color="subtle"
                variant="value"
                format={(v) =>
                  `(${perTB.currency.prefix}${v.toFixed(perTB.currency.fixed)})`
                }
              />
            </div>
          )}
          <Text size="12" font="mono" weight="medium" ellipsis>
            per TB/month with {redundancyMultiplier.toFixed(1)}x redundancy
          </Text>
        </div>
        {/* additionally show estimated spending for total storage if it's different from per TB */}
        {!estimatedSpendingPerTB.eq(estimatedSpendingPerMonth) && (
          <div className="flex gap-1">
            <ValueSc
              size="12"
              value={toHastings(estimatedSpendingPerMonth)}
              dynamicUnits={false}
              fixed={0}
              variant="value"
            />
            {perMonth.fiat && (
              <div className="flex">
                <ValueNum
                  size="12"
                  weight="medium"
                  value={perMonth.fiat}
                  color="subtle"
                  variant="value"
                  format={(v) =>
                    `(${perMonth.currency.prefix}${v.toFixed(
                      perMonth.currency.fixed
                    )})`
                  }
                />
              </div>
            )}
            <Text size="12" font="mono" weight="medium" ellipsis>
              to store {humanBytes(TBToBytes(storageTB).toNumber())}/month with{' '}
              {redundancyMultiplier.toFixed(1)}x redundancy
            </Text>
          </div>
        )}
      </div>
    </ScrollArea>
  )
}
