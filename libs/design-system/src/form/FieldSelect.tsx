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
  group?: boolean
}

export function FieldSelect<
  Values extends FieldValues,
  Categories extends string
>({ name, form, fields, group = true }: Props<Values, Categories>) {
  const field = fields[name]
  const { options } = field
  const { ref, onChange, onBlur, error } = useRegisterForm({
    name,
    form,
    field,
  })

  const el = (
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
