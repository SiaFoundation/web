'use client'

import {
  useAppSettings,
  useActiveExchangeRate,
} from '@siafoundation/react-core'
import { useCallback, useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { cx } from 'class-variance-authority'
import { toFixedMaxString } from '../lib/numbers'
import { BaseNumberField } from './BaseNumberField'

type Props = Omit<
  React.ComponentProps<typeof BaseNumberField>,
  'onChange' | 'placeholder'
> & {
  sc?: BigNumber
  onChange?: (sc?: BigNumber) => void
  units?: string
  decimalsLimitSc?: number
  decimalsLimitFiat?: number
  placeholder?: BigNumber
  showFiat?: boolean
  error?: boolean
  changed?: boolean
}

export function SiacoinField({
  sc: _externalSc,
  placeholder = new BigNumber(100),
  decimalsLimitFiat = 6,
  decimalsLimitSc = 6,
  onChange,
  size = 'medium',
  units = 'SC',
  showFiat = true,
  error,
  changed,
  prefix,
  onBlur,
  onFocus,
  name,
  ...props
}: Props) {
  const externalSc = useMemo(
    () => new BigNumber(_externalSc === undefined ? NaN : _externalSc),
    [_externalSc]
  )
  const { settings } = useAppSettings()
  const exchangeRate = useActiveExchangeRate()
  const rate = exchangeRate ? exchangeRate.rate : undefined
  const [active, setActive] = useState<'sc' | 'fiat'>()
  const [localSc, setLocalSc] = useState<string>('')
  const [localFiat, setLocalFiat] = useState<string>('')

  const updateExternalSc = useCallback(
    (sc: string) => {
      if (onChange) {
        onChange(sc && !isNaN(Number(sc)) ? new BigNumber(sc) : undefined)
      }
    },
    [onChange]
  )

  const updateFiat = useCallback(
    (fiat: BigNumber) => {
      const uf = toFixedMaxString(fiat, decimalsLimitFiat)
      setLocalFiat(uf)
    },
    [setLocalFiat, decimalsLimitFiat]
  )

  const updateSc = useCallback(
    (sc: BigNumber) => {
      const usc = toFixedMaxString(sc, decimalsLimitSc)
      setLocalSc(usc)
      updateExternalSc(usc)
      return usc
    },
    [setLocalSc, decimalsLimitSc, updateExternalSc]
  )

  const onScChange = useCallback(
    (sc: string) => {
      setLocalSc(sc)
      if (active) {
        updateExternalSc(sc)
      }
    },
    [active, setLocalSc, updateExternalSc]
  )

  const syncFiatToSc = useCallback(
    (sc: string) => {
      const fiat = new BigNumber(sc).times(rate || 0)
      updateFiat(fiat)
    },
    [updateFiat, rate]
  )

  const syncScToFiat = useCallback(
    (fiat: string) => {
      const sc = new BigNumber(fiat).dividedBy(rate || 0)
      updateSc(sc)
    },
    [updateSc, rate]
  )

  const [hasInitializedSc, setHasInitializedSc] = useState(false)
  // sync externally controlled value
  useEffect(() => {
    if (!externalSc.isEqualTo(localSc)) {
      const fesc = toFixedMaxString(externalSc, decimalsLimitSc)
      setLocalSc(fesc)
      // sync fiat if its not active, syncing it when it is being changed
      // may change the decimals as the user is typing.
      if (active !== 'fiat') {
        syncFiatToSc(fesc)
      }
    }
    if (!hasInitializedSc) {
      setHasInitializedSc(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalSc])

  // initialize fiat once rate has loaded,
  // but only if the siacoin value has initialized
  useEffect(() => {
    if (hasInitializedSc) {
      syncFiatToSc(localSc)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rate])

  useEffect(() => {
    if (active === 'sc') {
      syncFiatToSc(localSc)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSc])

  useEffect(() => {
    if (active === 'fiat') {
      syncScToFiat(localFiat)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localFiat])

  return (
    <div
      className={cx(
        'flex flex-col',
        'focus-within:ring ring-blue-500 dark:ring-blue-200',
        'border',
        props.readOnly
          ? 'bg-gray-200 dark:bg-graydark-300'
          : 'bg-white dark:bg-graydark-50',
        props.readOnly ? 'pointer-events-none' : '',
        props.readOnly
          ? 'border-blue-400 dark:border-blue-400'
          : error
          ? 'border-red-500 dark:border-red-400'
          : changed
          ? 'border-green-500 dark:border-green-400'
          : 'border-gray-200 dark:border-graydark-200',
        'rounded'
      )}
    >
      <BaseNumberField
        {...props}
        name={name}
        data-testid="scInput"
        size={size}
        variant="ghost"
        focus="none"
        placeholder={toFixedMaxString(placeholder, decimalsLimitSc)}
        units={units}
        value={localSc !== 'NaN' ? localSc : ''}
        decimalScale={decimalsLimitSc}
        allowNegative={false}
        onValueChange={(value) => {
          onScChange(value.value || '')
        }}
        onBlur={(e) => {
          setActive(undefined)
          if (onBlur) {
            onBlur(e)
          }
        }}
        onFocus={(e) => {
          setActive('sc')
          if (onFocus) {
            onFocus(e)
          }
        }}
      />
      {showFiat && settings.siaCentral && (
        <BaseNumberField
          {...props}
          data-testid="fiatInput"
          name={`${name}-fiat`}
          size={size}
          variant="ghost"
          focus="none"
          value={localFiat !== 'NaN' ? localFiat : ''}
          units={settings.currency.label}
          decimalScale={decimalsLimitSc}
          allowNegative={false}
          onValueChange={(value) => {
            setLocalFiat(value.value || '')
          }}
          placeholder={`${settings.currency.prefix}${
            rate ? rate.times(placeholder).toFixed(decimalsLimitFiat) : '0.42'
          }`}
          prefix={prefix || settings.currency.prefix}
          onFocus={(e) => {
            setActive('fiat')
            if (onFocus) {
              onFocus(e)
            }
          }}
          onBlur={(e) => {
            setActive(undefined)
            if (onBlur) {
              onBlur(e)
            }
          }}
        />
      )}
    </div>
  )
}
