import { SiacoinField } from '../core/SiacoinField'
import { FieldValues, Path, PathValue } from 'react-hook-form'
import { FieldGroup } from '../components/Form'
import {
  FieldProps,
  getFormStateFieldBoolean,
  useRegisterForm,
} from './configurationFields'
import BigNumber from 'bignumber.js'
import { useMemo } from 'react'

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
    placeholder: _placeholder,
    average,
    suggestion,
    units,
    decimalsLimitSc = 6,
    decimalsLimitFiat = 6,
  } = field
  const { setValue, onBlur, value, error } = useRegisterForm({
    name,
    field,
    form,
  })

  const placeholder = useMemo(
    () =>
      _placeholder
        ? new BigNumber(_placeholder)
        : suggestion && typeof suggestion !== 'boolean'
        ? new BigNumber(suggestion)
        : average && typeof average !== 'boolean'
        ? new BigNumber(average)
        : undefined,
    [_placeholder, suggestion, average]
  )

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
      changed={getFormStateFieldBoolean(form.formState.dirtyFields, name)}
      placeholder={placeholder}
      onChange={(val) => {
        setValue(val as PathValue<Values, Path<Values>>, true)
      }}
      onBlur={onBlur}
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
