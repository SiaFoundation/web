import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { FieldLabelAndError } from '../components/Form'
import { Option, Select } from '../core/Select'
import { ConfigurationTipText } from './ConfigurationTipText'
import { ConfigFields, useRegisterForm } from './configurationFields'

type Option = {
  value: string
  label: string
}

type Props<Values extends FieldValues, Categories extends string> = {
  name: Path<Values>
  form: UseFormReturn<Values>
  fields: ConfigFields<Values, Categories>
}

export function ConfigurationSelect<
  Values extends FieldValues,
  Categories extends string
>({ name, form, fields }: Props<Values, Categories>) {
  const field = fields[name]
  const { options, suggestion, suggestionTip } = field
  const { ref, onChange, setValue, onBlur, value, error } = useRegisterForm({
    name,
    form,
    field,
  })
  return (
    <div className="flex flex-col gap-3 items-end">
      <div className="flex flex-col gap-3 w-[250px]">
        <div className="flex justify-end w-full">
          <Select
            ref={ref}
            name={name}
            size="small"
            value={value}
            state={
              error
                ? 'invalid'
                : form.formState.dirtyFields[name]
                ? 'valid'
                : 'default'
            }
            onChange={onChange}
            onBlur={onBlur}
          >
            {options?.map((o) => (
              <Option key={o.value} value={o.value}>
                {o.label}
              </Option>
            ))}
          </Select>
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
