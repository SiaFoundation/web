import BigNumber from 'bignumber.js'
import { entries } from 'lodash'
import React, { MouseEvent, useCallback } from 'react'
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
  type: 'number' | 'siacoin' | 'text' | 'password' | 'boolean' | 'select'
  title: string
  actions?: React.ReactNode
  category?: Categories
  description?: React.ReactNode
  units?: string
  readOnly?: boolean
  onClick?: <T>(e: MouseEvent<T>) => void
  placeholder?: string
  suggestionTip?: React.ReactNode
  suggestion?: BigNumber | string | boolean
  average?: BigNumber | string | boolean
  averageTip?: React.ReactNode
  after?: React.FC<{
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
  } = form.register(name, field.validation)
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
      triggerErrorToast(
        entries(errors)
          .map(([key, e]) => `${fields[key].title || key}: ${e?.message}`)
          .join(', ')
      )
    },
    [fields]
  )
}
