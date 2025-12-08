import { FieldValues, Path, PathValue } from 'react-hook-form'
import { FieldError } from '../components/Form'
import { FieldProps } from './configurationFields'
import { FieldText } from './FieldText'
import { TipText } from './TipText'
import { useFormSetField } from './useFormSetField'

const noop = () => null

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
  const { suggestionLabel, suggestion, suggestionTip, after } = field
  const setField = useFormSetField({
    form,
    name,
    fields,
  })
  const After = after || noop
  return (
    <div className="flex flex-col gap-3 items-end">
      <div className="flex flex-col gap-3 w-[260px]">
        <FieldText
          name={name}
          form={form}
          fields={fields}
          type={type}
          group={false}
        />
        {suggestion && suggestionTip && (
          <TipText
            label={suggestionLabel || 'Suggestion'}
            tip={suggestionTip}
            value={suggestion as string}
            onClick={() => {
              setField(suggestion as PathValue<Values, Path<Values>>, true)
            }}
          />
        )}
        <After name={name} form={form} fields={fields} />
      </div>
      <div className="h-[20px]">
        <FieldError form={form} name={name} />
      </div>
    </div>
  )
}
