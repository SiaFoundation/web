import { FieldValues, Path, PathValue } from 'react-hook-form'
import { FieldGroup } from '../components/Form'
import { Switch } from '../core/Switch'
import { FieldProps, useRegisterForm } from './configurationFields'

export function FieldSwitch<
  Values extends FieldValues,
  Categories extends string
>({
  name,
  form,
  fields,
  size = 'medium',
  group = true,
  before,
  children,
}: FieldProps<Values, Categories> & {
  size?: React.ComponentProps<typeof Switch>['size']
  before?: React.ReactNode
  children?: React.ReactNode
  group?: boolean
}) {
  const field = fields[name]
  const { setValue, value, error } = useRegisterForm({
    name,
    field,
    form,
  })

  const el = (
    <div className="flex gap-1 items-center">
      {before}
      <Switch
        aria-label={name}
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
      <FieldGroup
        title={field.title}
        name={name}
        form={form}
        className="pb-[1.5px]"
      >
        {el}
      </FieldGroup>
    )
  }

  return el
}
