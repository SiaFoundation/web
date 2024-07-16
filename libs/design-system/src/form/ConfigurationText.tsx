import type { FieldValues, Path, PathValue } from 'react-hook-form'
import { FieldError } from '../components/Form'
import { FieldText } from './FieldText'
import { TipText } from './TipText'
import type { FieldProps } from './configurationFields'
import { useFormSetField } from './useFormSetField'

export function ConfigurationText<
  Values extends FieldValues,
  Categories extends string,
>({
  name,
  form,
  fields,
  type,
}: FieldProps<Values, Categories> & {
  type?: 'password'
}) {
  const field = fields[name]
  const { suggestion, suggestionTip } = field
  const setField = useFormSetField({
    form,
    name,
    field,
  })
  return (
    <div className="flex flex-col gap-3 items-end">
      <div className="flex flex-col gap-3 w-[250px]">
        <FieldText name={name} form={form} fields={fields} type={type} />
        {suggestion && suggestionTip && (
          <TipText
            label="Suggestion"
            tip={suggestionTip}
            value={suggestion as string}
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
