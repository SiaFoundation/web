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
  const { ref, setValue, value, error } = useRegisterForm({
    name,
    field,
    form,
  })
  return (
    <div className="flex flex-col gap-3 items-end">
      <div className="flex flex-col gap-3 w-[220px]">
        <div className="flex justify-end w-full">
          <Switch
            ref={ref}
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
