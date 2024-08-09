import {
  ConfigFields,
  TipNumber,
  formSetField,
} from '@siafoundation/design-system'
import React from 'react'
import { Categories, RecommendationItem, SettingsData } from '../types'
import { fiatToSiacoin, toHastings } from '@siafoundation/units'
import { UseFormReturn } from 'react-hook-form'
import { useForexExchangeRate } from '../useAllowanceDerivedPricing'
import { recommendationTipContent } from './Tip'

export function MaxRPCPriceTips({
  form,
  fields,
  recommendations,
}: {
  form: UseFormReturn<SettingsData>
  fields: ConfigFields<SettingsData, Categories>
  recommendations: Partial<Record<keyof SettingsData, RecommendationItem>>
}) {
  const recommendationPrice = recommendations?.maxRPCPriceMillion?.targetValue

  return (
    recommendationPrice && (
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
            name: 'maxRPCPriceMillion',
            value: recommendationPrice,
            options: true,
          })
        }
      />
    )
  )
}

export function MaxRPCPricePinnedTips({
  form,
  fields,
  recommendations,
}: {
  form: UseFormReturn<SettingsData>
  fields: ConfigFields<SettingsData, Categories>
  recommendations: Partial<Record<keyof SettingsData, RecommendationItem>>
}) {
  const exchangeRate = useForexExchangeRate({
    form,
  })
  const recommendationInFiat =
    recommendations?.maxRPCPriceMillionPinned?.targetValue
  const recommendationInSiacoin =
    recommendationInFiat && exchangeRate
      ? fiatToSiacoin(recommendationInFiat, exchangeRate)
      : null
  return (
    recommendationInSiacoin && (
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
            name: 'maxRPCPriceMillionPinned',
            value: recommendationInFiat,
            options: true,
          })
        }
      />
    )
  )
}
