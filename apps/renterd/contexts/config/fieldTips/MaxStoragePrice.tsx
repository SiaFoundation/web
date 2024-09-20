import {
  ConfigFields,
  TipNumber,
  formSetField,
} from '@siafoundation/design-system'
import { fiatToSiacoin, toHastings } from '@siafoundation/units'
import { UseFormReturn } from 'react-hook-form'
import { Categories, RecommendationItem, InputValues } from '../types'
import { useAllowanceDerivedPricingForEnabledFields } from '../useAllowanceDerivedPricing'
import { useFormExchangeRate } from '../useFormExchangeRate'
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
  form: UseFormReturn<InputValues>
  fields: ConfigFields<InputValues, Categories>
  recommendations: Partial<Record<keyof InputValues, RecommendationItem>>
}) {
  const derived = useAllowanceDerivedPricingForEnabledFields({
    form,
  })
  const maxStoragePriceTBMonth = form.watch('maxStoragePriceTBMonth')
  const recommendationPrice =
    recommendations?.maxStoragePriceTBMonth?.targetValue

  return (
    <>
      {derived?.maxStoragePriceTBMonth && (
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
  form: UseFormReturn<InputValues>
  fields: ConfigFields<InputValues, Categories>
  recommendations: Partial<Record<keyof InputValues, RecommendationItem>>
}) {
  const derived = useAllowanceDerivedPricingForEnabledFields({
    form,
  })
  const { rate } = useFormExchangeRate(form)
  const maxStoragePriceTBMonthPinned = form.watch(
    'maxStoragePriceTBMonthPinned'
  )
  const currentPriceInSiacoin =
    maxStoragePriceTBMonthPinned && rate
      ? fiatToSiacoin(maxStoragePriceTBMonthPinned, rate)
      : undefined
  const derivedPriceInSiacoin =
    derived?.maxStoragePriceTBMonthPinned && rate
      ? fiatToSiacoin(derived.maxStoragePriceTBMonthPinned, rate)
      : undefined
  const recommendationInFiat =
    recommendations?.maxStoragePriceTBMonthPinned?.targetValue
  const recommendationInSiacoin =
    recommendationInFiat && rate
      ? fiatToSiacoin(recommendationInFiat, rate)
      : undefined

  return (
    <>
      {derivedPriceInSiacoin && derived?.maxStoragePriceTBMonthPinned && (
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
