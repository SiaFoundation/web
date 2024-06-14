import { FieldValues } from 'react-hook-form'
import { FieldGroup } from '../components/Form'
import { TextField } from '../core/TextField'
import { FieldProps, useRegisterForm } from './configurationFields'

export function FieldText<
  Values extends FieldValues,
  Categories extends string
>({
  name,
  form,
  fields,
  size = 'small',
  autoComplete,
  spellCheck,
  state = true,
  group = true,
  type,
}: FieldProps<Values, Categories> & {
  size?: React.ComponentProps<typeof TextField>['size']
  autoComplete?: React.ComponentProps<typeof TextField>['autoComplete']
  spellCheck?: React.ComponentProps<typeof TextField>['spellCheck']
  group?: boolean
  state?: boolean
  type?: 'password'
}) {
  const field = fields[name]
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
      autoComplete={
        autoComplete !== undefined ? autoComplete : field.autoComplete
      }
      type={type || field.type}
      readOnly={field.readOnly}
      spellCheck={spellCheck}
      onClick={field.onClick}
      state={
        state
          ? error
            ? 'invalid'
            : form.formState.dirtyFields[name]
            ? 'valid'
            : 'default'
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
  }

  return el
}
