import {
  Flex,
  Button,
  TextField,
  Label,
  Text,
  NumberField,
  SiacoinField,
} from '../core'
import BigNumber from 'bignumber.js'

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
  type?: string
  size?: React.ComponentProps<typeof TextField>['size']
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
  units,
  type,
  size = 2,
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
          placeholder={placeholder}
          size={size}
        />
      ) : type === 'siacoin' ? (
        <FormSiacoinField
          formik={formik}
          name={name}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          tabIndex={tabIndex}
          size={size}
          decimalsLimitFiat={decimalsLimitFiat}
          decimalsLimitSc={decimalsLimitSc}
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
          size={size}
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
  size?: React.ComponentProps<typeof TextField>['size']
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
  size = 2,
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
      size={size}
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
  size?: React.ComponentProps<typeof TextField>['size']
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
  size = 2,
}: FormNumberFieldProps) {
  return (
    <NumberField
      id={name}
      units={units}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      allowDecimals={allowDecimals}
      readOnly={readOnly || formik.isSubmitting}
      tabIndex={tabIndex}
      onBlur={formik.handleBlur}
      onValueChange={(value, name) => formik.setFieldValue(name, value)}
      value={formik.values[name]}
      size={size}
    />
  )
}

type FormSiacoinFieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any
  name: string
  disabled?: boolean
  readOnly?: boolean
  tabIndex?: number
  placeholder: string
  decimalsLimitFiat?: number
  decimalsLimitSc?: number
  size?: React.ComponentProps<typeof TextField>['size']
}

export function FormSiacoinField({
  formik,
  name,
  disabled,
  readOnly,
  tabIndex,
  placeholder,
  decimalsLimitFiat = 3,
  decimalsLimitSc = 3,
  size = 2,
}: FormSiacoinFieldProps) {
  return (
    <SiacoinField
      id={name}
      name={name}
      disabled={disabled}
      decimalsLimitFiat={decimalsLimitFiat}
      decimalsLimitSc={decimalsLimitSc}
      readOnly={readOnly || formik.isSubmitting}
      tabIndex={tabIndex}
      onBlur={formik.handleBlur}
      size={size}
      sc={new BigNumber(formik.values[name])}
      placeholder={new BigNumber(placeholder)}
      onChange={(val) => formik.setFieldValue(name, val?.toString())}
    />
  )
}

type FieldGroupProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any
  title?: string
  name: string
  children: React.ReactNode
}

export function FieldGroup({ formik, title, name, children }: FieldGroupProps) {
  const showError = formik.errors[name] && formik.touched[name]
  return (
    <Flex direction="column" gap="1">
      {(title || showError) && (
        <Flex justify="between" gap="2">
          {title && (
            <Label htmlFor={name} css={{ color: '$gray9' }}>
              {title}
            </Label>
          )}
          {showError && (
            <Text css={{ color: '$red11' }}>{formik.errors[name]}</Text>
          )}
        </Flex>
      )}
      {children}
    </Flex>
  )
}

type FormSubmitProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any
  size?: React.ComponentProps<typeof Button>['size']
  children: React.ReactNode
}

export function FormSubmitButton({
  formik,
  size = 2,
  children,
}: FormSubmitProps) {
  return (
    <>
      {formik.status?.error && (
        <Text css={{ color: '$red11' }}>{formik.status.error}</Text>
      )}
      <Button
        size={size}
        disabled={formik.isSubmitting || !formik.isValid}
        variant="accent"
        state={formik.isSubmitting ? 'waiting' : undefined}
        type="submit"
      >
        {children}
      </Button>
    </>
  )
}
