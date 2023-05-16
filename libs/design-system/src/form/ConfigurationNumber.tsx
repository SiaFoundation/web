import BigNumber from 'bignumber.js'
import { ConfigurationTipNumber } from './ConfigurationTipNumber'
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { ConfigField, useRegisterForm } from './configurationFields'
import { NumberField } from '../core/NumberField'
import { FieldLabelAndError } from '../components/Form'

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
    average,
    averageTip,
    suggestion,
    suggestionTip,
    decimalsLimit = 2,
    placeholder,
    units,
  } = field
  const { value, error, onBlur, onChange } = useRegisterForm({
    form,
    field,
    name,
  })
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
              tip={averageTip || 'Averages provided by Sia Central.'}
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
