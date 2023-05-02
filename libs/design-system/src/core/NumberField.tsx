import { BaseNumberField } from './BaseNumberField'
import { useCallback, useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { toFixedMax } from '../lib/numbers'

type Props = Omit<
  React.ComponentProps<typeof BaseNumberField>,
  'onChange' | 'placeholder'
> & {
  value: BigNumber
  onChange?: (val?: BigNumber) => void
  units?: string
  decimalsLimit?: number
  decimalsLimitFiat?: number
  placeholder?: BigNumber
  showFiat?: boolean
  error?: boolean
  changed?: boolean
}

export function NumberField({
  value: _externalValue,
  placeholder = new BigNumber(100),
  decimalsLimit = 6,
  onChange,
  size = 'small',
  units,
  error,
  changed,
  onBlur,
  onFocus,
  ...props
}: Props) {
  const externalValue = useMemo(
    () => new BigNumber(_externalValue),
    [_externalValue]
  )
  const [value, setValue] = useState<string>('')

  const updateExternalValue = useCallback(
    (value: string) => {
      if (onChange) {
        onChange(
          value && !isNaN(Number(value)) ? new BigNumber(value) : undefined
        )
      }
    },
    [onChange]
  )

  const getValue = useCallback(
    (value: BigNumber) => {
      return toFixedMax(value, decimalsLimit)
    },
    [decimalsLimit]
  )

  // sync externally controlled value
  useEffect(() => {
    if (!externalValue.isEqualTo(value)) {
      const fesc = getValue(externalValue)
      setValue(fesc)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalValue])

  const internalOnBlur = useCallback(() => {
    updateExternalValue(value)
  }, [value, updateExternalValue])

  return (
    <BaseNumberField
      {...props}
      size={size}
      placeholder={placeholder.toFixed(decimalsLimit)}
      units={units}
      value={value !== 'NaN' ? value : ''}
      decimalsLimit={decimalsLimit}
      onBlur={(e) => {
        internalOnBlur()
        if (onBlur) {
          onBlur(e)
        }
      }}
      onFocus={(e) => {
        if (onFocus) {
          onFocus(e)
        }
      }}
      onValueChange={(value) => setValue(value || '')}
    />
  )
}
