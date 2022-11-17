import CurrencyInput from 'react-currency-input-field'
import { textFieldStyles } from './TextField'
import { Text } from './Text'
import { cx } from 'class-variance-authority'
import { VariantProps } from '../types'

type Props = VariantProps<typeof textFieldStyles> &
  Omit<React.ComponentProps<typeof CurrencyInput>, 'size'> & {
    units?: string
  }

export function NumberField({
  units,
  variant,
  size,
  state,
  noSpin,
  cursor,
  className,
  ...props
}: Props) {
  return (
    <div className="relative">
      <CurrencyInput
        {...props}
        autoComplete="off"
        spellCheck={false}
        className={cx(
          textFieldStyles({
            variant,
            size,
            state,
            noSpin,
            cursor,
            className,
          }),
          units ? 'pr-12' : ''
        )}
      />
      {units && (
        <div
          className={cx(
            'flex items-center absolute top-0 h-full',
            size === 'small' ? 'r-2' : 'r-3'
          )}
        >
          <Text size={size === 'small' ? '12' : '14'} weight="semibold">
            {units}
          </Text>
        </div>
      )}
    </div>
  )
}
