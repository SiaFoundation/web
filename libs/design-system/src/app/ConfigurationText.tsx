import { useCallback } from 'react'
import { FieldError } from '../components/Form'
import { TextField } from '../core/TextField'
import { ConfigurationTipText } from './ConfigurationTipText'

type Props = {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any
  suggestion?: string
  suggestionTip?: React.ReactNode
  placeholder?: string
  changed?: Record<string, boolean>
}

export function ConfigurationText({
  name,
  formik,
  placeholder,
  suggestion,
  suggestionTip,
  changed,
}: Props) {
  const onChange = useCallback(
    (value?: string) => {
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
  const placeholderStr = formik.initialValues[name] || placeholder
  return (
    <div className="flex flex-col gap-3 w-[220px]">
      <TextField
        placeholder={placeholderStr}
        value={value}
        state={
          error ? 'invalid' : changed && changed[name] ? 'valid' : 'default'
        }
        onChange={(e) => onChange(e.currentTarget.value)}
        onBlur={() => {
          formik.setFieldTouched(name)
        }}
      />
      <div className="flex flex-col gap-2">
        {suggestion && suggestionTip && (
          <ConfigurationTipText
            label="Suggestion"
            tip={suggestionTip}
            value={suggestion}
            onChange={() => {
              onChange(suggestion)
              formik.setFieldTouched(name)
            }}
          />
        )}
      </div>
      <div className="h-[20px]">
        <FieldError formik={formik} name={name} />
      </div>
    </div>
  )
}
