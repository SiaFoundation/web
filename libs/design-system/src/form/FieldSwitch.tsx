import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { FieldGroup } from '../components/Form'
import { Switch } from '../core/Switch'
import { ConfigField, useRegisterForm } from './configurationFields'

type Props<Values extends FieldValues, Categories extends string> = {
  name: Path<Values>
  form: UseFormReturn<Values>
  field: ConfigField<Values, Categories>
  size?: React.ComponentProps<typeof Switch>['size']
  children?: React.ReactNode
}

export function FieldSwitch<
  Values extends FieldValues,
  Categories extends string
>({ name, form, field, size = 'medium', children }: Props<Values, Categories>) {
  const { ref, setValue, value, error } = useRegisterForm({
    name,
    field,
    form,
  })
  return (
    <FieldGroup title={field.title} name={name} form={form}>
      <div className="flex gap-1 items-center">
        <Switch
          ref={ref}
          name={name}
          size={size}
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
    </FieldGroup>
  )
}
