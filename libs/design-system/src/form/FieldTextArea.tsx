import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { FieldGroup } from '../components/Form'
import { TextArea } from '../core/TextArea'
import { ConfigField, useRegisterForm } from './configurationFields'

type Props<Values extends FieldValues, Categories extends string> = {
  name: Path<Values>
  form: UseFormReturn<Values>
  field: ConfigField<Values, Categories>
}

export function FieldTextArea<
  Values extends FieldValues,
  Categories extends string
>({ name, form, field }: Props<Values, Categories>) {
  const { placeholder } = field
  const { onChange, onBlur, value, error } = useRegisterForm({
    name,
    form,
    field,
  })
  return (
    <FieldGroup title={field.title} name={name} form={form}>
      <TextArea
        placeholder={placeholder}
        value={value}
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
