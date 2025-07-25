import {
  ConfigFields,
  TipNumber,
  formSetField,
} from '@siafoundation/design-system'
import { toHastings } from '@siafoundation/units'
import { UseFormReturn } from 'react-hook-form'
import { Categories, InputValues } from '../types'
import { useFormExchangeRate } from '../useFormExchangeRate'
import { useMedianPrices } from '../../../hooks/useMedianPrices'

export function MaxIngressPriceTips({
  form,
  fields,
}: {
  form: UseFormReturn<InputValues>
  fields: ConfigFields<InputValues, Categories>
}) {
  const { ingressMedian } = useMedianPrices()

  return (
    <>
      {ingressMedian && (
        <TipNumber
          type="siacoin"
          label="Network median price"
          tip="Data provided by SiaScan."
          decimalsLimit={0}
          value={toHastings(ingressMedian)}
          onClick={() => {
            formSetField({
              form,
              fields,
              name: 'maxIngressPriceTB',
              value: ingressMedian,
              options: true,
            })
          }}
        />
      )}
    </>
  )
}

export function MaxIngressPricePinnedTips({
  form,
  fields,
}: {
  form: UseFormReturn<InputValues>
  fields: ConfigFields<InputValues, Categories>
}) {
  const { rate } = useFormExchangeRate(form)
  const { ingressMedian } = useMedianPrices()
  return (
    <>
      {ingressMedian && rate && (
        <TipNumber
          type="siacoin"
          label="Network median price"
          tip="Data provided by SiaScan."
          decimalsLimit={0}
          value={toHastings(ingressMedian)}
          onClick={() => {
            formSetField({
              form,
              fields,
              name: 'maxIngressPriceTBPinned',
              value: ingressMedian.times(rate),
              options: true,
            })
          }}
        />
      )}
    </>
  )
}
