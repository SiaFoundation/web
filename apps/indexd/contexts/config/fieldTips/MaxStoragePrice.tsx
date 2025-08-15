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

export function MaxStoragePriceTips({
  form,
  fields,
}: {
  form: UseFormReturn<InputValues>
  fields: ConfigFields<InputValues, Categories>
}) {
  const { storageMedian } = useMedianPrices()

  return (
    <>
      {storageMedian && (
        <TipNumber
          type="siacoin"
          label="Network median price"
          tip="Data provided by explorer."
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
    </>
  )
}

export function MaxStoragePricePinnedTips({
  form,
  fields,
}: {
  form: UseFormReturn<InputValues>
  fields: ConfigFields<InputValues, Categories>
}) {
  const { storageMedian } = useMedianPrices()
  const { rate } = useFormExchangeRate(form)

  return (
    <>
      {storageMedian && rate && (
        <TipNumber
          type="siacoin"
          label="Network median price"
          tip="Data provided by explorer."
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
    </>
  )
}
