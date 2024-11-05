import {
  ConfigFields,
  TipNumber,
  formSetField,
} from '@siafoundation/design-system'
import { fiatToSiacoin, toHastings } from '@siafoundation/units'
import { UseFormReturn } from 'react-hook-form'
import { Categories, RecommendationItem, InputValues } from '../types'
import { useFormExchangeRate } from '../useFormExchangeRate'
import { recommendationTipContent } from './Tip'
import { useAverages } from '../useAverages'

export function MaxDownloadPriceTips({
  form,
  fields,
  recommendations,
}: {
  form: UseFormReturn<InputValues>
  fields: ConfigFields<InputValues, Categories>
  recommendations: Partial<Record<keyof InputValues, RecommendationItem>>
}) {
  const { downloadAverage } = useAverages()
  const recommendationPrice = recommendations?.maxDownloadPriceTB?.targetValue

  return (
    <>
      {downloadAverage && (
        <TipNumber
          type="siacoin"
          label="Network average"
          tip="Averages provided by Sia Central."
          decimalsLimit={0}
          value={toHastings(downloadAverage)}
          onClick={() => {
            formSetField({
              form,
              fields,
              name: 'maxDownloadPriceTB',
              value: downloadAverage,
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
  form: UseFormReturn<InputValues>
  fields: ConfigFields<InputValues, Categories>
  recommendations: Partial<Record<keyof InputValues, RecommendationItem>>
}) {
  const { rate } = useFormExchangeRate(form)
  const { downloadAverage } = useAverages()
  const recommendationInFiat =
    recommendations?.maxDownloadPriceTBPinned?.targetValue
  const recommendationInSiacoin =
    recommendationInFiat && rate
      ? fiatToSiacoin(recommendationInFiat, rate)
      : null
  return (
    <>
      {downloadAverage && rate && (
        <TipNumber
          type="siacoin"
          label="Network average"
          tip="Averages provided by Sia Central."
          decimalsLimit={0}
          value={toHastings(downloadAverage)}
          onClick={() => {
            formSetField({
              form,
              fields,
              name: 'maxDownloadPriceTBPinned',
              value: downloadAverage.times(rate),
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
