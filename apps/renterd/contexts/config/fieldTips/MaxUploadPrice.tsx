import {
  ConfigFields,
  TipNumber,
  formSetField,
} from '@siafoundation/design-system'
import { fiatToSiacoin, toHastings } from '@siafoundation/units'
import { UseFormReturn } from 'react-hook-form'
import { Categories, RecommendationItem, SettingsData } from '../types'
import { useAllowanceDerivedPricingForEnabledFields } from '../useAllowanceDerivedPricing'
import { useFormExchangeRate } from '../useFormExchangeRate'
import {
  PriceWithRedundancyTip,
  fitPriceToCurrentAllowanceTipContent,
  recommendationTipContent,
} from './Tip'

export function MaxUploadPriceTips({
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
  const maxUploadPriceTB = form.watch('maxUploadPriceTB')
  const recommendationPrice = recommendations?.maxUploadPriceTB?.targetValue

  return (
    <>
      {derived && (
        <TipNumber
          type="siacoin"
          label="Fit current allowance"
          tip={recommendationTipContent}
          decimalsLimit={0}
          value={toHastings(derived.maxUploadPriceTB)}
          onClick={() => {
            formSetField({
              form,
              fields,
              name: 'maxUploadPriceTB',
              value: derived.maxUploadPriceTB,
              options: true,
            })
          }}
        />
      )}
      {recommendationPrice && (
        <TipNumber
          type="siacoin"
          label="Match with more hosts"
          tip={fitPriceToCurrentAllowanceTipContent}
          decimalsLimit={0}
          value={toHastings(recommendationPrice)}
          onClick={() =>
            formSetField({
              form,
              fields,
              name: 'maxUploadPriceTB',
              value: recommendationPrice,
              options: true,
            })
          }
        />
      )}
      <PriceWithRedundancyTip
        form={form}
        priceInSiacoin={maxUploadPriceTB}
        units="TB"
      />
    </>
  )
}

export function MaxUploadPricePinnedTips({
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
  const { rate } = useFormExchangeRate(form)
  const maxUploadPriceTBPinned = form.watch('maxUploadPriceTBPinned')
  const currentPriceInSiacoin =
    maxUploadPriceTBPinned && rate
      ? fiatToSiacoin(maxUploadPriceTBPinned, rate)
      : null
  const derivedPriceInSiacoin =
    derived?.maxUploadPriceTBPinned && rate
      ? fiatToSiacoin(derived.maxUploadPriceTBPinned, rate)
      : null
  const recommendationInFiat =
    recommendations?.maxUploadPriceTBPinned?.targetValue
  const recommendationInSiacoin =
    recommendationInFiat && rate
      ? fiatToSiacoin(recommendationInFiat, rate)
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
              name: 'maxUploadPriceTBPinned',
              value: derived.maxUploadPriceTBPinned,
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
              name: 'maxUploadPriceTBPinned',
              value: recommendationInFiat,
              options: true,
            })
          }
        />
      )}
      <PriceWithRedundancyTip
        form={form}
        priceInSiacoin={currentPriceInSiacoin}
        units="TB"
      />
    </>
  )
}
