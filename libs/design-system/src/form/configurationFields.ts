import BigNumber from 'bignumber.js'
import { entries } from '@technically/lodash'
import React, { MouseEvent, useCallback, useMemo } from 'react'
import {
  FieldErrors,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  UseFormReturn,
} from 'react-hook-form'
import { triggerErrorToast } from '../lib/toast'

export type ConfigField<
  Values extends FieldValues,
  Categories extends string
> = {
  type:
    | 'number'
    | 'siacoin'
    | 'fiat'
    | 'text'
    | 'password'
    | 'boolean'
    | 'select'
    | 'custom'
  title: string
  actions?: React.ReactNode
  hidden?: boolean
  category?: Categories
  description?: React.ReactNode
  units?: string
  prefix?: string
  readOnly?: boolean
  onClick?: <T>(e: MouseEvent<T>) => void
  placeholder?: string
  suggestionTip?: React.ReactNode
  suggestion?: BigNumber | string | boolean
  average?: BigNumber | string | boolean
  averageTip?: React.ReactNode
  before?: React.FC<{
    name: Path<Values>
    form: UseFormReturn<Values>
    fields: ConfigFields<Values, Categories>
  }>
  after?: React.FC<{
    name: Path<Values>
    form: UseFormReturn<Values>
    fields: ConfigFields<Values, Categories>
  }>
  custom?: React.FC<{
    name: Path<Values>
    form: UseFormReturn<Values>
    fields: ConfigFields<Values, Categories>
  }>
  // number
  decimalsLimit?: number
  // sc
  decimalsLimitSc?: number
  decimalsLimitFiat?: number
  tipsDecimalsLimitSc?: number

  options?: { label: string; value: string }[]

  show?: (values: Values) => boolean

  validation: RegisterOptions<Values>
  trigger?: Path<Values>[]

  // other
  disableGroupSeparators?: boolean
  autoComplete?: string
}

export type ConfigFields<
  Values extends FieldValues,
  Categories extends string
> = Record<keyof Values, ConfigField<Values, Categories>>

export function useRegisterForm<
  Values extends FieldValues,
  Categories extends string
>({
  form,
  field,
  name,
}: {
  form: UseFormReturn<Values>
  field: ConfigField<Values, Categories>
  name: Path<Values>
}) {
  const value = form.watch(name)
  const error =
    form.formState.touchedFields[name] && !!form.formState.errors[name]

  const {
    ref,
    onChange: _onChange,
    onBlur,
  } = useMemo(
    () => form.register(name, field.validation),
    [form, name, field.validation]
  )

  const onChange = useCallback(
    (e: { target: unknown; type: unknown }) => {
      _onChange(e)
      field.trigger?.forEach((t) => form.trigger(t))
    },
    [_onChange, form, field]
  )
  const setValue = useCallback(
    (
      val: PathValue<Values, Path<Values>>,
      options?:
        | boolean
        | {
            shouldValidate: boolean
            shouldDirty: boolean
            shouldTouch: boolean
          }
    ) => {
      form.setValue(
        name,
        val,
        typeof options === 'boolean'
          ? options
            ? {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              }
            : undefined
          : options
      )
      field.trigger?.forEach((t) => form.trigger(t))
    },
    [name, form, field]
  )
  return {
    ref,
    name,
    value,
    error,
    onBlur,
    onChange,
    setValue,
  }
}

export function useOnInvalid<
  Values extends FieldValues,
  Categories extends string
>(fields: ConfigFields<Values, Categories>) {
  return useCallback(
    (errors: FieldErrors<Values>) => {
      triggerErrorToast({
        title: 'Error',
        body: entries(errors)
          .map(([key, e]) => `${fields[key].title || key}: ${e?.message}`)
          .join(', '),
      })
    },
    [fields]
  )
}

export type FieldProps<
  Values extends FieldValues,
  Categories extends string
> = {
  name: Path<Values>
  form: UseFormReturn<Values>
  fields: ConfigFields<Values, Categories>
}

export function shouldShowField<
  Values extends FieldValues,
  Categories extends string
>({ name, form, fields }: FieldProps<Values, Categories>) {
  const field = fields[name]
  return !field.hidden && (!field.show || field.show(form.getValues()))
}
