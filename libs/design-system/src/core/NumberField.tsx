'use client'

import { BaseNumberField } from './BaseNumberField'
import { useCallback, useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { toFixedMaxString } from '../lib/numbers'

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
    [_externalValue]
  )
  const [localValue, setLocalValue] = useState<string>('')

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

  const onValueChange = useCallback(
    (value: string) => {
      setLocalValue(value)
      updateExternalValue(value)
    },
    [setLocalValue, updateExternalValue]
  )

  // sync externally controlled value
  useEffect(() => {
    if (!externalValue.isEqualTo(localValue)) {
      const fesc = toFixedMaxString(externalValue, decimalsLimit)
      setLocalValue(fesc)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalValue])

  return (
    <BaseNumberField
      {...props}
      thousandsGroupStyle={disableGroupSeparators ? 'none' : undefined}
      data-testid="numberfield"
      size={size}
      placeholder={
        placeholder.isNaN() ? '' : toFixedMaxString(placeholder, decimalsLimit)
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
