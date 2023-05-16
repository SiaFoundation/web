import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { FieldLabelAndError } from '../components/Form'
import { Switch } from '../core/Switch'
import { ConfigurationTipText } from './ConfigurationTipText'
import { ConfigField, useRegisterForm } from './configurationFields'

type Props<Values extends FieldValues, Categories extends string> = {
  name: Path<Values>
  form: UseFormReturn<Values>
  field: ConfigField<Values, Categories>
}

export function ConfigurationSwitch<
  Values extends FieldValues,
  Categories extends string
>({ name, form, field }: Props<Values, Categories>) {
  const { suggestion, suggestionTip } = field
  const { onChange, onBlur, value, error } = useRegisterForm({
    name,
    field,
    form,
  })
  return (
    <div className="flex flex-col gap-3 items-end">
      <div className="flex flex-col gap-3 w-[220px]">
        <div className="flex justify-end w-full">
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
        </div>
        <div className="flex flex-col gap-2">
          {suggestion !== undefined && suggestionTip && (
            <ConfigurationTipText
              label="Suggestion"
              tip={suggestionTip}
              value={suggestion ? 'on' : 'off'}
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
