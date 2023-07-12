import { SiacoinField } from '../core/SiacoinField'
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { FieldGroup } from '../components/Form'
import { ConfigFields, useRegisterForm } from './configurationFields'
import BigNumber from 'bignumber.js'

type Props<Values extends FieldValues, Categories extends string> = {
  name: Path<Values>
  form: UseFormReturn<Values>
  fields: ConfigFields<Values, Categories>
  size?: React.ComponentProps<typeof SiacoinField>['size']
}

export function FieldSiacoin<
  Values extends FieldValues,
  Categories extends string
>({ name, form, fields, size = 'small' }: Props<Values, Categories>) {
  const field = fields[name]
  const {
    average,
    suggestion,
    units,
    decimalsLimitSc = 6,
    decimalsLimitFiat = 6,
  } = field
  const { setValue, value, error } = useRegisterForm({
    name,
    field,
    form,
  })
  return (
    <FieldGroup title={field.title} name={name} form={form}>
      <SiacoinField
        name={name}
        size={size}
        sc={value}
        units={units}
        decimalsLimitSc={decimalsLimitSc}
        decimalsLimitFiat={decimalsLimitFiat}
        error={error}
        changed={form.formState.dirtyFields[name]}
        placeholder={(suggestion as BigNumber) || (average as BigNumber)}
        onChange={(val) => {
          setValue(val as PathValue<Values, Path<Values>>, true)
        }}
        onBlur={() => {
          setValue(value, true)
        }}
      />
    </FieldGroup>
  )
}
