import {
  ConfigFields,
  TipNumber,
  formSetField,
} from '@siafoundation/design-system'
import { fiatToSiacoin, toHastings } from '@siafoundation/units'
import { UseFormReturn } from 'react-hook-form'
import { Categories, RecommendationItem, InputValues } from '../types'
import { useFormExchangeRate } from '../useFormExchangeRate'
import { PriceWithRedundancyTip, recommendationTipContent } from './Tip'
import { useAverages } from '../useAverages'

export function MaxUploadPriceTips({
  form,
  fields,
  recommendations,
}: {
  form: UseFormReturn<InputValues>
  fields: ConfigFields<InputValues, Categories>
  recommendations: Partial<Record<keyof InputValues, RecommendationItem>>
}) {
  const { uploadAverage } = useAverages()
  const maxUploadPriceTB = form.watch('maxUploadPriceTB')
  const recommendationPrice = recommendations?.maxUploadPriceTB?.targetValue

  return (
    <>
      {uploadAverage && (
        <TipNumber
          type="siacoin"
          label="Network average"
          tip="Averages provided by Sia Central."
          decimalsLimit={0}
          value={toHastings(uploadAverage)}
          onClick={() => {
            formSetField({
              form,
              fields,
              name: 'maxUploadPriceTB',
              value: uploadAverage,
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
  form: UseFormReturn<InputValues>
  fields: ConfigFields<InputValues, Categories>
  recommendations: Partial<Record<keyof InputValues, RecommendationItem>>
}) {
  const { rate } = useFormExchangeRate(form)
  const { uploadAverage } = useAverages()
  const maxUploadPriceTBPinned = form.watch('maxUploadPriceTBPinned')
  const currentPriceInSiacoin =
    maxUploadPriceTBPinned && rate
      ? fiatToSiacoin(maxUploadPriceTBPinned, rate)
      : undefined
  const recommendationInFiat =
    recommendations?.maxUploadPriceTBPinned?.targetValue
  const recommendationInSiacoin =
    recommendationInFiat && rate
      ? fiatToSiacoin(recommendationInFiat, rate)
      : undefined
  return (
    <>
      {uploadAverage && rate && (
        <TipNumber
          type="siacoin"
          label="Network average"
          tip="Averages provided by Sia Central."
          decimalsLimit={0}
          value={toHastings(uploadAverage)}
          onClick={() => {
            formSetField({
              form,
              fields,
              name: 'maxUploadPriceTBPinned',
              value: uploadAverage.times(rate),
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
