import { NumberField } from '../core/NumberField'
import BigNumber from 'bignumber.js'
import { ConfigurationTipNumber } from './ConfigurationTipNumber'
import { useCallback } from 'react'
import { FieldLabelAndError } from '../components/Form'

type Props = {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any
  average?: BigNumber
  placeholder?: BigNumber
  suggestion?: BigNumber
  suggestionTip?: React.ReactNode
  units?: string
  decimalsLimit?: number
  changed?: Record<string, boolean>
}

export function ConfigurationNumber({
  name,
  formik,
  placeholder: _placeholder,
  average,
  suggestion,
  suggestionTip,
  decimalsLimit = 2,
  units,
  changed,
}: Props) {
  const onChange = useCallback(
    (value?: BigNumber) => {
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

  const placeholder = formik.initialValues[name] || _placeholder
  return (
    <div className="flex flex-col gap-3 w-[220px]">
      <NumberField
        value={value}
        units={units}
        decimalsLimit={decimalsLimit}
        placeholder={placeholder}
        state={
          error ? 'invalid' : changed && changed[name] ? 'valid' : 'default'
        }
        onChange={(val) => {
          onChange(val !== undefined ? new BigNumber(val) : undefined)
        }}
        onBlur={() => {
          formik.setFieldTouched(name)
        }}
      />
      <div className="flex flex-col gap-2">
        {average && (
          <ConfigurationTipNumber
            type="number"
            label="Network average"
            tip="Averages provided by Sia Central."
            decimalsLimit={decimalsLimit}
            value={average}
            units={units}
            onClick={() => {
              onChange(average)
              formik.setFieldTouched(name)
            }}
          />
        )}
        {suggestion && suggestionTip && (
          <ConfigurationTipNumber
            type="number"
            label="Suggestion"
            tip={suggestionTip}
            decimalsLimit={decimalsLimit}
            value={suggestion}
            units={units}
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
