import { useEffect, useState } from 'react'
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { FieldGroup } from '../components/Form'
import { TextField } from '../core/TextField'
import { ConfigField, useRegisterForm } from './configurationFields'

type Props<Values extends FieldValues, Categories extends string> = {
  name: Path<Values>
  form: UseFormReturn<Values>
  field: ConfigField<Values, Categories>
  size?: React.ComponentProps<typeof TextField>['size']
  autoComplete?: React.ComponentProps<typeof TextField>['autoComplete']
}

export function FieldText<
  Values extends FieldValues,
  Categories extends string
>({
  name,
  form,
  field,
  size = 'small',
  autoComplete,
}: Props<Values, Categories>) {
  const { onChange, onBlur, value, error } = useRegisterForm({
    name,
    form,
    field,
  })
  const [localValue, setLocalValue] = useState(value)
  useEffect(() => {
    setLocalValue(value)
  }, [value])
  return (
    <FieldGroup
      title={field.title}
      actions={field.actions}
      name={name}
      form={form}
    >
      <TextField
        placeholder={field.placeholder}
        size={size}
        autoComplete={autoComplete}
        value={localValue}
        type={field.type}
        readOnly={field.readOnly}
        onClick={field.onClick}
        state={
          error
            ? 'invalid'
            : form.formState.dirtyFields[name]
            ? 'valid'
            : 'default'
        }
        onChange={(e) => {
          const v = e.currentTarget.value as PathValue<Values, Path<Values>>
          setLocalValue(v)
          onChange(v)
        }}
        onBlur={(e) => {
          onBlur(e)
          onChange(value)
        }}
      />
    </FieldGroup>
  )
}
