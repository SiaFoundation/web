import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { FieldGroup } from '../components/Form'
import { Switch } from '../core/Switch'
import { ConfigFields, useRegisterForm } from './configurationFields'

type Props<Values extends FieldValues, Categories extends string> = {
  name: Path<Values>
  form: UseFormReturn<Values>
  fields: ConfigFields<Values, Categories>
  size?: React.ComponentProps<typeof Switch>['size']
  children?: React.ReactNode
  group?: boolean
}

export function FieldSwitch<
  Values extends FieldValues,
  Categories extends string
>({
  name,
  form,
  fields,
  size = 'medium',
  group = true,
  children,
}: Props<Values, Categories>) {
  const field = fields[name]
  const { setValue, value, error } = useRegisterForm({
    name,
    field,
    form,
  })
  const el = (
    <div className="flex gap-1 items-center">
      <Switch
        name={name}
        size={size}
        checked={value}
        state={
          error
            ? 'invalid'
            : form.formState.dirtyFields[name]
            ? 'valid'
            : 'default'
        }
        onCheckedChange={(val) => {
          setValue(val as PathValue<Values, Path<Values>>, true)
        }}
        onBlur={() => {
          setValue(value, true)
        }}
      />
      {children}
    </div>
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
