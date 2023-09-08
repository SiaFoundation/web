import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { FieldGroup } from '../components/Form'
import { TextField } from '../core/TextField'
import { ConfigFields, useRegisterForm } from './configurationFields'

type Props<Values extends FieldValues, Categories extends string> = {
  name: Path<Values>
  form: UseFormReturn<Values>
  fields: ConfigFields<Values, Categories>
  size?: React.ComponentProps<typeof TextField>['size']
  autoComplete?: React.ComponentProps<typeof TextField>['autoComplete']
  spellCheck?: React.ComponentProps<typeof TextField>['spellCheck']
  group?: boolean
  state?: boolean
}

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
}: Props<Values, Categories>) {
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
      autoComplete={autoComplete}
      type={field.type}
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
  } else {
    return el
  }
}
