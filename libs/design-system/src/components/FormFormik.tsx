import { Button } from '../core/Button'
import { TextField, textFieldStyles } from '../core/TextField'
import { Label } from '../core/Label'
import { Text } from '../core/Text'
import { NumberField } from '../core/NumberField'
import { SiacoinField } from '../core/SiacoinField'
import BigNumber from 'bignumber.js'
import { VariantProps } from '../types'
import { cx } from 'class-variance-authority'
import { LoadingDots } from './LoadingDots'

type FormFieldFormikProps = {
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
  decimalsLimit?: number
  showFiat?: boolean
  disableGroupSeparators?: boolean
  type?: string
  variants?: VariantProps<typeof textFieldStyles>
}

export function FormFieldFormik({
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
  decimalsLimit = 2,
  disableGroupSeparators = false,
  showFiat = true,
  units,
  type,
  variants,
}: FormFieldFormikProps) {
  return (
    <FieldGroupFormik formik={formik} title={title} name={name}>
      {type === 'number' ? (
        <FormNumberFieldFormik
          formik={formik}
          name={name}
          units={units}
          disabled={disabled}
          readOnly={readOnly}
          tabIndex={tabIndex}
          decimalsLimit={decimalsLimit}
          allowDecimals={allowDecimals}
          disableGroupSeparators={disableGroupSeparators}
          placeholder={placeholder}
          variants={variants}
        />
      ) : type === 'siacoin' ? (
        <FormSiacoinFieldFormik
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
        <FormTextFieldFormik
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
    </FieldGroupFormik>
  )
}

type FormTextFieldFormikProps = {
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

export function FormTextFieldFormik({
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
}: FormTextFieldFormikProps) {
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

type FormNumberFieldFormikProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any
  name: string
  units?: string
  disabled?: boolean
  readOnly?: boolean
  tabIndex?: number
  placeholder: string
  allowDecimals?: boolean
  decimalsLimit?: number
  disableGroupSeparators?: boolean
  variants?: VariantProps<typeof textFieldStyles>
}

function FormNumberFieldFormik({
  formik,
  name,
  units,
  disabled,
  readOnly,
  tabIndex,
  placeholder,
  decimalsLimit,
  allowDecimals = false,
  disableGroupSeparators = false,
  variants,
}: FormNumberFieldFormikProps) {
  return (
    <NumberField
      id={name}
      units={units}
      name={name}
      placeholder={new BigNumber(placeholder)}
      disabled={disabled}
      allowDecimals={allowDecimals}
      decimalsLimit={decimalsLimit}
      disableGroupSeparators={disableGroupSeparators}
      readOnly={readOnly || formik.isSubmitting}
      tabIndex={tabIndex}
      onBlur={formik.handleBlur}
      onChange={(value) => formik.setFieldValue(name, value)}
      value={formik.values[name]}
      {...variants}
    />
  )
}

type FormSiacoinFieldFormikProps = {
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

function FormSiacoinFieldFormik({
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
}: FormSiacoinFieldFormikProps) {
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
      onFocus={() => formik.setFieldTouched(name)}
      sc={new BigNumber(formik.values[name])}
      placeholder={new BigNumber(placeholder)}
      onChange={(val) => formik.setFieldValue(name, val?.toString())}
      {...variants}
    />
  )
}

type FieldErrorFormikProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any
  title?: string
  name: string
  withStatusError?: boolean
  className?: string
}

export function FieldLabelAndErrorFormik({
  formik,
  title,
  name,
  withStatusError = false,
  className,
}: FieldErrorFormikProps) {
  const showError =
    (formik.errors[name] && formik.touched[name]) ||
    (withStatusError && formik.status?.error)
  const errorMessage =
    formik.errors[name] || (withStatusError && formik.status?.error)
  if (formik.errors[name]) {
    console.log(formik.errors[name], formik.touched[name])
  }
  return (
    (title || showError) && (
      <div className={cx('flex justify-between items-center gap-4', className)}>
        {title ? <Label htmlFor={name}>{title}</Label> : <div />}
        {showError && (
          <Text size="14" color="red">
            {errorMessage}
          </Text>
        )}
      </div>
    )
  )
}

type FieldGroupFormikProps = FieldErrorFormikProps & {
  children: React.ReactNode
}

export function FieldGroupFormik({
  children,
  ...props
}: FieldGroupFormikProps) {
  return (
    <div className="flex flex-col gap-1">
      <FieldLabelAndErrorFormik {...props} />
      {children}
    </div>
  )
}

type FormSubmitButtonFormikProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any
  size?: React.ComponentProps<typeof Button>['size']
  variant?: React.ComponentProps<typeof Button>['variant']
  children: React.ReactNode
  withStatusError?: boolean
}

export function FormSubmitButtonFormik({
  formik,
  size = 'medium',
  variant = 'accent',
  withStatusError = true,
  children,
}: FormSubmitButtonFormikProps) {
  return (
    <>
      {withStatusError && formik.status?.error && (
        <Text color="red">{formik.status.error}</Text>
      )}
      <Button
        size={size}
        variant={variant}
        state={formik.isSubmitting ? 'waiting' : undefined}
        type="submit"
      >
        {formik.isSubmitting ? <LoadingDots /> : children}
      </Button>
    </>
  )
}
