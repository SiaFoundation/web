'use client'

import { BaseNumberField } from './BaseNumberField'
import { useAppSettings } from '@siafoundation/react-core'
import {
  forwardRef,
  Ref,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import BigNumber from 'bignumber.js'
import { cx } from 'class-variance-authority'
import { toFixedMax } from '../lib/numbers'
import { useSiaCentralExchangeRates } from '@siafoundation/react-sia-central'

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

const zero = new BigNumber(0)

export const SiacoinField = forwardRef(function SiacoinField(
  {
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
    ...props
  }: Props,
  ref: Ref<HTMLDivElement>
) {
  const externalSc = useMemo(
    () => new BigNumber(_externalSc === undefined ? NaN : _externalSc),
    [_externalSc]
  )
  const { settings } = useAppSettings()
  const rates = useSiaCentralExchangeRates({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })
  const rate = useMemo(() => {
    if (!settings.siaCentral || !rates.data) {
      return zero
    }
    return new BigNumber(rates.data?.rates.sc[settings.currency.id] || zero)
  }, [rates.data, settings])
  const [active, setActive] = useState<'sc' | 'fiat'>()
  const [localSc, setLocalSc] = useState<string>('')
  const [localFiat, setLocalFiat] = useState<string>('')
  const sc = useMemo(() => normalizedNumberString(localSc), [localSc])
  const fiat = useMemo(() => normalizedNumberString(localFiat), [localFiat])

  const updateExternalSc = useCallback(
    (sc: string) => {
      if (onChange) {
        sc = normalizedNumberString(sc)
        onChange(sc && !isNaN(Number(sc)) ? new BigNumber(sc) : undefined)
      }
    },
    [onChange]
  )

  const updateFiat = useCallback(
    (fiat: BigNumber) => {
      const uf = toFixedMax(fiat, decimalsLimitFiat)
      setLocalFiat(uf)
    },
    [setLocalFiat, decimalsLimitFiat]
  )

  const updateSc = useCallback(
    (sc: BigNumber) => {
      const usc = toFixedMax(sc, decimalsLimitSc)
      setLocalSc(usc)
      updateExternalSc(usc)
      return usc
    },
    [setLocalSc, decimalsLimitSc, updateExternalSc]
  )

  const onScChange = useCallback(
    (sc: string) => {
      setLocalSc(sc)
      updateExternalSc(sc)
    },
    [setLocalSc, updateExternalSc]
  )

  const syncFiatToSc = useCallback(
    (sc: string) => {
      const fiat = new BigNumber(sc).times(rate)
      updateFiat(fiat)
    },
    [updateFiat, rate]
  )

  const syncScToFiat = useCallback(
    (fiat: string) => {
      const sc = new BigNumber(fiat).dividedBy(rate)
      updateSc(sc)
    },
    [updateSc, rate]
  )

  const [hasInitializedSc, setHasInitializedSc] = useState(false)
  // sync externally controlled value
  useEffect(() => {
    if (!externalSc.isEqualTo(sc)) {
      const fesc = toFixedMax(externalSc, decimalsLimitSc)
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
      syncFiatToSc(sc)
    }
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

  return (
    <div
      ref={ref}
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
        data-testid="scInput"
        size={size}
        variant="ghost"
        focus="none"
        placeholder={toFixedMax(placeholder, decimalsLimitSc)}
        units={units}
        value={localSc !== 'NaN' ? localSc : ''}
        decimalsLimit={decimalsLimitSc}
        allowNegativeValue={false}
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
        onValueChange={(value) => {
          onScChange(value || '')
        }}
      />
      {showFiat && settings.siaCentral && (
        <BaseNumberField
          {...props}
          data-testid="fiatInput"
          size={size}
          variant="ghost"
          focus="none"
          value={localFiat !== 'NaN' ? localFiat : ''}
          units={settings.currency.label}
          decimalsLimit={decimalsLimitFiat}
          allowNegativeValue={false}
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
          onValueChange={(value) => {
            setLocalFiat(value || '')
          }}
        />
      )}
    </div>
  )
})

function normalizedNumberString(v: string): string {
  // normalize separators
  return v?.replace(/,/g, '.') || ''
}
