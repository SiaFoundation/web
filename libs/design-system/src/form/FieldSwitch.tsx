import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { FieldGroup } from '../components/Form'
import { Switch } from '../core/Switch'
import { ConfigField, useRegisterForm } from './configurationFields'

type Props<Values extends FieldValues, Categories extends string> = {
  name: Path<Values>
  form: UseFormReturn<Values>
  field: ConfigField<Values, Categories>
}

export function FieldSwitch<
  Values extends FieldValues,
  Categories extends string
>({ name, form, field }: Props<Values, Categories>) {
  const { onChange, onBlur, value, error } = useRegisterForm({
    name,
    field,
    form,
  })
  return (
    <FieldGroup title={field.title} name={name} form={form}>
      <Switch
        size="medium"
        checked={value}
        state={
          error
            ? 'invalid'
            : form.formState.dirtyFields[name]
            ? 'valid'
            : 'default'
        }
        onCheckedChange={(val) => {
          onChange(val as PathValue<Values, Path<Values>>)
        }}
        onBlur={(e) => {
          onBlur(e)
          onChange(value)
        }}
      />
    </FieldGroup>
  )
}
