import { Flex } from './Flex'
import { NumberField } from './NumberField'
import {
  useSettings,
  useSiaCentralMarketExchangeRate,
} from '@siafoundation/react-core'
import { useCallback, useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'

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
  size = 2,
  ...props
}: Props) {
  const { settings } = useSettings()
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

  const size2 = String(size) === '2'

  return (
    <Flex
      direction="column"
      gap={size2 ? '1' : undefined}
      css={{
        backgroundColor: '$loContrast',
        boxShadow: '$colors$border, $colors$shadow',
        borderRadius: '$1',
        padding: size2 ? '$1 0' : '$0-5 0',
        '@hover': {
          '&:hover': {
            boxShadow: '$colors$borderInputHover, $colors$shadow',
          },
        },

        '&:focus-within': {
          boxShadow:
            '$colors$borderFocus, $colors$borderInputActive, $colors$shadowActive',
        },
      }}
    >
      <NumberField
        {...props}
        size={size}
        variant="totalGhost"
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
        css={{ height: '$3' }}
      />
      {settings.siaCentral && (
        <NumberField
          {...props}
          size={size}
          variant="totalGhost"
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
          css={{ height: '$3' }}
        />
      )}
    </Flex>
  )
}
