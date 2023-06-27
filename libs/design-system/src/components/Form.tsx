import { Button } from '../core/Button'
import { Label } from '../core/Label'
import { Text } from '../core/Text'
import { cx } from 'class-variance-authority'
import { LoadingDots } from './LoadingDots'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

type FieldErrorProps<Values extends FieldValues> = {
  form: UseFormReturn<Values>
  title?: string
  actions?: React.ReactNode
  name: Path<Values>
  withStatusError?: boolean
  className?: string
}

export function FieldLabelAndError<Values extends FieldValues>({
  form,
  title,
  actions,
  name,
  className,
}: FieldErrorProps<Values>) {
  const showError = form.formState.errors[name] // && form.formState.touchedFields[name]
  const errorMessage = form.formState.errors[name]?.message as string

  return title || showError ? (
    <div className={cx('flex justify-between items-center gap-4', className)}>
      <div className="flex gap-0.5 items-center">
        {title ? <Label htmlFor={name}>{title}</Label> : null}
        {actions}
      </div>
      {showError && (
        <Text size="14" color="red">
          {errorMessage}
        </Text>
      )}
    </div>
  ) : null
}

type FieldGroupProps<Values extends FieldValues> = FieldErrorProps<Values> & {
  children: React.ReactNode
}

export function FieldGroup<Values extends FieldValues>({
  children,
  ...props
}: FieldGroupProps<Values>) {
  return (
    <div className="flex flex-col gap-1">
      <FieldLabelAndError {...props} />
      {children}
    </div>
  )
}

type FormSubmitProps<Values extends FieldValues> = {
  form: UseFormReturn<Values>
  size?: React.ComponentProps<typeof Button>['size']
  variant?: React.ComponentProps<typeof Button>['variant']
  children: React.ReactNode
  withStatusError?: boolean
}

export function FormSubmitButton<Values extends FieldValues>({
  form,
  size = 'medium',
  variant = 'accent',
  children,
}: FormSubmitProps<Values>) {
  return (
    <>
      {/* {withStatusError && formik.status?.error && (
        <Text color="red">{formik.status.error}</Text>
      )} */}
      <Button
        size={size}
        variant={variant}
        state={form.formState.isSubmitting ? 'waiting' : undefined}
        type="submit"
      >
        {form.formState.isSubmitting ? <LoadingDots /> : children}
      </Button>
    </>
  )
}
