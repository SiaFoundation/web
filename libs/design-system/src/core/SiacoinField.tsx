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
  showFiat?: boolean
  changed?: boolean
}

const zero = new BigNumber(0)

export function SiacoinField({
  sc: externalSc,
  placeholder = new BigNumber(100),
  decimalsLimitFiat = 6,
  decimalsLimitSc = 6,
  onChange,
  size = 'medium',
  showFiat = true,
  changed,
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
  const [sc, setSc] = useState<string>('0')
  const [fiat, setFiat] = useState<string>('0')

  const updateExternalSc = useCallback(
    (sc: string) => {
      if (onChange) {
        onChange(new BigNumber(sc))
      }
    },
    [onChange]
  )

  const getFiat = useCallback(
    (fiat: BigNumber) => {
      const formattedFiat =
        fiat.decimalPlaces() > decimalsLimitFiat
          ? fiat.toFixed(decimalsLimitFiat)
          : fiat.toString()
      return formattedFiat
    },
    [decimalsLimitFiat]
  )

  const getSc = useCallback(
    (sc: BigNumber) => {
      const formattedSc =
        sc.decimalPlaces() > decimalsLimitSc
          ? sc.toFixed(decimalsLimitSc)
          : sc.toString()
      return formattedSc
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

  useEffect(() => {
    if (!externalSc.isEqualTo(sc)) {
      const esc = getSc(externalSc)
      setActive(undefined)
      setSc(esc)
      syncFiatToSc(esc)
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

  const onFiatBlur = useCallback(() => {
    const sc = syncScToFiat(fiat)
    updateExternalSc(sc)
  }, [fiat, syncScToFiat, updateExternalSc])

  return (
    <div
      className={cx(
        'flex flex-col bg-white dark:bg-graydark-50',
        'focus-within:ring ring-blue-500 dark:ring-blue-200',
        'border',
        changed
          ? 'border-green-500 dark:border-green-400'
          : 'border-gray-200 dark:border-graydark-200',
        'rounded'
      )}
    >
      <NumberField
        {...props}
        size={size}
        variant="ghost"
        focus="none"
        placeholder={placeholder.toFixed(decimalsLimitSc)}
        units="SC"
        value={sc}
        decimalsLimit={decimalsLimitSc}
        onBlur={onScBlur}
        onFocus={() => setActive('sc')}
        onValueChange={(value) => setSc(value || '')}
      />
      {showFiat && settings.siaCentral && (
        <NumberField
          {...props}
          size={size}
          variant="ghost"
          focus="none"
          value={fiat}
          units={settings.currency.label}
          decimalsLimit={decimalsLimitFiat}
          placeholder={`${settings.currency.prefix}${
            rate ? rate.times(placeholder).toFixed(decimalsLimitFiat) : '0.42'
          }`}
          prefix={settings.currency.prefix}
          onFocus={() => setActive('fiat')}
          onBlur={onFiatBlur}
          onValueChange={(value) => setFiat(value || '')}
        />
      )}
    </div>
  )
}
