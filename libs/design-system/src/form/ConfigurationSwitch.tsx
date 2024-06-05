import { FieldValues, Path, PathValue } from 'react-hook-form'
import { FieldLabelAndError } from '../components/Form'
import { Switch } from '../core/Switch'
import { ConfigurationTipText } from './ConfigurationTipText'
import { FieldProps, useRegisterForm } from './configurationFields'

export function ConfigurationSwitch<
  Values extends FieldValues,
  Categories extends string
>({ name, form, fields }: FieldProps<Values, Categories>) {
  const field = fields[name]
  const { suggestion, suggestionTip } = field
  const { setValue, value, error } = useRegisterForm({
    name,
    field,
    form,
  })
  return (
    <div className="flex flex-col gap-3 items-end">
      <div className="flex flex-col gap-3 w-[250px]">
        <div className="flex justify-end w-full">
          <Switch
            aria-label={name}
            name={name}
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
              setValue(val as PathValue<Values, Path<Values>>, true)
            }}
            onBlur={() => {
              setValue(value, true)
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          {suggestion !== undefined && suggestionTip && (
            <ConfigurationTipText
              label="Suggestion"
              tip={suggestionTip}
              value={suggestion ? 'on' : 'off'}
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
