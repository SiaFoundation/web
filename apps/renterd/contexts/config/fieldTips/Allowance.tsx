import { ConfigFields, Text, formSetFields } from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'
import React, { useMemo } from 'react'
import { Categories, SettingsData } from '../types'
import { calculateEstimatedSpending } from '@siafoundation/units'
import {
  CheckmarkFilled16,
  NextFilled16,
  PreviousFilled16,
  SubtractAlt16,
  WarningFilled16,
} from '@siafoundation/react-icons'
import { UseFormReturn } from 'react-hook-form'
import {
  useAllowanceDerivedPricingForEnabledFields,
  useEnabledAllowanceInSiacoin,
  useEnabledPricingValuesInSiacoin,
  useEnabledAllowanceFromEnabledPricingValues,
} from '../useAllowanceDerivedPricing'
import { useRedundancyMultiplier } from '../useRedundancyMultiplier'
import { allowanceFactor } from '../deriveAllowanceConfig'
import {
  TipAction,
  TipReadOnly,
  fitAllPricesToCurrentAllowanceTipContent,
} from './Tip'

export function AllowanceTips({
  form,
  fields,
}: {
  form: UseFormReturn<SettingsData>
  fields: ConfigFields<SettingsData, Categories>
}) {
  const enabledDerivedPrices = useAllowanceDerivedPricingForEnabledFields({
    form,
  })
  const enabledAllowance = useEnabledAllowanceFromEnabledPricingValues({
    form,
  })
  const pricesInSiacoin = useEnabledPricingValuesInSiacoin({
    form,
  })
  const allowanceMonth = useEnabledAllowanceInSiacoin({
    form,
  })
  const storageTB = form.watch('storageTB')
  const downloadTBMonth = form.watch('downloadTBMonth')
  const uploadTBMonth = form.watch('uploadTBMonth')
  const redundancyMultiplier = useRedundancyMultiplier({
    minShards: form.watch('minShards'),
    totalShards: form.watch('totalShards'),
  })

  const canCalculateAllowance = useMemo(() => {
    if (!pricesInSiacoin) {
      return false
    }
    const { maxStoragePriceTBMonth, maxUploadPriceTB, maxDownloadPriceTB } =
      pricesInSiacoin
    return (
      maxStoragePriceTBMonth?.gt(0) &&
      maxUploadPriceTB?.gt(0) &&
      maxDownloadPriceTB?.gt(0) &&
      storageTB?.gt(0) &&
      downloadTBMonth?.gt(0) &&
      uploadTBMonth?.gt(0)
    )
  }, [pricesInSiacoin, storageTB, downloadTBMonth, uploadTBMonth])

  const canCalculatePrices = useMemo(
    () => allowanceMonth?.gt(0),
    [allowanceMonth]
  )

  const canCheckPricing = useMemo(
    () => canCalculateAllowance && canCalculatePrices,
    [canCalculateAllowance, canCalculatePrices]
  )

  // Calculate the difference between the current spending and the allowance.
  // This does not check that the pricing values use the same weighting factors.
  const differencePercentage = useMemo(() => {
    if (!canCheckPricing) {
      return new BigNumber(0)
    }
    const { maxStoragePriceTBMonth, maxUploadPriceTB, maxDownloadPriceTB } =
      pricesInSiacoin
    const spending = calculateEstimatedSpending({
      maxStoragePriceTBMonth,
      maxDownloadPriceTB,
      maxUploadPriceTB,
      storageTB,
      downloadTBMonth,
      uploadTBMonth,
      redundancyMultiplier,
    })
    const scaledAllowance = allowanceMonth.times(allowanceFactor)
    const diff = scaledAllowance.minus(spending).abs()
    const percentage = diff.div(scaledAllowance).times(100)
    return percentage
  }, [
    allowanceMonth,
    pricesInSiacoin,
    storageTB,
    downloadTBMonth,
    uploadTBMonth,
    redundancyMultiplier,
    canCheckPricing,
  ])

  return (
    <>
      {canCheckPricing ? (
        differencePercentage.gt(1) ? (
          <TipReadOnly icon={<WarningFilled16 />} iconColor="amber">
            <Text size="12" ellipsis>
              Current pricing may not fit allowance
            </Text>
          </TipReadOnly>
        ) : (
          <TipReadOnly icon={<CheckmarkFilled16 />} iconColor="green">
            <Text size="12" ellipsis>
              Current pricing fits allowance
            </Text>
          </TipReadOnly>
        )
      ) : (
        <TipReadOnly icon={<SubtractAlt16 />} iconColor="subtle">
          <Text size="12" ellipsis color="subtle">
            Set allowance and pricing for feedback
          </Text>
        </TipReadOnly>
      )}
      <div className="flex flex-col gap-1.5">
        <TipAction
          icon={<NextFilled16 />}
          iconColor="contrast"
          disabled={!enabledDerivedPrices}
          tip={fitAllPricesToCurrentAllowanceTipContent}
          onClick={() => {
            if (!enabledDerivedPrices) {
              return
            }
            formSetFields({
              form,
              fields,
              values: enabledDerivedPrices,
              options: true,
            })
          }}
        >
          Set max prices to fit current allowance
        </TipAction>
        <TipAction
          icon={<PreviousFilled16 />}
          iconColor="contrast"
          disabled={!enabledAllowance}
          tip="Set the allowance to fit the current max prices for storage, upload, and download."
          onClick={() => {
            if (!enabledAllowance) {
              return
            }
            formSetFields({
              form,
              fields,
              values: enabledAllowance,
              options: true,
            })
          }}
        >
          Set allowance to fit current max prices
        </TipAction>
      </div>
    </>
  )
}
