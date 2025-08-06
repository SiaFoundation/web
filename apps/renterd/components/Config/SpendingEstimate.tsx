import {
  Option,
  Select,
  SiacoinField,
  Text,
  ValueCurrency,
} from '@siafoundation/design-system'
import { useConfig } from '../../contexts/config'
import { Information20, PendingFilled20 } from '@siafoundation/react-icons'
import { maxPricingFactor } from '../../contexts/config/spendingConfig'
import useLocalStorageState from 'use-local-storage-state'
import { useSpendingEstimate } from '../../contexts/config/useSpendingEstimate'
import { RebalancePrices } from './RebalancePrices'
import { useRedundancyMultiplier } from '../../contexts/config/useRedundancyMultiplier'
import { HangingNavItem } from './HangingNavItem'
import { toHastings } from '@siafoundation/units'

export function SpendingEstimate() {
  const { form } = useConfig()
  const storageTB = form.watch('storageTB')
  const [mode, setMode] = useLocalStorageState<'total' | 'tb'>(
    'v0/renterd/config/spendingEstimateMode',
    {
      defaultValue: 'total',
    },
  )

  const minShards = form.watch('minShards')
  const totalShards = form.watch('totalShards')
  const { estimatedSpendingPerMonth, estimatedSpendingPerTB } =
    useSpendingEstimate()
  const redundancy = useRedundancyMultiplier({
    minShards,
    totalShards,
  })

  const modeSelector = (
    <div className="flex gap-2 items-center">
      <Select
        aria-label="select spending estimate mode"
        name="spendingEstimateMode"
        value={mode}
        onChange={(e) => setMode(e.target.value as 'total' | 'tb')}
      >
        <Option value="total">
          total cost for 1TB with {redundancy.toNumber()}x redundancy
        </Option>
        <Option value="tb">
          cost per TB with {redundancy.toNumber()}x redundancy
        </Option>
      </Select>
      <RebalancePrices estimatedSpendingPerMonth={estimatedSpendingPerMonth} />
    </div>
  )

  if (!(estimatedSpendingPerMonth && estimatedSpendingPerTB && storageTB)) {
    return null
  }

  return (
    <HangingNavItem
      testId="spendingEstimate"
      localStorageKey="config/spendingEstimate"
      canMaximizeControls
      tip={
        <div className="p-2">
          <Text size="14" color="subtle">
            The spending estimate is calculated using the current estimated
            usage and max price values. The estimate assumes spending will be
            across a distribution of hosts with various prices that fit within
            max price values, this is modeled with a factor of{' '}
            {maxPricingFactor}
            x.
          </Text>
        </div>
      }
      heading={
        <div className="flex gap-2 items-center">
          <Text color="amber">
            <Information20 />
          </Text>
          <Text size="16" weight="medium" color="contrast" noWrap>
            Spending estimate
          </Text>
          {estimatedSpendingPerMonth && (
            <ValueCurrency
              variant="value"
              fixed={0}
              fixedFiat={0}
              showTooltip={false}
              value={toHastings(estimatedSpendingPerMonth)}
              displayBoth={false}
            />
          )}
        </div>
      }
    >
      <div className="p-2 flex flex-col gap-2">
        {estimatedSpendingPerMonth && estimatedSpendingPerTB && storageTB ? (
          mode === 'total' ? (
            <>
              {modeSelector}
              <SiacoinField
                name="estimatedSpendingPerMonth"
                tabIndex={-1}
                className="min-w-[250px]"
                readOnly
                sc={estimatedSpendingPerMonth}
                size="small"
                units="SC/month"
                unitsFiatPostfix="/month"
                decimalsLimitSc={0}
                decimalsLimitFiat={2}
              />
            </>
          ) : (
            <>
              {modeSelector}
              <SiacoinField
                name="estimatedSpendingPerTBPerMonth"
                tabIndex={-1}
                className="min-w-[250px]"
                readOnly
                sc={estimatedSpendingPerTB}
                size="small"
                units="SC/month"
                unitsFiatPostfix="/month"
                decimalsLimitSc={0}
                decimalsLimitFiat={2}
              />
            </>
          )
        ) : (
          <div className="flex gap-2 items-center">
            <Text color="contrast">
              <PendingFilled20 />
            </Text>
            <Text size="16" weight="medium">
              The system will estimate spending once expected usage and pricing
              fields are filled.
            </Text>
          </div>
        )}
      </div>
    </HangingNavItem>
  )
}
