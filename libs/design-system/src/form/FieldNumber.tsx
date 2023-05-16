import { NumberField } from '../core/NumberField'
import BigNumber from 'bignumber.js'
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { FieldGroup } from '../components/Form'
import { ConfigField, useRegisterForm } from './configurationFields'

type Props<Values extends FieldValues, Categories extends string> = {
  name: Path<Values>
  form: UseFormReturn<Values>
  field: ConfigField<Values, Categories>
}

export function FieldNumber<
  Values extends FieldValues,
  Categories extends string
>({ name, form, field }: Props<Values, Categories>) {
  const { placeholder, decimalsLimit = 2, units } = field
  const { onChange, onBlur, error, value } = useRegisterForm({
    form,
    field,
    name,
  })
  return (
    <FieldGroup title={field.title} name={name} form={form}>
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
    </FieldGroup>
  )
}
