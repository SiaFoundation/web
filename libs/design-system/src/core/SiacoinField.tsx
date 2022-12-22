import { NumberField } from './NumberField'
import {
  useAppSettings,
  useSiaCentralMarketExchangeRate,
} from '@siafoundation/react-core'
import { useCallback, useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { cx } from 'class-variance-authority'

type Props = Omit<
  React.ComponentProps<typeof NumberField>,
  'onChange' | 'placeholder'
> & {
  sc: BigNumber
  onChange?: (sc?: BigNumber) => void
  decimalsLimitSc?: number
  decimalsLimitFiat?: number
  placeholder?: BigNumber
}

const zero = new BigNumber(0)

export function SiacoinField({
  sc: externalSc,
  placeholder = new BigNumber(100),
  decimalsLimitFiat = 3,
  decimalsLimitSc = 3,
  onChange,
  size = 'medium',
  ...props
}: Props) {
  const { settings } = useAppSettings()
  const rates = useSiaCentralMarketExchangeRate()
  const rate = useMemo(() => {
    if (!settings.siaCentral || !rates.data) {
      return zero
    }
    return new BigNumber(rates.data?.rates.sc[settings.currency.id] || zero)
  }, [rates.data, settings])
  const [active, setActive] = useState<'sc' | 'fiat'>()
  const [sc, setSc] = useState<BigNumber>(zero)
  const [fiat, setFiat] = useState<BigNumber>(zero)

  const setScAndTriggerChange = useCallback(
    (sc: BigNumber) => {
      setSc(sc)
      if (onChange) {
        onChange(sc)
      }
    },
    [setSc, onChange]
  )

  useEffect(() => {
    setActive(undefined)
    setFiat(externalSc.multipliedBy(rate))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rate])

  useEffect(() => {
    if (!externalSc.isEqualTo(sc)) {
      setSc(externalSc)
      setFiat(externalSc.multipliedBy(rate))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalSc])

  useEffect(() => {
    if (active === 'sc') {
      setFiat(sc.multipliedBy(rate))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sc])

  useEffect(() => {
    if (active === 'fiat') {
      setScAndTriggerChange(fiat.dividedBy(rate))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fiat])

  const formattedSc = useMemo(
    () =>
      sc.isZero()
        ? ''
        : sc.decimalPlaces() > decimalsLimitSc
        ? sc.toFixed(decimalsLimitSc)
        : sc.toString(),
    [sc, decimalsLimitSc]
  )

  const formattedFiat = useMemo(
    () =>
      fiat.isZero()
        ? ''
        : fiat.decimalPlaces() > decimalsLimitFiat
        ? fiat.toFixed(decimalsLimitFiat)
        : fiat.toString(),
    [fiat, decimalsLimitFiat]
  )

  return (
    <div
      className={cx(
        'flex flex-col bg-white dark:bg-graydark-50',
        'focus-within:ring ring-blue-500 dark:ring-blue-200',
        'border border-gray-200 dark:border-graydark-200',
        'rounded',
        'px-3',
        'py-0.5'
      )}
    >
      <NumberField
        {...props}
        size={size}
        variant="ghost"
        focus="none"
        placeholder={placeholder.toFixed(decimalsLimitSc)}
        units="SC"
        value={formattedSc}
        decimalsLimit={decimalsLimitSc}
        // decimalSeparator=''
        onFocus={() => setActive('sc')}
        onValueChange={(value) => {
          const sc = new BigNumber(value || 0)
          setScAndTriggerChange(sc)
        }}
      />
      {settings.siaCentral && (
        <NumberField
          {...props}
          size={size}
          variant="ghost"
          focus="none"
          value={formattedFiat}
          units={settings.currency.label}
          decimalsLimit={decimalsLimitFiat}
          placeholder={`${settings.currency.prefix}${
            rate
              ? rate.multipliedBy(placeholder).toFixed(decimalsLimitFiat)
              : '0.42'
          }`}
          prefix={settings.currency.prefix}
          onFocus={() => setActive('fiat')}
          onValueChange={(value) => {
            const fiat = new BigNumber(value || 0)
            setFiat(fiat)
          }}
        />
      )}
    </div>
  )
}
