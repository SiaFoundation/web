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

export function MaxStoragePriceTips({
  form,
  fields,
  recommendations,
}: {
  form: UseFormReturn<InputValues>
  fields: ConfigFields<InputValues, Categories>
  recommendations: Partial<Record<keyof InputValues, RecommendationItem>>
}) {
  const { storageAverage } = useAverages()
  const maxStoragePriceTBMonth = form.watch('maxStoragePriceTBMonth')
  const recommendationPrice =
    recommendations?.maxStoragePriceTBMonth?.targetValue

  return (
    <>
      {storageAverage && (
        <TipNumber
          type="siacoin"
          label="Network average"
          tip="Averages provided by Sia Central."
          decimalsLimit={0}
          value={toHastings(storageAverage)}
          onClick={() => {
            formSetField({
              form,
              fields,
              name: 'maxStoragePriceTBMonth',
              value: storageAverage,
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
  const { storageAverage } = useAverages()
  const { rate } = useFormExchangeRate(form)
  const maxStoragePriceTBMonthPinned = form.watch(
    'maxStoragePriceTBMonthPinned'
  )
  const currentPriceInSiacoin =
    maxStoragePriceTBMonthPinned && rate
      ? fiatToSiacoin(maxStoragePriceTBMonthPinned, rate)
      : undefined
  const recommendationInFiat =
    recommendations?.maxStoragePriceTBMonthPinned?.targetValue
  const recommendationInSiacoin =
    recommendationInFiat && rate
      ? fiatToSiacoin(recommendationInFiat, rate)
      : undefined

  return (
    <>
      {storageAverage && rate && (
        <TipNumber
          type="siacoin"
          label="Network average"
          tip="Averages provided by Sia Central."
          decimalsLimit={0}
          value={toHastings(storageAverage)}
          onClick={() => {
            formSetField({
              form,
              fields,
              name: 'maxStoragePriceTBMonthPinned',
              value: storageAverage.times(rate),
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
