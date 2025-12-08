import BigNumber from 'bignumber.js'
import { entries } from '@technically/lodash'
import { MouseEvent, useCallback } from 'react'
import {
  DeepMap,
  DeepPartial,
  FieldErrors,
  FieldValues,
  Path,
  PathValue,
  ValidationRule,
  UseFormReturn,
  Message,
} from 'react-hook-form'
import { triggerErrorToast } from '../lib/toast'

type Validate<Values extends FieldValues> = (
  // Unable to figure out how to get ConfigFields to infer the type.
  // Making it any so the caller can specify the type.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  values: Values,
) => boolean | string

type ValidateMap<Values extends FieldValues> = Record<string, Validate<Values>>

export type ConfigField<
  Values extends FieldValues,
  Categories extends string,
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
  suggestionLabel?: string
  suggestionTip?: React.ReactNode
  suggestion?: BigNumber | string | boolean
  median?: BigNumber | string | boolean
  medianTip?: React.ReactNode
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
  showFiat?: boolean

  options?: { label: string; value: string }[]

  show?: (values: Values) => boolean

  validation: {
    required?: Message | ValidationRule<boolean>
    min?: ValidationRule<number | string>
    max?: ValidationRule<number | string>
    maxLength?: ValidationRule<number>
    minLength?: ValidationRule<number>
    validate?: ValidateMap<Values> | Validate<Values>
  }

  trigger?: Path<Values>[]

  // other
  disableGroupSeparators?: boolean
  autoComplete?: string
}

export type ConfigFields<
  Values extends FieldValues,
  Categories extends string,
> = Record<keyof Values, ConfigField<Values, Categories>>

export function useRegisterForm<
  Values extends FieldValues,
  Categories extends string,
>({
  form,
  field,
  name,
}: {
  form: UseFormReturn<Values>
  field: ConfigField<Values, Categories>
  name: Path<Values>
}): {
  ref: (instance: HTMLElement | null) => void
  name: Path<Values>
  value: PathValue<Values, Path<Values>>
  error: boolean
  onBlur: () => void
  onChange: (e: { target: unknown; type: unknown }) => void
  setValue: (
    val: PathValue<Values, Path<Values>>,
    options?:
      | boolean
      | {
          shouldValidate: boolean
          shouldDirty: boolean
          shouldTouch: boolean
        },
  ) => void
} {
  const value = form.watch(name)
  const error =
    getFormStateFieldBoolean(form.formState.touchedFields, name) &&
    !!form.formState.errors[name]

  // Do not memoize this register call, for an unknown reason it sometimes
  // causes form updates to stop working.
  const { ref, onChange: _onChange } = form.register(name, field.validation)

  const onChange = useCallback(
    (e: { target: unknown; type: unknown }) => {
      _onChange(e)
      field.trigger?.forEach((t) => form.trigger(t))
    },
    [_onChange, form, field],
  )

  const onBlur = useCallback(() => {
    form.trigger(name)
    field.trigger?.forEach((t) => form.trigger(t))
  }, [form, field, name])

  const setValue = useCallback(
    (
      val: PathValue<Values, Path<Values>>,
      options?:
        | boolean
        | {
            shouldValidate: boolean
            shouldDirty: boolean
            shouldTouch: boolean
          },
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
          : options,
      )
      field.trigger?.forEach((t) => form.trigger(t))
    },
    [name, form, field],
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
  Categories extends string,
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
    [fields],
  )
}

export type FieldProps<
  Values extends FieldValues,
  Categories extends string,
> = {
  name: Path<Values>
  form: UseFormReturn<Values>
  fields: ConfigFields<Values, Categories>
}

export function shouldShowField<
  Values extends FieldValues,
  Categories extends string,
>({ name, form, fields }: FieldProps<Values, Categories>) {
  const field = fields[name]
  return !field.hidden && (!field.show || field.show(form.getValues()))
}

// Helper method that works around some TypeScript issues with key access.
export function getFormStateFieldBoolean<Values>(
  map: Partial<Readonly<DeepMap<DeepPartial<Values>, boolean>>>,
  name: string,
) {
  return (map as Record<string, boolean>)[name]
}
