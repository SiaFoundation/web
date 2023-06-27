import { useEffect, useState } from 'react'
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
      <TextArea
        placeholder={placeholder}
        value={localValue}
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
