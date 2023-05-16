import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { FieldLabelAndError } from '../components/Form'
import { TextField } from '../core/TextField'
import { ConfigurationTipText } from './ConfigurationTipText'
import { ConfigField, useRegisterForm } from './configurationFields'

type Props<Values extends FieldValues, Categories extends string> = {
  name: Path<Values>
  form: UseFormReturn<Values>
  field: ConfigField<Values, Categories>
  type?: 'password'
}

export function ConfigurationText<
  Values extends FieldValues,
  Categories extends string
>({ name, form, field, type }: Props<Values, Categories>) {
  const { placeholder, suggestion, suggestionTip } = field
  const { onChange, onBlur, value, error } = useRegisterForm({
    name,
    form,
    field,
  })
  return (
    <div className="flex flex-col gap-3 items-end">
      <div className="flex flex-col gap-3 w-[220px]">
        <TextField
          placeholder={placeholder}
          value={value}
          type={type}
          state={
            error
              ? 'invalid'
              : form.formState.dirtyFields[name]
              ? 'valid'
              : 'default'
          }
          onChange={(e) => {
            onChange(e.currentTarget.value as PathValue<Values, Path<Values>>)
          }}
          onBlur={(e) => {
            onBlur(e)
            onChange(value)
          }}
        />
        <div className="flex flex-col gap-2">
          {suggestion && suggestionTip && (
            <ConfigurationTipText
              label="Suggestion"
              tip={suggestionTip}
              value={suggestion as string}
              onClick={() => {
                onChange(suggestion as PathValue<Values, Path<Values>>)
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
