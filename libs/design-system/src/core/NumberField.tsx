'use client'

import { BaseNumberField } from './BaseNumberField'
import {
  forwardRef,
  Ref,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import BigNumber from 'bignumber.js'
import { toFixedMax } from '../lib/numbers'

type Props = Omit<
  React.ComponentProps<typeof BaseNumberField>,
  'onChange' | 'placeholder' | 'value'
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

export const NumberField = forwardRef(function NumberField(
  {
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
  }: Props,
  ref: Ref<HTMLInputElement>
) {
  const externalValue = useMemo(
    () => new BigNumber(_externalValue),
    [_externalValue]
  )
  const [localValue, setLocalValue] = useState<string>('')
  const value = useMemo(() => normalizedNumberString(localValue), [localValue])

  const updateExternalValue = useCallback(
    (value: string) => {
      if (onChange) {
        value = normalizedNumberString(value)
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
    if (!externalValue.isEqualTo(value)) {
      const fesc = toFixedMax(externalValue, decimalsLimit)
      setLocalValue(fesc)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalValue])

  return (
    <BaseNumberField
      ref={ref}
      {...props}
      data-testid="numberfield"
      size={size}
      placeholder={
        placeholder.isNaN() ? '' : placeholder.toFixed(decimalsLimit)
      }
      units={units}
      value={localValue !== 'NaN' ? localValue : ''}
      decimalsLimit={decimalsLimit}
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
      onValueChange={(value) => onValueChange(value || '')}
    />
  )
})

function normalizedNumberString(v: string): string {
  // normalize separators
  return v?.replace(/,/g, '.') || ''
}
