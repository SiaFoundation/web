import { BaseNumberField } from './BaseNumberField'
import {
  useAppSettings,
  useSiaCentralMarketExchangeRate,
} from '@siafoundation/react-core'
import { useCallback, useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { cx } from 'class-variance-authority'
import { toFixedMax } from '../lib/numbers'

type Props = Omit<
  React.ComponentProps<typeof BaseNumberField>,
  'onChange' | 'placeholder'
> & {
  sc: BigNumber
  onChange?: (sc?: BigNumber) => void
  units?: string
  decimalsLimitSc?: number
  decimalsLimitFiat?: number
  placeholder?: BigNumber
  showFiat?: boolean
  error?: boolean
  changed?: boolean
}

const zero = new BigNumber(0)

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
  onBlur,
  onFocus,
  ...props
}: Props) {
  const externalSc = useMemo(() => new BigNumber(_externalSc), [_externalSc])
  const { settings } = useAppSettings()
  const rates = useSiaCentralMarketExchangeRate()
  const rate = useMemo(() => {
    if (!settings.siaCentral || !rates.data) {
      return zero
    }
    return new BigNumber(rates.data?.rates.sc[settings.currency.id] || zero)
  }, [rates.data, settings])
  const [active, setActive] = useState<'sc' | 'fiat'>()
  const [sc, setSc] = useState<string>('')
  const [fiat, setFiat] = useState<string>('')

  const updateExternalSc = useCallback(
    (sc: string) => {
      if (onChange) {
        onChange(sc && !isNaN(Number(sc)) ? new BigNumber(sc) : undefined)
      }
    },
    [onChange]
  )

  const getFiat = useCallback(
    (fiat: BigNumber) => {
      return toFixedMax(fiat, decimalsLimitFiat)
    },
    [decimalsLimitFiat]
  )

  const getSc = useCallback(
    (sc: BigNumber) => {
      return toFixedMax(sc, decimalsLimitSc)
    },
    [decimalsLimitSc]
  )

  const updateFiat = useCallback(
    (fiat: BigNumber) => {
      const uf = getFiat(fiat)
      setFiat(uf)
      return uf
    },
    [setFiat, getFiat]
  )

  const updateSc = useCallback(
    (sc: BigNumber) => {
      const usc = getSc(sc)
      setSc(usc)
      return usc
    },
    [setSc, getSc]
  )

  const syncFiatToSc = useCallback(
    (sc: string) => {
      const fiat = new BigNumber(sc).times(rate)
      return updateFiat(fiat)
    },
    [updateFiat, rate]
  )

  const syncScToFiat = useCallback(
    (fiat: string) => {
      const sc = new BigNumber(fiat).dividedBy(rate)
      return updateSc(sc)
    },
    [updateSc, rate]
  )

  // sync externally controlled value
  useEffect(() => {
    if (!externalSc.isEqualTo(sc)) {
      const fesc = getSc(externalSc)
      setActive(undefined)
      setSc(fesc)
      syncFiatToSc(fesc)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalSc])

  // initialize fiat once rate has loaded
  useEffect(() => {
    syncFiatToSc(sc)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rate])

  useEffect(() => {
    if (active === 'sc') {
      syncFiatToSc(sc)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sc])

  useEffect(() => {
    if (active === 'fiat') {
      syncScToFiat(fiat)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fiat])

  const onScBlur = useCallback(() => {
    syncFiatToSc(sc)
    updateExternalSc(sc)
  }, [sc, syncFiatToSc, updateExternalSc])

  // Its more natural that focusing and blurring fiat without changing it
  // does update the sc value.
  const onFiatBlur = useCallback(() => {
    updateExternalSc(sc)
  }, [sc, updateExternalSc])

  return (
    <div
      className={cx(
        'flex flex-col bg-white dark:bg-graydark-50',
        'focus-within:ring ring-blue-500 dark:ring-blue-200',
        'border',
        error
          ? 'border-red-500 dark:border-red-400'
          : changed
          ? 'border-green-500 dark:border-green-400'
          : 'border-gray-200 dark:border-graydark-200',
        'rounded'
      )}
    >
      <BaseNumberField
        {...props}
        size={size}
        variant="ghost"
        focus="none"
        placeholder={placeholder.toFixed(decimalsLimitSc)}
        units={units}
        value={sc !== 'NaN' ? sc : ''}
        decimalsLimit={decimalsLimitSc}
        onBlur={(e) => {
          onScBlur()
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
        onValueChange={(value) => setSc(value || '')}
      />
      {showFiat && settings.siaCentral && (
        <BaseNumberField
          {...props}
          size={size}
          variant="ghost"
          focus="none"
          value={fiat !== 'NaN' ? fiat : ''}
          units={settings.currency.label}
          decimalsLimit={decimalsLimitFiat}
          placeholder={`${settings.currency.prefix}${
            rate ? rate.times(placeholder).toFixed(decimalsLimitFiat) : '0.42'
          }`}
          prefix={settings.currency.prefix}
          onFocus={(e) => {
            setActive('fiat')
            if (onFocus) {
              onFocus(e)
            }
          }}
          onBlur={(e) => {
            onFiatBlur()
            if (onBlur) {
              onBlur(e)
            }
          }}
          onValueChange={(value) => setFiat(value || '')}
        />
      )}
    </div>
  )
}
