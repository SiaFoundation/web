import { textFieldStyles } from './TextField'
import { Text } from './Text'
import { cx } from 'class-variance-authority'
import { VariantProps } from '../types'
import { NumericFormat } from 'react-number-format'
import { useEffect, useMemo, useState } from 'react'

type Props = VariantProps<typeof textFieldStyles> &
  Omit<React.ComponentProps<typeof NumericFormat>, 'size' | 'className'> & {
    units?: string
  }

export function BaseNumberField({
  units,
  variant,
  size = 'small',
  state,
  noSpin,
  thousandsGroupStyle: customThousandsGroupStyle,
  focus,
  cursor,
  className,
  onValueChange,
  ...props
}: Props) {
  // Locale is set in useEffect so that this component is SSR-safe.
  // navigator is not defined on the server.
  const [locale, setLocale] = useState<string>()
  useEffect(() => {
    setLocale(navigator.language)
    // allows for dynamically changing language without refresh
    const onLanguageChange = () => {
      setLocale(navigator.language)
    }
    setLocale(navigator.language)
    window.addEventListener('languagechange', onLanguageChange)
    return () => {
      window.removeEventListener('languagechange', onLanguageChange)
    }
  }, [])

  const decimalSeparator = useMemo(() => getDecimalSeparator(locale), [locale])
  const { groupingSeparator, groupingStyle } = useMemo(
    () => getGroupingInfo(locale, customThousandsGroupStyle),
    [locale, customThousandsGroupStyle]
  )

  return (
    <div className="relative">
      <NumericFormat
        {...props}
        autoComplete="off"
        spellCheck={false}
        onValueChange={onValueChange}
        lang={locale}
        decimalSeparator={decimalSeparator}
        thousandsGroupStyle={groupingStyle}
        thousandSeparator={groupingSeparator}
        className={cx(
          textFieldStyles({
            variant,
            size,
            state,
            focus,
            noSpin,
            cursor,
            className,
          }),
          units ? 'pr-9' : ''
        )}
      />
      {units && (
        <div
          className={cx(
            'flex items-center absolute top-0 h-full',
            size === 'small' ? 'right-2' : '',
            size === 'medium' ? 'right-3' : '',
            size === 'large' ? 'right-3' : ''
          )}
        >
          <Text
            size={size === 'small' ? '12' : '12'}
            weight="medium"
            color="subtle"
          >
            {units}
          </Text>
        </div>
      )}
    </div>
  )
}

function getGroupingStyle(groups: number[]): 'thousand' | 'lakh' | 'wan' {
  // Standard thousand grouping
  if (groups.every((size) => size === 3)) {
    return 'thousand'
  }

  // Indian lakh/crore grouping
  if (
    groups.length >= 2 &&
    groups.slice(1).every((size) => size === 2) &&
    groups[0] === 3
  ) {
    return 'lakh'
  }

  // Chinese/Japanese wan grouping
  if (groups.every((size) => size === 4)) {
    return 'wan'
  }

  return 'thousand'
}

function getGroupingInfo(
  locale: string | undefined,
  customThousandsGroupStyle?: 'none' | 'thousand' | 'lakh' | 'wan'
): {
  groupingSeparator: string
  groupingStyle: 'thousand' | 'lakh' | 'wan' | 'none'
} {
  if (customThousandsGroupStyle === 'none') {
    return { groupingSeparator: '', groupingStyle: 'none' }
  }

  const largeNumber = 123456789
  const formattedNumber = new Intl.NumberFormat(locale).format(largeNumber)

  // Find the grouping separator
  const groupingSeparator = formattedNumber.replace(/[0-9]/g, '')[0] // First non-numeric character

  // Determine the grouping style
  const groups = formattedNumber
    .split(groupingSeparator)
    .map((group) => group.length)

  if (customThousandsGroupStyle) {
    return {
      groupingSeparator,
      groupingStyle: customThousandsGroupStyle,
    }
  }

  const groupingStyle = getGroupingStyle(groups)

  return { groupingSeparator, groupingStyle }
}

function getDecimalSeparator(locale?: string) {
  const numberWithDecimal = 1.1
  const formattedNumber = new Intl.NumberFormat(locale).format(
    numberWithDecimal
  )
  const decimalSeparator = formattedNumber[1] // Assuming '.' is at position 1
  return decimalSeparator
}
