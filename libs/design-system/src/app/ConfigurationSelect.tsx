import { useCallback } from 'react'
import { FieldLabelAndError } from '../components/Form'
import { Select } from '../core/Select'
import { ConfigurationTipText } from './ConfigurationTipText'

type Option = {
  value: string
  label: string
}

type Props = {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any
  suggestion?: string
  suggestionTip?: React.ReactNode
  changed?: Record<string, boolean>
  options: Option[]
}

export function ConfigurationSelect({
  name,
  formik,
  options,
  suggestion,
  suggestionTip,
  changed,
}: Props) {
  const onChange = useCallback(
    (value: string) => {
      const func = async () => {
        await formik.setFieldValue(name, value)
        // For some reason when setFieldValue is called with an undefined value,
        // formik validates the value twice the second time with the initialValue.
        // Force revalidating the field again fixes this.
        await formik.validateField(name)
      }
      func()
    },
    [formik, name]
  )
  const value = formik.values[name]
  const error = formik.touched[name] && formik.errors[name]

  return (
    <div className="flex flex-col gap-3 w-[220px]">
      <div className="flex justify-end w-full">
        <Select
          size="small"
          value={value}
          state={
            error ? 'invalid' : changed && changed[name] ? 'valid' : 'default'
          }
          onChange={(e) => onChange(e.currentTarget.value)}
          onBlur={() => {
            formik.setFieldTouched(name)
          }}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
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
              onChange(suggestion)
              formik.setFieldTouched(name)
            }}
          />
        )}
      </div>
      <div className="h-[20px]">
        <FieldLabelAndError formik={formik} name={name} />
      </div>
    </div>
  )
}
