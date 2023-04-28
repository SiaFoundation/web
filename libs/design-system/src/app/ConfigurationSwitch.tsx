import { NumberField } from '../core/NumberField'
import { toFixedMax } from '../lib/numbers'
import BigNumber from 'bignumber.js'
import { ConfigurationTipNumber } from './ConfigurationTipNumber'
import { useCallback } from 'react'
import { FieldError } from '../components/Form'
import { Switch } from '../core/Switch'
import { ConfigurationTipText } from './ConfigurationTipText'

type Props = {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any
  suggestion?: boolean
  suggestionTip?: React.ReactNode
  changed?: Record<string, boolean>
}

export function ConfigurationSwitch({
  name,
  formik,
  suggestion,
  suggestionTip,
  changed,
}: Props) {
  const onChange = useCallback(
    (value: boolean) => {
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
        <Switch
          size="medium"
          checked={value}
          state={
            error ? 'invalid' : changed && changed[name] ? 'valid' : 'default'
          }
          onCheckedChange={onChange}
          onBlur={() => {
            formik.setFieldTouched(name)
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
