import {
  ConfigFields,
  TipNumber,
  formSetField,
} from '@siafoundation/design-system'
import React from 'react'
import { Categories, RecommendationItem, SettingsData } from '../types'
import { fiatToSiacoin, toHastings } from '@siafoundation/units'
import { UseFormReturn } from 'react-hook-form'
import {
  useAllowanceDerivedPricingForEnabledFields,
  useForexExchangeRate,
} from '../useAllowanceDerivedPricing'
import {
  PriceWithRedundancyTip,
  fitPriceToCurrentAllowanceTipContent,
  recommendationTipContent,
} from './Tip'

export function MaxStoragePriceTips({
  form,
  fields,
  recommendations,
}: {
  form: UseFormReturn<SettingsData>
  fields: ConfigFields<SettingsData, Categories>
  recommendations: Partial<Record<keyof SettingsData, RecommendationItem>>
}) {
  const derived = useAllowanceDerivedPricingForEnabledFields({
    form,
  })
  const maxStoragePriceTBMonth = form.watch('maxStoragePriceTBMonth')
  const recommendationPrice =
    recommendations?.maxStoragePriceTBMonth?.targetValue

  return (
    <>
      {derived && (
        <TipNumber
          type="siacoin"
          label="Fit current allowance"
          tip={fitPriceToCurrentAllowanceTipContent}
          decimalsLimit={0}
          value={toHastings(derived.maxStoragePriceTBMonth)}
          onClick={() => {
            formSetField({
              form,
              fields,
              name: 'maxStoragePriceTBMonth',
              value: derived.maxStoragePriceTBMonth,
              options: true,
            })
          }}
        />
      )}
      {recommendationPrice && (
        <TipNumber
          type="siacoin"
          label="Match with more hosts"
          tip={recommendationTipContent}
          decimalsLimit={0}
          value={toHastings(recommendationPrice)}
          onClick={() =>
            formSetField({
              form,
              fields,
              name: 'maxStoragePriceTBMonth',
              value: recommendationPrice,
              options: true,
            })
          }
        />
      )}
      <PriceWithRedundancyTip
        form={form}
        priceInSiacoin={maxStoragePriceTBMonth}
        units="TB/month"
      />
    </>
  )
}

export function MaxStoragePricePinnedTips({
  form,
  fields,
  recommendations,
}: {
  form: UseFormReturn<SettingsData>
  fields: ConfigFields<SettingsData, Categories>
  recommendations: Partial<Record<keyof SettingsData, RecommendationItem>>
}) {
  const derived = useAllowanceDerivedPricingForEnabledFields({
    form,
  })
  const exchangeRate = useForexExchangeRate({
    form,
  })
  const maxStoragePriceTBMonthPinned = form.watch(
    'maxStoragePriceTBMonthPinned'
  )
  const currentPriceInSiacoin =
    maxStoragePriceTBMonthPinned && exchangeRate
      ? fiatToSiacoin(maxStoragePriceTBMonthPinned, exchangeRate)
      : null
  const derivedPriceInSiacoin =
    derived?.maxStoragePriceTBMonthPinned && exchangeRate
      ? fiatToSiacoin(derived.maxStoragePriceTBMonthPinned, exchangeRate)
      : null
  const recommendationInFiat =
    recommendations?.maxStoragePriceTBMonthPinned?.targetValue
  const recommendationInSiacoin =
    recommendationInFiat && exchangeRate
      ? fiatToSiacoin(recommendationInFiat, exchangeRate)
      : null

  return (
    <>
      {derived && (
        <TipNumber
          type="siacoin"
          label="Fit current allowance"
          tip={fitPriceToCurrentAllowanceTipContent}
          decimalsLimit={0}
          value={toHastings(derivedPriceInSiacoin)}
          onClick={() => {
            formSetField({
              form,
              fields,
              name: 'maxStoragePriceTBMonthPinned',
              value: derived.maxStoragePriceTBMonthPinned,
              options: true,
            })
          }}
        />
      )}
      {recommendationInSiacoin && (
        <TipNumber
          type="siacoin"
          label="Match with more hosts"
          tip={recommendationTipContent}
          decimalsLimit={0}
          value={toHastings(recommendationInSiacoin)}
          onClick={() =>
            formSetField({
              form,
              fields,
              name: 'maxStoragePriceTBMonthPinned',
              value: recommendationInFiat,
              options: true,
            })
          }
        />
      )}
      <PriceWithRedundancyTip
        form={form}
        priceInSiacoin={currentPriceInSiacoin}
        units="TB/month"
      />
    </>
  )
}