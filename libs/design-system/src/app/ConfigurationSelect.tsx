import { useCallback } from 'react'
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { FieldLabelAndError } from '../components/Form'
import { Option, Select } from '../core/Select'
import { ConfigurationTipText } from './ConfigurationTipText'
import { ConfigField } from './configurationFields'

type Option = {
  value: string
  label: string
}

type Props<Values extends FieldValues, Categories extends string> = {
  name: Path<Values>
  form: UseFormReturn<Values>
  field: ConfigField<Values, Categories>
}

export function ConfigurationSelect<
  Values extends FieldValues,
  Categories extends string
>({ name, form, field }: Props<Values, Categories>) {
  const { options, suggestion, suggestionTip } = field
  const value = form.getValues(name)
  const error =
    form.formState.touchedFields[name] && !!form.formState.errors[name]
  const { onBlur } = form.register(name, field.validation)
  const onChange = useCallback(
    (val: PathValue<Values, Path<Values>>) => {
      form.setValue(name, val, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
      field.trigger?.forEach((t) => form.trigger(t))
    },
    [name, form, field]
  )
  return (
    <div className="flex flex-col gap-3 items-end">
      <div className="flex flex-col gap-3 w-[220px]">
        <div className="flex justify-end w-full">
          <Select
            size="small"
            value={value}
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
