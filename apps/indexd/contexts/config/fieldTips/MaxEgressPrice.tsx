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

export function MaxEgressPriceTips({
  form,
  fields,
}: {
  form: UseFormReturn<InputValues>
  fields: ConfigFields<InputValues, Categories>
}) {
  const { egressMedian } = useMedianPrices()

  return (
    <>
      {egressMedian && (
        <TipNumber
          type="siacoin"
          label="Network median price"
          tip="Data provided by SiaScan."
          decimalsLimit={0}
          value={toHastings(egressMedian)}
          onClick={() => {
            formSetField({
              form,
              fields,
              name: 'maxEgressPriceTB',
              value: egressMedian,
              options: true,
            })
          }}
        />
      )}
    </>
  )
}

export function MaxEgressPricePinnedTips({
  form,
  fields,
}: {
  form: UseFormReturn<InputValues>
  fields: ConfigFields<InputValues, Categories>
}) {
  const { rate } = useFormExchangeRate(form)
  const { egressMedian } = useMedianPrices()
  return (
    <>
      {egressMedian && rate && (
        <TipNumber
          type="siacoin"
          label="Network median price"
          tip="Data provided by SiaScan."
          decimalsLimit={0}
          value={toHastings(egressMedian)}
          onClick={() => {
            formSetField({
              form,
              fields,
              name: 'maxEgressPriceTBPinned',
              value: egressMedian.times(rate),
              options: true,
            })
          }}
        />
      )}
    </>
  )
}
