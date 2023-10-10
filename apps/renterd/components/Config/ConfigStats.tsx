import {
  Text,
  TBToBytes,
  ValueSc,
  ValueNum,
  useSiacoinFiat,
} from '@siafoundation/design-system'
import { humanBytes, toHastings } from '@siafoundation/sia-js'
import { useConfig } from '../../contexts/config'
import { useApp } from '../../contexts/app'

export function AutopilotStats() {
  const { autopilot } = useApp()
  const {
    canEstimate,
    estimatedSpendingPerMonth,
    estimatedSpendingPerTB,
    redundancyMultiplier,
    storageTB,
    showAdvanced,
  } = useConfig()
  const perMonth = useSiacoinFiat({ sc: estimatedSpendingPerMonth })
  const perTB = useSiacoinFiat({ sc: estimatedSpendingPerTB })

  if (autopilot.status !== 'on') {
    return null
  }

  return !canEstimate ? (
    <Text size="12" font="mono" weight="medium">
      {showAdvanced
        ? 'Enter expected storage, period, and allowance values to estimate monthly spending.'
        : 'Enter expected storage and max price to estimate monthly spending.'}
    </Text>
  ) : (
    <div className="flex gap-4">
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
        <Text size="12" font="mono" weight="medium">
          per TB/month with {redundancyMultiplier.toFixed(1)}x redundancy
        </Text>
      </div>
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
        <Text size="12" font="mono" weight="medium">
          to store {humanBytes(TBToBytes(storageTB).toNumber())}/month with{' '}
          {redundancyMultiplier.toFixed(1)}x redundancy
        </Text>
      </div>
    </div>
  )
}
