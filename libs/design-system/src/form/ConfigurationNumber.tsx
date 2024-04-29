import BigNumber from 'bignumber.js'
import { ConfigurationTipNumber } from './ConfigurationTipNumber'
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { ConfigFields, useRegisterForm } from './configurationFields'
import { NumberField } from '../core/NumberField'
import { FieldLabelAndError } from '../components/Form'
import { useMemo } from 'react'

type Props<Values extends FieldValues, Categories extends string> = {
  name: Path<Values>
  form: UseFormReturn<Values>
  fields: ConfigFields<Values, Categories>
}

export function ConfigurationNumber<
  Values extends FieldValues,
  Categories extends string
>({ name, form, fields }: Props<Values, Categories>) {
  const field = fields[name]
  const {
    average,
    averageTip,
    suggestion,
    suggestionTip,
    decimalsLimit = 2,
    after,
    placeholder: _placeholder,
    units,
    prefix,
  } = field
  const { setValue, value, error } = useRegisterForm({
    form,
    field,
    name,
  })
  const After = after || (() => null)
  const placeholder = useMemo(
    () =>
      _placeholder
        ? new BigNumber(_placeholder)
        : suggestion && typeof suggestion !== 'boolean'
        ? new BigNumber(suggestion)
        : undefined,
    [_placeholder, suggestion]
  )
  return (
    <div className="flex flex-col gap-3 items-end">
      <div className="flex flex-col gap-3 w-[250px]">
        <NumberField
          name={name}
          value={value}
          units={units}
          prefix={prefix}
          decimalsLimit={decimalsLimit}
          placeholder={placeholder}
          state={
            error
              ? 'invalid'
              : form.formState.dirtyFields[name]
              ? 'valid'
              : 'default'
          }
          onChange={(val) => {
            const v = val !== undefined ? new BigNumber(val) : undefined
            setValue(v as PathValue<Values, Path<Values>>, true)
          }}
          onBlur={() => {
            setValue(value, true)
          }}
        />
        {average && (
          <ConfigurationTipNumber
            type="number"
            label="Network average"
            tip={averageTip || 'Averages provided by Sia Central.'}
            decimalsLimit={decimalsLimit}
            value={average as BigNumber}
            units={units}
            onClick={() => {
              setValue(average as PathValue<Values, Path<Values>>, true)
            }}
          />
        )}
        {suggestion && suggestionTip && (
          <ConfigurationTipNumber
            type="number"
            label="Suggestion"
            tip={suggestionTip}
            decimalsLimit={decimalsLimit}
            value={suggestion as BigNumber}
            units={units}
            onClick={() => {
              setValue(suggestion as PathValue<Values, Path<Values>>, true)
            }}
          />
        )}
        <After name={name} form={form} fields={fields} />
      </div>
      <div className="h-[20px]">
        <FieldLabelAndError form={form} name={name} />
      </div>
    </div>
  )
}
