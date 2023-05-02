import CurrencyInput from 'react-currency-input-field'
import { textFieldStyles } from './TextField'
import { Text } from './Text'
import { cx } from 'class-variance-authority'
import { VariantProps } from '../types'

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
  ...props
}: Props) {
  return (
    <div className="relative">
      <CurrencyInput
        {...props}
        decimalsLimit={decimalsLimit}
        // For some reason decimalsLimit=0 is ignored and defaults to 2.
        // Adding allowDecimals=false fixes that issue.
        allowDecimals={!!decimalsLimit}
        autoComplete="off"
        spellCheck={false}
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
