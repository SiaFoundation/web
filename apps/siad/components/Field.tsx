import { Flex, TextField, Label, Text } from '@siafoundation/design-system'

type FormFieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any
  title?: string
  name: string
  placeholder: string
  autoComplete?: string
  spellCheck?: boolean
  type?: string
  size?: React.ComponentProps<typeof TextField>['size']
}

export function FormField({
  formik,
  title,
  name,
  placeholder,
  autoComplete = 'off',
  spellCheck = false,
  type,
  size = '2',
}: FormFieldProps) {
  return (
    <FieldGroup formik={formik} title={title} name={name}>
      <TextField
        id={name}
        name={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        spellCheck={spellCheck}
        type={type}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values[name]}
        size={size}
      />
    </FieldGroup>
  )
}

type FieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any
  name: string
  placeholder: string
  autoComplete?: string
  spellCheck?: boolean
  type?: string
  size?: React.ComponentProps<typeof TextField>['size']
}

export function Field({
  formik,
  name,
  placeholder,
  autoComplete = 'off',
  spellCheck = false,
  type,
  size = '2',
}: FieldProps) {
  return (
    <TextField
      id={name}
      name={name}
      autoComplete={autoComplete}
      placeholder={placeholder}
      readOnly={formik.isSubmitting}
      type={type}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      value={formik.values[name]}
      size={size}
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
