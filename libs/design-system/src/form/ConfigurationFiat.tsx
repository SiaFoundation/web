import { FieldValues, Path, PathValue } from 'react-hook-form'
import { FieldError } from '../components/Form'
import { FieldProps } from './configurationFields'
import { FieldFiat } from './FieldFiat'
import { TipNumber } from './TipNumber'
import { useFormSetField } from './useFormSetField'
import { CurrencyId } from '@siafoundation/react-core'
import { useExternalExchangeRate } from '../hooks/useExternalExchangeRate'
import BigNumber from 'bignumber.js'
import { useMemo } from 'react'

export function ConfigurationFiat<
  Values extends FieldValues,
  Categories extends string
>({
  name,
  form,
  fields,
  currency,
}: FieldProps<Values, Categories> & {
  currency: CurrencyId | ''
}) {
  const field = fields[name]
  const {
    average,
    averageTip,
    suggestionLabel,
    suggestion,
    suggestionTip,
    before,
    after,
  } = field
  const Before = before || (() => null)
  const After = after || (() => null)
  const setField = useFormSetField({
    form,
    fields,
    name,
  })
  const exchangeRate = useExternalExchangeRate({
    currency: currency || undefined,
  })
  const rate = exchangeRate.rate
  const averageSc = useMemo(
    () =>
      average && typeof average !== 'boolean' && rate
        ? new BigNumber(average).times(rate)
        : undefined,
    [average, rate]
  )
  const suggestionSc = useMemo(
    () =>
      suggestion && typeof suggestion !== 'boolean' && rate
        ? new BigNumber(suggestion).times(rate)
        : undefined,
    [suggestion, rate]
  )
  return (
    <div className="flex flex-col gap-3 items-end">
      <div className="flex flex-col w-[260px]">
        <Before name={name} form={form} fields={fields} />
        <div className="flex flex-col gap-3 w-[260px]">
          <FieldFiat
            name={name}
            fields={fields}
            form={form}
            group={false}
            currency={currency}
          />
          {averageSc && (
            <TipNumber
              type="siacoin"
              label="Network average"
              tip={averageTip || 'Averages provided by Sia Central.'}
              value={averageSc}
              decimalsLimit={0}
              onClick={() => {
                setField(average as PathValue<Values, Path<Values>>, true)
              }}
            />
          )}
          {suggestionSc && suggestionTip && (
            <TipNumber
              type="siacoin"
              label={suggestionLabel || 'Suggestion'}
              tip={suggestionTip}
              decimalsLimit={0}
              value={suggestionSc}
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
