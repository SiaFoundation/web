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
import { useMedianPrices } from '../useMedianPrices'

export function MaxStoragePriceTips({
  form,
  fields,
  recommendations,
}: {
  form: UseFormReturn<InputValues>
  fields: ConfigFields<InputValues, Categories>
  recommendations: Partial<Record<keyof InputValues, RecommendationItem>>
}) {
  const { storageMedian } = useMedianPrices()
  const maxStoragePriceTBMonth = form.watch('maxStoragePriceTBMonth')
  const recommendationPrice =
    recommendations?.maxStoragePriceTBMonth?.targetValue

  return (
    <>
      {storageMedian && (
        <TipNumber
          type="siacoin"
          label="Network median"
          tip="Median price provided by Siascan."
          decimalsLimit={0}
          value={toHastings(storageMedian)}
          onClick={() => {
            formSetField({
              form,
              fields,
              name: 'maxStoragePriceTBMonth',
              value: storageMedian,
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
  const { storageMedian } = useMedianPrices()
  const { rate } = useFormExchangeRate(form)
  const maxStoragePriceTBMonthPinned = form.watch(
    'maxStoragePriceTBMonthPinned',
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
      {storageMedian && rate && (
        <TipNumber
          type="siacoin"
          label="Network median"
          tip="Median price provided by Siascan."
          decimalsLimit={0}
          value={toHastings(storageMedian)}
          onClick={() => {
            formSetField({
              form,
              fields,
              name: 'maxStoragePriceTBMonthPinned',
              value: storageMedian.times(rate),
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
