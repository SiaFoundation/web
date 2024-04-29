import { NumberField } from '../core/NumberField'
import BigNumber from 'bignumber.js'
import { FieldValues, Path, PathValue } from 'react-hook-form'
import { FieldGroup } from '../components/Form'
import { FieldProps, useRegisterForm } from './configurationFields'

export function FieldNumber<
  Values extends FieldValues,
  Categories extends string
>({
  name,
  form,
  fields,
  size = 'small',
  group = true,
}: FieldProps<Values, Categories> & {
  size?: React.ComponentProps<typeof NumberField>['size']
  group?: boolean
}) {
  const field = fields[name]
  const { placeholder, decimalsLimit = 2, units } = field
  const { setValue, error, value } = useRegisterForm({
    form,
    field,
    name,
  })

  const el = (
    <NumberField
      name={name}
      value={value}
      units={units}
      size={size}
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
  )

  if (group) {
    return (
      <FieldGroup title={field.title} name={name} form={form} wrap>
        {el}
      </FieldGroup>
    )
  }

  return el
}
