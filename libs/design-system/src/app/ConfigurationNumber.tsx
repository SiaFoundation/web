import { NumberField } from '../core/NumberField'
import BigNumber from 'bignumber.js'
import { ConfigurationTipNumber } from './ConfigurationTipNumber'
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { FieldLabelAndError } from '../components/Form'
import { useCallback } from 'react'
import { ConfigField } from './configurationFields'

type Props<Values extends FieldValues, Categories extends string> = {
  name: Path<Values>
  form: UseFormReturn<Values>
  field: ConfigField<Values, Categories>
}

export function ConfigurationNumber<
  Values extends FieldValues,
  Categories extends string
>({ name, form, field }: Props<Values, Categories>) {
  const {
    placeholder,
    average,
    suggestion,
    suggestionTip,
    decimalsLimit = 2,
    units,
  } = field
  const value = form.getValues(name)
  const error =
    form.formState.touchedFields[name] && !!form.formState.errors[name]
  const { onBlur } = form.register(name, field.validation)
  const onChange = useCallback(
    (val: PathValue<Values, Path<Values>>) => {
      form.setValue(name, val, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
      field.trigger?.forEach((t) => form.trigger(t))
    },
    [name, form, field]
  )
  return (
    <div className="flex flex-col gap-3 items-end">
      <div className="flex flex-col gap-3 w-[220px]">
        <NumberField
          value={value}
          units={units}
          decimalsLimit={decimalsLimit}
          placeholder={placeholder ? new BigNumber(placeholder) : undefined}
          state={
            error
              ? 'invalid'
              : form.formState.dirtyFields[name]
              ? 'valid'
              : 'default'
          }
          onChange={(val) => {
            const v = val !== undefined ? new BigNumber(val) : undefined
            onChange(v as PathValue<Values, Path<Values>>)
          }}
          onBlur={(e) => {
            onBlur(e)
            onChange(value)
          }}
        />
        <div className="flex flex-col gap-2">
          {average && (
            <ConfigurationTipNumber
              type="number"
              label="Network average"
              tip="Averages provided by Sia Central."
              decimalsLimit={decimalsLimit}
              value={average as BigNumber}
              units={units}
              onClick={() => {
                onChange(average as PathValue<Values, Path<Values>>)
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
                onChange(suggestion as PathValue<Values, Path<Values>>)
              }}
            />
          )}
        </div>
      </div>
      <div className="h-[20px]">
        <FieldLabelAndError form={form} name={name} />
      </div>
    </div>
  )
}
