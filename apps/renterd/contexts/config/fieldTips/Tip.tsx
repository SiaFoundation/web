import {
  Button,
  Text,
  Tooltip,
  ValueScFiat,
  Separator,
} from '@siafoundation/design-system'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { SettingsData } from '../types'
import BigNumber from 'bignumber.js'
import { useRedundancyMultiplier } from '../useRedundancyMultiplier'
import { Calculation16 } from '@siafoundation/react-icons'
import { toHastings } from '@siafoundation/units'
import {
  downloadWeight,
  storageWeight,
  uploadWeight,
} from '../deriveAllowanceConfig'

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
  form: UseFormReturn<SettingsData>
  priceInSiacoin: BigNumber
  units: string
}) {
  const minShards = form.watch('minShards')
  const totalShards = form.watch('totalShards')
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
        <ValueScFiat
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

export const fitPriceToCurrentAllowanceTipContent = (
  <>
    Set suggested max price that fits the current allowance spending target.
    This suggested value takes into account the current estimated usage and
    keeps storage, upload, and download upload prices proportional to each other
    according to the following weights: {storageWeight}x storage, {uploadWeight}
    x upload, {downloadWeight}x download.
  </>
)

export const fitAllPricesToCurrentAllowanceTipContent = (
  <>
    Set suggested max prices for storage, upload, and download that fit the
    current allowance spending target. The suggested values take into account
    the current estimated usage and keeps storage, upload, and download upload
    prices proportional to each other according to the following weights:{' '}
    {storageWeight}x storage, {uploadWeight}x upload, {downloadWeight}x
    download.
  </>
)

export const recommendationTipContent = (
  <>
    The system found a recommendation that would increase the number of usable
    hosts.
  </>
)