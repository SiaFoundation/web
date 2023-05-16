import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { FieldGroup } from '../components/Form'
import { TextField } from '../core/TextField'
import { ConfigField, useRegisterForm } from './configurationFields'

type Props<Values extends FieldValues, Categories extends string> = {
  name: Path<Values>
  form: UseFormReturn<Values>
  field: ConfigField<Values, Categories>
  type?: 'password'
}

export function FieldText<
  Values extends FieldValues,
  Categories extends string
>({ name, form, field, type }: Props<Values, Categories>) {
  const { placeholder } = field
  const { onChange, onBlur, value, error } = useRegisterForm({
    name,
    form,
    field,
  })
  return (
    <FieldGroup title={field.title} name={name} form={form}>
      <TextField
        placeholder={placeholder}
        value={value}
        type={type}
        state={
          error
            ? 'invalid'
            : form.formState.dirtyFields[name]
            ? 'valid'
            : 'default'
        }
        onChange={(e) => {
          onChange(e.currentTarget.value as PathValue<Values, Path<Values>>)
        }}
        onBlur={(e) => {
          onBlur(e)
          onChange(value)
        }}
      />
    </FieldGroup>
  )
}
