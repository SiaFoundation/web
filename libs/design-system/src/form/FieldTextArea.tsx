import type { FieldValues } from 'react-hook-form'
import { FieldGroup } from '../components/Form'
import { TextArea } from '../core/TextArea'
import { type FieldProps, useRegisterForm } from './configurationFields'

export function FieldTextArea<
  Values extends FieldValues,
  Categories extends string,
>({
  name,
  form,
  fields,
  group = true,
}: FieldProps<Values, Categories> & {
  group?: boolean
}) {
  const field = fields[name]
  const { placeholder } = field
  const { ref, onChange, onBlur, error } = useRegisterForm({
    name,
    form,
    field,
  })

  const el = (
    <TextArea
      ref={ref}
      name={name}
      placeholder={placeholder}
      readOnly={field.readOnly}
      onClick={field.onClick}
      state={
        error
          ? 'invalid'
          : (form.formState.dirtyFields as Record<string, boolean>)[name]
            ? 'valid'
            : 'default'
      }
      onChange={onChange}
      onBlur={onBlur}
    />
  )

  if (group) {
    return (
      <FieldGroup
        title={field.title}
        actions={field.actions}
        name={name}
        form={form}
      >
        {el}
      </FieldGroup>
    )
  }

  return el
}
