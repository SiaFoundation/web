import { SiacoinField } from '../core/SiacoinField'
import { FieldValues, Path, PathValue } from 'react-hook-form'
import { FieldGroup } from '../components/Form'
import { FieldProps, useRegisterForm } from './configurationFields'
import BigNumber from 'bignumber.js'

export function FieldSiacoin<
  Values extends FieldValues,
  Categories extends string
>({
  name,
  form,
  fields,
  size = 'small',
  group = true,
}: FieldProps<Values, Categories> & {
  size?: React.ComponentProps<typeof SiacoinField>['size']
  group?: boolean
}) {
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

  const el = (
    <SiacoinField
      name={name}
      size={size}
      sc={value}
      units={units}
      decimalsLimitSc={decimalsLimitSc}
      decimalsLimitFiat={decimalsLimitFiat}
      readOnly={field.readOnly}
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
  )

  if (group) {
    return (
      <FieldGroup title={field.title} name={name} form={form}>
        {el}
      </FieldGroup>
    )
  }

  return el
}
