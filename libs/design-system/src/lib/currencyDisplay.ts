import BigNumber from 'bignumber.js'
import {
  CurrencyDisplayPreference,
  CurrencyOption,
} from '@siafoundation/react-core'
import { humanSiacoin } from '@siafoundation/units'
import { Text } from '../core/Text'

type Color = React.ComponentProps<typeof Text>['color']

export type CurrencyDisplayProps = {
  value: string
  tooltip: string
  color: Color
}

/**
 * Get the value, tooltip, and color for rendering currency in the
 * user's preferred display currency.
 */
export function getCurrencyDisplayPropsPreferred({
  sc,
  currencyDisplay,
  exchange,
  tooltip = '',
  variant = 'value',
  fixed,
  fixedTip = 20,
  extendedSuffix,
  color: customColor,
  dynamicUnits = true,
  hastingUnits = true,
}: {
  sc: BigNumber
  currencyDisplay: CurrencyDisplayPreference
  exchange?: { currency: CurrencyOption; rate: BigNumber }
  tooltip?: string
  variant?: 'change' | 'value'
  fixed?: number
  fixedTip?: number
  extendedSuffix?: string
  color?: Color
  dynamicUnits?: boolean
  hastingUnits?: boolean
}): CurrencyDisplayProps {
  if (
    (currencyDisplay === 'fiat' || currencyDisplay === 'bothPreferFiat') &&
    exchange
  ) {
    const preference = getCurrencyDisplayPropsFiat({
      sc,
      variant,
      exchange,
      tooltip,
      fixed,
      fixedTip,
      extendedSuffix,
      color: customColor,
    })
    if (preference) {
      return preference
    }
  }
  return getCurrencyDisplayPropsSc({
    sc,
    variant,
    tooltip,
    fixed,
    extendedSuffix,
    color: customColor,
    dynamicUnits,
    hastingUnits,
  })
}

/**
 * Get the value, tooltip, and color for rendering fiat value.
 */
export function getCurrencyDisplayPropsFiat({
  sc,
  exchange,
  tooltip = '',
  variant = 'value',
  fixed,
  fixedTip = 20,
  extendedSuffix,
  color: customColor,
}: {
  sc: BigNumber // hastings
  variant?: 'change' | 'value'
  tooltip?: string
  fixed?: number
  fixedTip?: number
  extendedSuffix?: string
  exchange?: { currency: CurrencyOption; rate: BigNumber }
  color?: Color
}): CurrencyDisplayProps | null {
  if (!exchange) {
    return null
  }
  const { sign, color } = getSignAndColor(sc, variant, customColor)

  const fiat = exchange.rate.times(sc).div(1e24)

  const digits = fixed !== undefined ? fixed : exchange.currency.fixed

  const textValue = `${variant === 'change' ? sign : ''}${exchange.currency.prefix}${formatBigNumberLocale(
    fiat.absoluteValue(),
    digits,
  )}${extendedSuffix ? extendedSuffix : ''}`

  const textTooltip =
    (tooltip ? `${tooltip} ` : '') +
    `${variant === 'change' ? sign : ''}${exchange.currency.prefix}${formatBigNumberLocale(
      fiat.absoluteValue(),
      fixedTip,
    )}${extendedSuffix ? extendedSuffix : ''}`

  return {
    value: textValue,
    tooltip: textTooltip,
    color,
  }
}

/**
 * Get the value, tooltip, and color for rendering siacoin value.
 */
export function getCurrencyDisplayPropsSc({
  sc,
  tooltip = '',
  variant = 'value',
  color: customColor,
  fixed = 0,
  fixedTip = 16,
  extendedSuffix,
  dynamicUnits = true,
  hastingUnits = true,
}: {
  sc: BigNumber // hastings
  variant?: 'change' | 'value'
  tooltip?: string
  fixed?: number
  fixedTip?: number
  extendedSuffix?: string
  color?: Color
  dynamicUnits?: boolean
  hastingUnits?: boolean
}): CurrencyDisplayProps {
  const { sign, color } = getSignAndColor(sc, variant, customColor)

  const valueText = `${
    variant === 'change'
      ? `${sign}${humanSiacoin(sc.absoluteValue(), {
          fixed,
          dynamicUnits,
        })}`
      : humanSiacoin(sc, { fixed, dynamicUnits, hastingUnits })
  }${extendedSuffix ? extendedSuffix : ''}`

  const tooltipText =
    (tooltip ? `${tooltip} ` : '') +
    humanSiacoin(sc, {
      fixed: fixedTip,
      dynamicUnits: false,
    })

  return {
    value: valueText,
    tooltip: tooltipText,
    color,
  }
}

export function getSignAndColor(
  value: BigNumber | number,
  variant: 'change' | 'value',
  customColor?: Color,
): { sign: string; color: Color } {
  if (typeof value === 'number') {
    const sign = value > 0 ? '+' : value < 0 ? '-' : ''
    const color =
      customColor ||
      (variant === 'change'
        ? value > 0
          ? 'green'
          : value < 0
            ? 'red'
            : 'subtle'
        : 'contrast')

    return { sign, color }
  }
  const sign = value.isGreaterThan(0) ? '+' : value.isLessThan(0) ? '-' : ''
  const color =
    customColor ||
    (variant === 'change'
      ? value.isGreaterThan(0)
        ? 'green'
        : value.isLessThan(0)
          ? 'red'
          : 'subtle'
      : 'contrast')

  return { sign, color }
}

function formatBigNumberLocale(bigNumber: BigNumber, fixed: number): string {
  // Convert BigNumber to a string and split into integer and decimal parts
  const [integerPart, decimalPart] = bigNumber.toFixed(fixed).split('.')

  // Format the integer part using the locale
  const formattedIntegerPart = new Intl.NumberFormat().format(
    parseInt(integerPart),
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
