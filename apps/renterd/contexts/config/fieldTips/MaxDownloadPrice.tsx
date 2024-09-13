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
  fitPriceToCurrentAllowanceTipContent,
  recommendationTipContent,
} from './Tip'

export function MaxDownloadPriceTips({
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
  const recommendationPrice = recommendations?.maxDownloadPriceTB?.targetValue

  return (
    <>
      {derived && (
        <TipNumber
          type="siacoin"
          label="Fit current allowance"
          tip={fitPriceToCurrentAllowanceTipContent}
          decimalsLimit={0}
          value={toHastings(derived.maxDownloadPriceTB)}
          onClick={() => {
            formSetField({
              form,
              fields,
              name: 'maxDownloadPriceTB',
              value: derived.maxDownloadPriceTB,
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
              name: 'maxDownloadPriceTB',
              value: recommendationPrice,
              options: true,
            })
          }
        />
      )}
    </>
  )
}

export function MaxDownloadPricePinnedTips({
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
  const derivedPriceInSiacoin =
    derived?.maxDownloadPriceTBPinned && rate
      ? fiatToSiacoin(derived.maxDownloadPriceTBPinned, rate)
      : null
  const recommendationInFiat =
    recommendations?.maxDownloadPriceTBPinned?.targetValue
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
              name: 'maxDownloadPriceTBPinned',
              value: derived.maxDownloadPriceTBPinned,
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
              name: 'maxDownloadPriceTBPinned',
              value: recommendationInFiat,
              options: true,
            })
          }
        />
      )}
    </>
  )
}
