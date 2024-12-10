import {
  FieldErrors,
  FieldValues,
  useForm,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'
import { Button } from '../core/Button'
import { Text } from '../core/Text'
import { TextField, textFieldStyles } from '../core/TextField'
import { NumberField } from '../core/NumberField'
import { SiacoinField } from '../core/SiacoinField'
import BigNumber from 'bignumber.js'
import { VariantProps } from '../types'
import { LoadingDots } from './LoadingDots'

type ReactHookFormFieldProps = {
  title?: string
  name: string
  placeholder: string
  disabled?: boolean
  readOnly?: boolean
  units?: string
  autoComplete?: string
  spellCheck?: boolean
  tabIndex?: number
  allowDecimals?: boolean
  decimalsLimitFiat?: number
  decimalsLimitSc?: number
  decimalsLimit?: number
  showFiat?: boolean
  disableGroupSeparators?: boolean
  type: 'number' | 'siacoin' | 'text'
  variants?: VariantProps<typeof textFieldStyles>

  registerFunc: ReturnType<ReturnType<typeof useForm>['register']>
  errors: FieldErrors<FieldValues>
  isSubmitting: boolean
  watch: UseFormWatch<FieldValues>
  setValue: UseFormSetValue<FieldValues>
}

export function ReactHookFormField({
  title,
  name,
  placeholder,
  disabled,
  readOnly,
  autoComplete,
  spellCheck,
  tabIndex,
  allowDecimals,
  decimalsLimitFiat,
  decimalsLimitSc,
  decimalsLimit,
  showFiat,
  disableGroupSeparators,
  type,
  units,
  variants,
  // The react-hook-form specific params.
  registerFunc,
  errors,
  isSubmitting,
  watch,
  setValue,
}: ReactHookFormFieldProps) {
  const commonProps = {
    id: name,
    name,
    placeholder: placeholder || '',
    disabled: disabled || false,
    readOnly: readOnly || isSubmitting || false,
    tabIndex: tabIndex ?? 0,
    ...variants,
  }

  const renderField = () => {
    switch (type) {
      case 'text':
        return (
          <TextField
            {...commonProps}
            autoComplete={autoComplete || 'off'}
            spellCheck={spellCheck || false}
            type="text"
            {...registerFunc}
          />
        )
      case 'number':
        return (
          <NumberField
            {...commonProps}
            value={new BigNumber(watch(name))}
            onChange={(value?: BigNumber) => {
              setValue(name, value)
            }}
            allowDecimals={allowDecimals || false}
            decimalsLimit={decimalsLimit || 2}
            disableGroupSeparators={disableGroupSeparators || false}
            units={units}
            placeholder={new BigNumber(placeholder || 0)}
          />
        )
      case 'siacoin':
        return (
          <SiacoinField
            {...commonProps}
            sc={watch(name)}
            onChange={(value?: BigNumber) => {
              setValue(name, value)
            }}
            showFiat={showFiat ?? true}
            decimalsLimitFiat={decimalsLimitFiat || 3}
            decimalsLimitSc={decimalsLimitSc || 3}
            placeholder={new BigNumber(placeholder || 0)}
          />
        )
      default:
        throw new Error('Invalid form field type')
    }
  }

  return (
    <div>
      {/* Label */}
      {title && (
        <label htmlFor={name}>
          <Text
            tag="p"
            weight="regular"
            scaleSize="14"
            color="verySubtle"
            className="leading-relaxed md:leading-relaxed"
          >
            {title}
          </Text>
        </label>
      )}
      {/* Field */}
      {renderField()}
      {/* Error */}
      {errors[name] && (
        <Text tag="span" weight="regular" scaleSize="12" color="red">
          {errors[name].message as string}
        </Text>
      )}
    </div>
  )
}

type ReactHookFormSubmitButtonProps = {
  size?: React.ComponentProps<typeof Button>['size']
  variant?: React.ComponentProps<typeof Button>['variant']
  children: React.ReactNode
  withStatusError?: boolean

  isSubmitting: boolean
  errors: FieldErrors<FieldValues>
}

export function ReactHookFormSubmitButton({
  size = 'medium',
  variant = 'accent',
  withStatusError = true,
  children,
  isSubmitting,
  errors,
}: ReactHookFormSubmitButtonProps) {
  return (
    <>
      {withStatusError && errors['formStatus'] && (
        <Text color="red">{errors['formStatus'].message as string}</Text>
      )}
      <Button
        size={size}
        variant={variant}
        state={isSubmitting ? 'waiting' : undefined}
        type="submit"
      >
        {isSubmitting ? <LoadingDots /> : children}
      </Button>
    </>
  )
}
