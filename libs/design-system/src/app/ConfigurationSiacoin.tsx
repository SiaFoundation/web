import { SiacoinField } from '../core/SiacoinField'
import BigNumber from 'bignumber.js'
import { ConfigurationTipNumber } from './ConfigurationTipNumber'
import { toHastings } from '@siafoundation/sia-js'
import { FieldLabelAndError } from '../components/Form'
import { useCallback } from 'react'

type Props = {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any
  average?: BigNumber
  suggestion?: BigNumber
  units?: string
  suggestionTip?: React.ReactNode
  decimalsLimitSc?: number
  decimalsLimitFiat?: number
  tipsDecimalsLimitSc?: number
  changed?: Record<string, boolean>
}

export function ConfigurationSiacoin({
  name,
  formik,
  average,
  suggestion,
  units,
  suggestionTip,
  decimalsLimitSc = 6,
  decimalsLimitFiat = 6,
  tipsDecimalsLimitSc = 0,
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
  return (
    <div className="flex flex-col gap-3 w-[220px]">
      <SiacoinField
        name={name}
        size="small"
        sc={formik.values[name]}
        units={units}
        decimalsLimitSc={decimalsLimitSc}
        decimalsLimitFiat={decimalsLimitFiat}
        error={formik.touched[name] && formik.errors[name]}
        changed={changed && changed[name]}
        placeholder={suggestion || average}
        onBlur={() => {
          formik.setFieldTouched(name)
        }}
        onChange={(val) => onChange(val)}
      />
      {average && (
        <ConfigurationTipNumber
          type="siacoin"
          label="Network average"
          tip="Averages provided by Sia Central."
          decimalsLimit={tipsDecimalsLimitSc}
          value={toHastings(average)}
          onClick={() => {
            onChange(average)
            formik.setFieldTouched(name)
          }}
        />
      )}
      {suggestion && suggestionTip && (
        <ConfigurationTipNumber
          type="siacoin"
          label="Suggestion"
          tip={suggestionTip}
          decimalsLimit={tipsDecimalsLimitSc}
          value={toHastings(suggestion)}
          onClick={() => {
            onChange(suggestion)
            formik.setFieldTouched(name)
          }}
        />
      )}
      <div className="h-[20px]">
        <FieldLabelAndError formik={formik} name={name} />
      </div>
    </div>
  )
}
