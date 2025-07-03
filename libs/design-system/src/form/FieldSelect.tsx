import { FieldValues } from 'react-hook-form'
import { FieldGroup } from '../components/Form'
import { Option, Select } from '../core/Select'
import {
  FieldProps,
  getFormStateFieldBoolean,
  useRegisterForm,
} from './configurationFields'

export function FieldSelect<
  Values extends FieldValues,
  Categories extends string
>({
  name,
  form,
  fields,
  size = 'small',
  group = true,
}: FieldProps<Values, Categories> & {
  group?: boolean
  size?: React.ComponentProps<typeof Select>['size']
}) {
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
      size={size}
      state={
        error
          ? 'invalid'
          : getFormStateFieldBoolean(form.formState.dirtyFields, name)
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
