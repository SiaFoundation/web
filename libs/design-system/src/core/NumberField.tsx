'use client'

import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toFixedMax } from '../lib/numbers'
import { BaseNumberField } from './BaseNumberField'

type Props = Omit<
  React.ComponentProps<typeof BaseNumberField>,
  'onChange' | 'placeholder' | 'value'
> & {
  value: BigNumber
  onChange?: (val?: BigNumber) => void
  units?: string
  decimalsLimit?: number
  decimalsLimitFiat?: number
  allowDecimals?: boolean
  disableGroupSeparators?: boolean
  placeholder?: BigNumber
  showFiat?: boolean
  error?: boolean
  changed?: boolean
}

export function NumberField({
  value: _externalValue,
  placeholder = new BigNumber(100),
  decimalsLimit = 6,
  allowDecimals = true,
  disableGroupSeparators,
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
    [_externalValue],
  )
  const [localValue, setLocalValue] = useState<string>('')

  const updateExternalValue = useCallback(
    (value: string) => {
      if (onChange) {
        onChange(
          value && !isNaN(Number(value)) ? new BigNumber(value) : undefined,
        )
      }
    },
    [onChange],
  )

  const onValueChange = useCallback(
    (value: string) => {
      setLocalValue(value)
      updateExternalValue(value)
    },
    [updateExternalValue],
  )

  // sync externally controlled value
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!externalValue.isEqualTo(localValue)) {
      const fesc = toFixedMax(externalValue, decimalsLimit)
      setLocalValue(fesc)
    }
  }, [externalValue])

  return (
    <BaseNumberField
      {...props}
      thousandsGroupStyle={disableGroupSeparators ? 'none' : undefined}
      data-testid="numberfield"
      size={size}
      placeholder={
        placeholder.isNaN() ? '' : toFixedMax(placeholder, decimalsLimit)
      }
      units={units}
      value={localValue !== 'NaN' ? localValue : ''}
      decimalScale={allowDecimals ? decimalsLimit : 0}
      onBlur={(e) => {
        if (onBlur) {
          onBlur(e)
        }
      }}
      onFocus={(e) => {
        if (onFocus) {
          onFocus(e)
        }
      }}
      onValueChange={(value) => onValueChange(value.value || '')}
    />
  )
}
