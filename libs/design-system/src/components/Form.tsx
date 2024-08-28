import { Button } from '../core/Button'
import { Label } from '../core/Label'
import { Text } from '../core/Text'
import { cx } from 'class-variance-authority'
import { LoadingDots } from './LoadingDots'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

type FieldLabelProps<Values extends FieldValues> = {
  title?: string
  actions?: React.ReactNode
  name: Path<Values>
}

export function FieldLabel<Values extends FieldValues>({
  title,
  actions,
  name,
}: FieldLabelProps<Values>) {
  return (
    <div className="flex gap-0.5 items-center">
      {title ? (
        <Label htmlFor={name} noWrap>
          {title}
        </Label>
      ) : null}
      {actions}
    </div>
  )
}

type FieldErrorProps<Values extends FieldValues> = {
  form: UseFormReturn<Values>
  name: 'root' | Path<Values>
}

export function FieldError<Values extends FieldValues>({
  form,
  name,
}: FieldErrorProps<Values>) {
  const showError = form.formState.errors[name] // && form.formState.touchedFields[name]
  const errorMessage = form.formState.errors[name]?.message as string

  return showError ? (
    <Text size="14" color="red">
      {errorMessage}
    </Text>
  ) : null
}

type FieldLabelAndErrorProps<Values extends FieldValues> = {
  form: UseFormReturn<Values>
  title?: string
  actions?: React.ReactNode
  name: Path<Values>
  wrap?: boolean
  className?: string
}

export function FieldLabelAndError<Values extends FieldValues>({
  form,
  title,
  actions,
  name,
  className,
  wrap,
}: FieldLabelAndErrorProps<Values>) {
  const showError = form.formState.errors[name] // && form.formState.touchedFields[name]

  return title || showError ? (
    <div
      className={cx(
        'flex justify-between items-center gap-x-4 overflow-hidden',
        wrap ? 'flex-wrap' : '',
        className
      )}
    >
      <FieldLabel name={name} title={title} actions={actions} />
      <FieldError form={form} name={name} />
    </div>
  ) : null
}

type FieldGroupProps<Values extends FieldValues> =
  FieldLabelAndErrorProps<Values> & {
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

type FormSubmitProps = {
  // The button is agnostic to the form's FieldValues.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>
  size?: React.ComponentProps<typeof Button>['size']
  variant?: React.ComponentProps<typeof Button>['variant']
  children: React.ReactNode
  className?: string
  withStatusError?: boolean
}

export function FormSubmitButton({
  form,
  size = 'medium',
  variant = 'accent',
  className,
  children,
}: FormSubmitProps) {
  return (
    <Button
      className={className}
      size={size}
      variant={variant}
      state={form.formState.isSubmitting ? 'waiting' : undefined}
      type="submit"
    >
      {form.formState.isSubmitting ? <LoadingDots /> : children}
    </Button>
  )
}
