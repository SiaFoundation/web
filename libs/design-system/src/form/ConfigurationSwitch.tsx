import { FieldValues, Path, PathValue } from 'react-hook-form'
import { FieldError } from '../components/Form'
import { FieldProps } from './configurationFields'
import { FieldSwitch } from './FieldSwitch'
import { TipText } from './TipText'
import { useFormSetField } from './useFormSetField'

export function ConfigurationSwitch<
  Values extends FieldValues,
  Categories extends string
>({ name, form, fields }: FieldProps<Values, Categories>) {
  const field = fields[name]
  const { suggestionLabel, suggestion, suggestionTip } = field
  const setField = useFormSetField({
    form,
    name,
    fields,
  })
  return (
    <div className="flex flex-col gap-3 items-end">
      <div className="flex flex-col gap-3 w-[260px]">
        <div className="flex justify-end w-full">
          <FieldSwitch name={name} form={form} fields={fields} group={false} />
        </div>
        {suggestion !== undefined && suggestionTip && (
          <TipText
            label={suggestionLabel || 'Suggestion'}
            tip={suggestionTip}
            value={suggestion ? 'on' : 'off'}
            onClick={() => {
              setField(suggestion as PathValue<Values, Path<Values>>, true)
            }}
          />
        )}
      </div>
      <div className="h-[20px]">
        <FieldError form={form} name={name} />
      </div>
    </div>
  )
}
