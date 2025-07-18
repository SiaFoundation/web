import { NumberField } from '../core/NumberField'
import BigNumber from 'bignumber.js'
import { FieldValues, Path, PathValue } from 'react-hook-form'
import { FieldGroup } from '../components/Form'
import {
  FieldProps,
  getFormStateFieldBoolean,
  useRegisterForm,
} from './configurationFields'
import { useMemo } from 'react'

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
  const {
    placeholder: _placeholder,
    median,
    suggestion,
    units,
    decimalsLimit = 2,
    disableGroupSeparators,
    autoComplete,
    prefix,
  } = field
  const { setValue, onBlur, error, value } = useRegisterForm({
    form,
    field,
    name,
  })
  const placeholder = useMemo(
    () =>
      _placeholder
        ? new BigNumber(_placeholder)
        : suggestion && typeof suggestion !== 'boolean'
        ? new BigNumber(suggestion)
        : median && typeof median !== 'boolean'
        ? new BigNumber(median)
        : undefined,
    [_placeholder, suggestion, median]
  )

  const el = (
    <NumberField
      prefix={prefix}
      name={name}
      value={value}
      units={units}
      size={size}
      decimalsLimit={decimalsLimit}
      disableGroupSeparators={disableGroupSeparators}
      autoComplete={autoComplete}
      placeholder={placeholder ? new BigNumber(placeholder) : undefined}
      state={
        error
          ? 'invalid'
          : getFormStateFieldBoolean(form.formState.dirtyFields, name)
          ? 'valid'
          : 'default'
      }
      onChange={(val) => {
        const v = val !== undefined ? new BigNumber(val) : undefined
        setValue(v as PathValue<Values, Path<Values>>, true)
      }}
      onBlur={onBlur}
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
