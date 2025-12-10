import {
  Button,
  Text,
  Tooltip,
  ValueCurrency,
  Separator,
} from '@siafoundation/design-system'
import { UseFormReturn, useWatch } from 'react-hook-form'
import { InputValues } from '../types'
import BigNumber from 'bignumber.js'
import { useRedundancyMultiplier } from '../useRedundancyMultiplier'
import { Calculation16 } from '@siafoundation/react-icons'
import { toHastings } from '@siafoundation/units'

export function TipAction({
  children,
  tip,
  icon,
  iconColor,
  onClick,
  disabled,
}: {
  children: React.ReactNode
  icon: React.ReactNode
  iconColor?: React.ComponentProps<typeof Text>['color']
  tip?: React.ReactNode
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <Tooltip align="end" content={tip}>
      <div className="flex gap-1 items-center relative p-1 -m-1 overflow-hidden">
        <Text color={iconColor} className="flex relative">
          {icon}
        </Text>
        <Button
          size="small"
          onClick={onClick}
          disabled={disabled}
          className="flex-1"
        >
          {children}
        </Button>
      </div>
    </Tooltip>
  )
}

export function TipReadOnly({
  children,
  tip,
  icon,
  iconColor,
}: {
  children: React.ReactNode
  icon: React.ReactNode
  iconColor?: React.ComponentProps<typeof Text>['color']
  tip?: React.ReactNode
}) {
  return (
    <Tooltip align="end" content={tip}>
      <div className="flex gap-1 items-center relative overflow-hidden">
        <Text color={iconColor} className="flex relative">
          {icon}
        </Text>
        {children}
      </div>
    </Tooltip>
  )
}

export function PriceWithRedundancyTip({
  form,
  priceInSiacoin,
  units,
}: {
  form: UseFormReturn<InputValues>
  priceInSiacoin?: BigNumber
  units: string
}) {
  const minShards = useWatch({ control: form.control, name: 'minShards' })
  const totalShards = useWatch({ control: form.control, name: 'totalShards' })
  const redundancyMultiplier = useRedundancyMultiplier({
    minShards,
    totalShards,
  })
  if (!priceInSiacoin || !minShards || !totalShards) {
    return null
  }
  return (
    <>
      <Separator />
      <TipReadOnly
        tip={
          <>
            Price per {units} when factoring in the configured{' '}
            {minShards?.toString()} of {totalShards?.toString()} redundancy.
          </>
        }
        icon={<Calculation16 />}
      >
        <ValueCurrency
          font="sans"
          variant="value"
          size="12"
          fixed={0}
          showTooltip={false}
          extendedSuffix={`/${units} with redundancy`}
          value={toHastings(priceInSiacoin).times(redundancyMultiplier)}
        />
      </TipReadOnly>
    </>
  )
}

export const recommendationTipContent = (
  <>
    The system found a recommendation that would increase the number of usable
    hosts.
  </>
)
