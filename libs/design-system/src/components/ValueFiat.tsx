'use client'

import { Text } from '../core/Text'
import { Tooltip } from '../core/Tooltip'
import BigNumber from 'bignumber.js'
import { useActiveExchangeRate } from '@siafoundation/react-core'

type Props = {
  size?: React.ComponentProps<typeof Text>['size']
  scaleSize?: React.ComponentProps<typeof Text>['scaleSize']
  sc: BigNumber // hastings
  color?: React.ComponentProps<typeof Text>['color']
  variant?: 'change' | 'value'
  tooltip?: string
  fixed?: number
  font?: React.ComponentProps<typeof Text>['font']
  fixedTip?: number
  dynamicUnits?: boolean
  hastingUnits?: boolean
  extendedSuffix?: string
  showTooltip?: boolean
  tipSide?: React.ComponentProps<typeof Tooltip>['side']
}

export function ValueFiat({
  sc,
  size,
  scaleSize,
  color: customColor,
  tooltip = '',
  variant = 'change',
  fixed,
  font = 'mono',
  fixedTip = 20,
  showTooltip = true,
  tipSide,
  extendedSuffix,
}: Props) {
  const { rate, currency } = useActiveExchangeRate()
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

  if (!rate || !currency) {
    return null
  }
  const fiat = rate.times(sc).div(1e24)

  const digits = fixed !== undefined ? fixed : currency.fixed

  const el = (
    <Text
      size={size}
      scaleSize={scaleSize}
      weight="medium"
      font={font}
      ellipsis
      color={color}
    >
      {`${sign}${currency.prefix}${formatBigNumberLocale(
        fiat.absoluteValue(),
        digits
      )}${extendedSuffix ? extendedSuffix : ''}`}
    </Text>
  )

  if (showTooltip) {
    return (
      <Tooltip
        side={tipSide}
        content={
          (tooltip ? `${tooltip} ` : '') +
          `${sign}${currency.prefix}${formatBigNumberLocale(
            fiat.absoluteValue(),
            fixedTip
          )}${extendedSuffix ? extendedSuffix : ''}`
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
    parseInt(integerPart)
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
