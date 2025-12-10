import {
  ConfigFields,
  TipNumber,
  formSetField,
} from '@siafoundation/design-system'
import { fiatToSiacoin, toHastings } from '@siafoundation/units'
import { UseFormReturn, useWatch } from 'react-hook-form'
import { Categories, RecommendationItem, InputValues } from '../types'
import { useFormExchangeRate } from '../useFormExchangeRate'
import { PriceWithRedundancyTip, recommendationTipContent } from './Tip'
import { useMedianPrices } from '../useMedianPrices'

export function MaxUploadPriceTips({
  form,
  fields,
  recommendations,
}: {
  form: UseFormReturn<InputValues>
  fields: ConfigFields<InputValues, Categories>
  recommendations: Partial<Record<keyof InputValues, RecommendationItem>>
}) {
  const { uploadMedian } = useMedianPrices()
  const maxUploadPriceTB = useWatch({
    control: form.control,
    name: 'maxUploadPriceTB',
  })
  const recommendationPrice = recommendations?.maxUploadPriceTB?.targetValue

  return (
    <>
      {uploadMedian && (
        <TipNumber
          type="siacoin"
          label="Network median"
          tip="Median price provided by Siascan."
          decimalsLimit={0}
          value={toHastings(uploadMedian)}
          onClick={() => {
            formSetField({
              form,
              fields,
              name: 'maxUploadPriceTB',
              value: uploadMedian,
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
  const { uploadMedian } = useMedianPrices()
  const maxUploadPriceTBPinned = useWatch({
    control: form.control,
    name: 'maxUploadPriceTBPinned',
  })
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
      {uploadMedian && rate && (
        <TipNumber
          type="siacoin"
          label="Network median"
          tip="Median price provided by Siascan."
          decimalsLimit={0}
          value={toHastings(uploadMedian)}
          onClick={() => {
            formSetField({
              form,
              fields,
              name: 'maxUploadPriceTBPinned',
              value: uploadMedian.times(rate),
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
