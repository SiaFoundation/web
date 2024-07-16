import { currencyOptions } from '@siafoundation/react-core'
import type { SiaCentralCurrency } from '@siafoundation/sia-central-types'
import type BigNumber from 'bignumber.js'
import type { FieldValues, Path, PathValue } from 'react-hook-form'
import { FieldError } from '../components/Form'
import { FieldFiat } from './FieldFiat'
import { TipNumber } from './TipNumber'
import type { FieldProps } from './configurationFields'
import { useFormSetField } from './useFormSetField'

export function ConfigurationFiat<
  Values extends FieldValues,
  Categories extends string,
>({
  name,
  form,
  fields,
  currency,
}: FieldProps<Values, Categories> & {
  currency: SiaCentralCurrency | ''
}) {
  const field = fields[name]
  const { average, averageTip, suggestion, suggestionTip, before, after } =
    field
  const Before = before || (() => null)
  const After = after || (() => null)
  const setField = useFormSetField({
    form,
    name,
    field,
  })
  const currencyMeta = currencyOptions.find((c) => c.id === currency)
  if (!currency || !currencyMeta) {
    return null
  }
  const { prefix, label, fixed } = currencyMeta
  return (
    <div className="flex flex-col gap-3 items-end">
      <div className="flex flex-col w-[250px]">
        <Before name={name} form={form} fields={fields} />
        <div className="flex flex-col gap-3 w-[250px]">
          <FieldFiat
            name={name}
            fields={fields}
            form={form}
            group={false}
            currency={currency}
          />
          {average && (
            <TipNumber
              type="number"
              format={(val) => `${prefix}${val.toFixed(fixed)} ${label}`}
              label="Network average"
              tip={averageTip || 'Averages provided by Sia Central.'}
              value={average as BigNumber}
              decimalsLimit={fixed}
              onClick={() => {
                setField(average as PathValue<Values, Path<Values>>, true)
              }}
            />
          )}
          {suggestion && suggestionTip && (
            <TipNumber
              type="number"
              label="Suggestion"
              tip={suggestionTip}
              decimalsLimit={fixed}
              value={suggestion as BigNumber}
              onClick={() => {
                setField(suggestion as PathValue<Values, Path<Values>>, true)
              }}
            />
          )}
          <After name={name} form={form} fields={fields} />
        </div>
      </div>
      <div className="h-[20px]">
        <FieldError form={form} name={name} />
      </div>
    </div>
  )
}
