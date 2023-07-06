import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { FieldGroup } from '../components/Form'
import { TextField } from '../core/TextField'
import { ConfigField, useRegisterForm } from './configurationFields'

type Props<Values extends FieldValues, Categories extends string> = {
  name: Path<Values>
  form: UseFormReturn<Values>
  field: ConfigField<Values, Categories>
  size?: React.ComponentProps<typeof TextField>['size']
  autoComplete?: React.ComponentProps<typeof TextField>['autoComplete']
  group?: boolean
}

export function FieldText<
  Values extends FieldValues,
  Categories extends string
>({
  name,
  form,
  field,
  size = 'small',
  autoComplete,
  group = true,
}: Props<Values, Categories>) {
  const { ref, onChange, onBlur, error } = useRegisterForm({
    name,
    form,
    field,
  })

  const el = (
    <TextField
      ref={ref}
      name={name}
      placeholder={field.placeholder}
      size={size}
      autoComplete={autoComplete}
      type={field.type}
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
  } else {
    return el
  }
}
