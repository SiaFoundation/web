import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { FieldGroup } from '../components/Form'
import { TextArea } from '../core/TextArea'
import { ConfigFields, useRegisterForm } from './configurationFields'

type Props<Values extends FieldValues, Categories extends string> = {
  name: Path<Values>
  form: UseFormReturn<Values>
  fields: ConfigFields<Values, Categories>
}

export function FieldTextArea<
  Values extends FieldValues,
  Categories extends string
>({ name, form, fields }: Props<Values, Categories>) {
  const field = fields[name]
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
