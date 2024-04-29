import { FieldValues, Path, PathValue } from 'react-hook-form'
import { FieldLabelAndError } from '../components/Form'
import { TextField } from '../core/TextField'
import { ConfigurationTipText } from './ConfigurationTipText'
import { FieldProps, useRegisterForm } from './configurationFields'

export function ConfigurationText<
  Values extends FieldValues,
  Categories extends string
>({
  name,
  form,
  fields,
  type,
}: FieldProps<Values, Categories> & {
  type?: 'password'
}) {
  const field = fields[name]
  const { placeholder, suggestion, suggestionTip } = field
  const { ref, onChange, setValue, onBlur, error } = useRegisterForm({
    name,
    form,
    field,
  })
  return (
    <div className="flex flex-col gap-3 items-end">
      <div className="flex flex-col gap-3 w-[250px]">
        <TextField
          ref={ref}
          name={name}
          placeholder={placeholder}
          type={type}
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
        <div className="flex flex-col gap-2">
          {suggestion && suggestionTip && (
            <ConfigurationTipText
              label="Suggestion"
              tip={suggestionTip}
              value={suggestion as string}
              onClick={() => {
                setValue(suggestion as PathValue<Values, Path<Values>>, true)
              }}
            />
          )}
        </div>
      </div>
      <div className="h-[20px]">
        <FieldLabelAndError form={form} name={name} />
      </div>
    </div>
  )
}
