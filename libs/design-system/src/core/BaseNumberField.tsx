import CurrencyInput from 'react-currency-input-field'
import { textFieldStyles } from './TextField'
import { Text } from './Text'
import { cx } from 'class-variance-authority'
import { VariantProps } from '../types'
import { useEffect, useState } from 'react'

type Props = VariantProps<typeof textFieldStyles> &
  Omit<React.ComponentProps<typeof CurrencyInput>, 'size' | 'className'> & {
    units?: string
  }

export function BaseNumberField({
  units,
  variant,
  size = 'small',
  state,
  noSpin,
  focus,
  cursor,
  className,
  decimalsLimit,
  onValueChange,
  ...props
}: Props) {
  // Locale is set in useEffect so that this component is SSR-safe.
  // navigator is not defined on the server.
  const [locale, setLocale] = useState<string>()
  useEffect(() => {
    setLocale(navigator.language)
    // Below code allows for dynamically changing language without refresh.
    // Seems like it can cause NaN in the CurrencyInput so disabled for now.
    // const onLanguageChange = () => {
    //   setLocale(navigator.language)
    // }
    // setLocale(navigator.language)
    // window.addEventListener('languagechange', onLanguageChange)
    // return () => {
    //   window.removeEventListener('languagechange', onLanguageChange)
    // }
  }, [])
  return (
    <div className="relative">
      <CurrencyInput
        {...props}
        decimalsLimit={decimalsLimit}
        // For some reason decimalsLimit=0 is ignored and defaults to 2.
        // Adding allowDecimals=false fixes that issue.
        intlConfig={
          // locale: navigator.language,
          locale
            ? {
                locale,
              }
            : undefined
        }
        allowDecimals={!!decimalsLimit}
        autoComplete="off"
        spellCheck={false}
        onValueChange={onValueChange}
        transformRawValue={(value) => {
          if (value.length > 0) {
            if (value[0] === '.') {
              return '0.' + value.slice(1)
            }
            if (value[0] === ',') {
              return '0,' + value.slice(1)
            }
          }

          return value
        }}
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
