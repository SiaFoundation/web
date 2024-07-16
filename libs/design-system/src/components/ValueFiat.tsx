'use client'

import { useAppSettings } from '@siafoundation/react-core'
import { useSiaCentralExchangeRates } from '@siafoundation/sia-central-react'
import BigNumber from 'bignumber.js'
import { Text } from '../core/Text'
import { Tooltip } from '../core/Tooltip'

type Props = {
  size?: React.ComponentProps<typeof Text>['size']
  scaleSize?: React.ComponentProps<typeof Text>['scaleSize']
  sc: BigNumber // hastings
  color?: React.ComponentProps<typeof Text>['color']
  variant?: 'change' | 'value'
  tooltip?: string
  fixed?: number
  fixedTip?: number
  dynamicUnits?: boolean
  hastingUnits?: boolean
  extendedSuffix?: string
  showTooltip?: boolean
}

export function ValueFiat({
  sc,
  size,
  scaleSize,
  color: customColor,
  tooltip = '',
  variant = 'change',
  fixed,
  fixedTip = 20,
  showTooltip = true,
}: Props) {
  const exchangeRates = useSiaCentralExchangeRates()
  const {
    settings: { currency },
  } = useAppSettings()
  const sign = sc.isZero()
    ? ''
    : sc.isGreaterThan(0) && variant === 'change'
      ? '+'
      : sc.isLessThan(0)
        ? '-'
        : ''
  const color =
    customColor ||
    (variant === 'change'
      ? sc.isGreaterThan(0)
        ? 'green'
        : sc.isLessThan(0)
          ? 'red'
          : 'subtle'
      : 'contrast')

  if (!exchangeRates.data) {
    return null
  }
  const fiat = new BigNumber(exchangeRates.data.rates.sc[currency.id] || 1)
    .times(sc)
    .div(1e24)

  const digits = fixed !== undefined ? fixed : currency.fixed

  const el = (
    <Text
      size={size}
      scaleSize={scaleSize}
      weight="medium"
      font="mono"
      ellipsis
      color={color}
    >
      {`${sign}${currency.prefix}${formatBigNumberLocale(
        fiat.absoluteValue(),
        digits,
      )}`}
    </Text>
  )

  if (showTooltip) {
    return (
      <Tooltip
        content={
          (tooltip ? `${tooltip} ` : '') +
          `${sign}${currency.prefix}${
            formatBigNumberLocale(fiat.absoluteValue(), fixedTip)
            // fixedTip
            //   ? fiat.absoluteValue().toFixed(fixedTip)
            //   : fiat.absoluteValue().toString()
          }`
        }
      >
        {el}
      </Tooltip>
    )
  }

  return el
}

function formatBigNumberLocale(bigNumber: BigNumber, fixed: number): string {
  // Convert BigNumber to a string and split into integer and decimal parts
  const [integerPart, decimalPart] = bigNumber.toFixed(fixed).split('.')

  // Format the integer part using the locale
  const formattedIntegerPart = new Intl.NumberFormat().format(
    Number.parseInt(integerPart!),
  )

  // Return the formatted number with the original decimal part
  return decimalPart
    ? `${formattedIntegerPart}${getDecimalSeparator()}${decimalPart}`
    : formattedIntegerPart
}

function getDecimalSeparator(): string {
  const numberWithDecimalSeparator = 1.1
  return Intl.NumberFormat().format(numberWithDecimalSeparator).charAt(1)
}
