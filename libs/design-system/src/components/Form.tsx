import { Button } from '../core/Button'
import { TextField, textFieldStyles } from '../core/TextField'
import { Label } from '../core/Label'
import { Text } from '../core/Text'
import { NumberField } from '../core/NumberField'
import { SiacoinField } from '../core/SiacoinField'
import BigNumber from 'bignumber.js'
import { VariantProps } from '../types'

type FormFieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any
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
  showFiat?: boolean
  disableGroupSeparators?: boolean
  type?: string
  variants?: VariantProps<typeof textFieldStyles>
}

export function FormField({
  formik,
  title,
  name,
  placeholder,
  disabled,
  readOnly,
  autoComplete = 'off',
  spellCheck = false,
  tabIndex,
  allowDecimals = false,
  decimalsLimitFiat = 3,
  decimalsLimitSc = 3,
  disableGroupSeparators = false,
  showFiat = true,
  units,
  type,
  variants,
}: FormFieldProps) {
  return (
    <FieldGroup formik={formik} title={title} name={name}>
      {type === 'number' ? (
        <FormNumberField
          formik={formik}
          name={name}
          units={units}
          disabled={disabled}
          readOnly={readOnly}
          tabIndex={tabIndex}
          allowDecimals={allowDecimals}
          disableGroupSeparators={disableGroupSeparators}
          placeholder={placeholder}
          variants={variants}
        />
      ) : type === 'siacoin' ? (
        <FormSiacoinField
          formik={formik}
          name={name}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          tabIndex={tabIndex}
          showFiat={showFiat}
          decimalsLimitFiat={decimalsLimitFiat}
          decimalsLimitSc={decimalsLimitSc}
          variants={variants}
        />
      ) : (
        <FormTextField
          formik={formik}
          name={name}
          autoComplete={autoComplete}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          tabIndex={tabIndex}
          spellCheck={spellCheck}
          type={type}
          variants={variants}
        />
      )}
    </FieldGroup>
  )
}

type FormTextFieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any
  name: string
  placeholder: string
  autoComplete?: string
  disabled?: boolean
  readOnly?: boolean
  tabIndex?: number
  spellCheck?: boolean
  type?: string
  variants?: VariantProps<typeof textFieldStyles>
}

export function FormTextField({
  formik,
  name,
  placeholder,
  autoComplete = 'off',
  disabled,
  readOnly,
  tabIndex,
  spellCheck = false,
  type,
  variants,
}: FormTextFieldProps) {
  return (
    <TextField
      id={name}
      name={name}
      autoComplete={autoComplete}
      disabled={disabled}
      spellCheck={spellCheck}
      placeholder={placeholder}
      tabIndex={tabIndex}
      readOnly={readOnly || formik.isSubmitting}
      type={type}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      value={formik.values[name] || ''}
      {...variants}
    />
  )
}

type FormNumberFieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any
  name: string
  units?: string
  disabled?: boolean
  readOnly?: boolean
  tabIndex?: number
  placeholder: string
  allowDecimals?: boolean
  disableGroupSeparators?: boolean
  variants?: VariantProps<typeof textFieldStyles>
}

export function FormNumberField({
  formik,
  name,
  units,
  disabled,
  readOnly,
  tabIndex,
  placeholder,
  allowDecimals = false,
  disableGroupSeparators = false,
  variants,
}: FormNumberFieldProps) {
  return (
    <NumberField
      id={name}
      units={units}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      allowDecimals={allowDecimals}
      disableGroupSeparators={disableGroupSeparators}
      readOnly={readOnly || formik.isSubmitting}
      tabIndex={tabIndex}
      onBlur={formik.handleBlur}
      onValueChange={(value, name) => formik.setFieldValue(name, value)}
      value={formik.values[name]}
      {...variants}
    />
  )
}

type FormSiacoinFieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any
  name: string
  disabled?: boolean
  readOnly?: boolean
  showFiat?: boolean
  tabIndex?: number
  placeholder: string
  decimalsLimitFiat?: number
  decimalsLimitSc?: number
  variants?: VariantProps<typeof textFieldStyles>
}

export function FormSiacoinField({
  formik,
  name,
  disabled,
  readOnly,
  tabIndex,
  placeholder,
  showFiat,
  decimalsLimitFiat = 3,
  decimalsLimitSc = 3,
  variants,
}: FormSiacoinFieldProps) {
  return (
    <SiacoinField
      id={name}
      name={name}
      disabled={disabled}
      showFiat={showFiat}
      decimalsLimitFiat={decimalsLimitFiat}
      decimalsLimitSc={decimalsLimitSc}
      readOnly={readOnly || formik.isSubmitting}
      tabIndex={tabIndex}
      onBlur={formik.handleBlur}
      sc={new BigNumber(formik.values[name])}
      placeholder={new BigNumber(placeholder)}
      onChange={(val) => formik.setFieldValue(name, val?.toString())}
      {...variants}
    />
  )
}

type FieldGroupProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any
  title?: string
  name: string
  children: React.ReactNode
  withStatusError?: boolean
}

export function FieldGroup({
  formik,
  title,
  name,
  withStatusError = false,
  children,
}: FieldGroupProps) {
  const showError =
    (formik.errors[name] && formik.touched[name]) ||
    (withStatusError && formik.status?.error)
  const errorMessage =
    formik.errors[name] || (withStatusError && formik.status?.error)
  return (
    <div className="flex flex-col gap-1">
      {(title || showError) && (
        <div className="flex justify-between items-center gap-4">
          {title && <Label htmlFor={name}>{title}</Label>}
          {showError && (
            <Text size="14" color="red">
              {errorMessage}
            </Text>
          )}
        </div>
      )}
      {children}
    </div>
  )
}

type FormSubmitProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any
  size?: React.ComponentProps<typeof Button>['size']
  variant?: React.ComponentProps<typeof Button>['variant']
  children: React.ReactNode
  withStatusError?: boolean
}

export function FormSubmitButton({
  formik,
  size = 'medium',
  variant = 'accent',
  withStatusError = true,
  children,
}: FormSubmitProps) {
  return (
    <>
      {withStatusError && formik.status?.error && (
        <Text color="red">{formik.status.error}</Text>
      )}
      <Button
        size={size}
        disabled={formik.isSubmitting || !formik.isValid}
        variant={variant}
        state={formik.isSubmitting ? 'waiting' : undefined}
        type="submit"
      >
        {children}
      </Button>
    </>
  )
}
