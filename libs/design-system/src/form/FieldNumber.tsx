import { NumberField } from '../core/NumberField'
import BigNumber from 'bignumber.js'
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { FieldGroup } from '../components/Form'
import { ConfigFields, useRegisterForm } from './configurationFields'

type Props<Values extends FieldValues, Categories extends string> = {
  name: Path<Values>
  form: UseFormReturn<Values>
  fields: ConfigFields<Values, Categories>
}

export function FieldNumber<
  Values extends FieldValues,
  Categories extends string
>({ name, form, fields }: Props<Values, Categories>) {
  const field = fields[name]
  const { placeholder, decimalsLimit = 2, units } = field
  const { setValue, error, value } = useRegisterForm({
    form,
    field,
    name,
  })
  return (
    <FieldGroup title={field.title} name={name} form={form}>
      <NumberField
        name={name}
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
          setValue(v as PathValue<Values, Path<Values>>, true)
        }}
        onBlur={() => {
          setValue(value, true)
        }}
      />
    </FieldGroup>
  )
}
