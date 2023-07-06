import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
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
  const { ref, onChange, onBlur, error } = useRegisterForm({
    name,
    form,
    field,
  })
  return (
    <FieldGroup
      title={field.title}
      actions={field.actions}
      name={name}
      form={form}
    >
      <TextArea
        ref={ref}
        name={name}
        placeholder={placeholder}
        readOnly={field.readOnly}
        onClick={field.onClick}
        state={
          error
            ? 'invalid'
            : form.formState.dirtyFields[name]
            ? 'valid'
            : 'default'
        }
        onChange={onChange}
        onBlur={onBlur}
      />
    </FieldGroup>
  )
}
