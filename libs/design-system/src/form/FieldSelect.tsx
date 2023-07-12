import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { FieldGroup } from '../components/Form'
import { Option, Select } from '../core/Select'
import { ConfigFields, useRegisterForm } from './configurationFields'

type Option = {
  value: string
  label: string
}

type Props<Values extends FieldValues, Categories extends string> = {
  name: Path<Values>
  form: UseFormReturn<Values>
  fields: ConfigFields<Values, Categories>
}

export function FieldSelect<
  Values extends FieldValues,
  Categories extends string
>({ name, form, fields }: Props<Values, Categories>) {
  const field = fields[name]
  const { options } = field
  const { ref, onChange, onBlur, error } = useRegisterForm({
    name,
    form,
    field,
  })
  return (
    <FieldGroup title={field.title} name={name} form={form}>
      <Select
        ref={ref}
        name={name}
        size="small"
        state={
          error
            ? 'invalid'
            : form.formState.dirtyFields[name]
            ? 'valid'
            : 'default'
        }
        onChange={onChange}
        onBlur={onBlur}
      >
        {options?.map((o) => (
          <Option key={o.value} value={o.value}>
            {o.label}
          </Option>
        ))}
      </Select>
    </FieldGroup>
  )
}
