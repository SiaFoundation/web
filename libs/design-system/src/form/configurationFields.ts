import BigNumber from 'bignumber.js'
import { entries } from 'lodash'
import { useCallback } from 'react'
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
  type: 'number' | 'siacoin' | 'text' | 'secret' | 'boolean' | 'select'
  title: string
  category?: Categories
  description?: React.ReactNode
  units?: string
  placeholder?: string
  suggestionTip?: React.ReactNode
  suggestion?: BigNumber | string | boolean
  average?: BigNumber | string | boolean
  averageTip?: React.ReactNode
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
  const value = form.getValues(name)
  const error =
    form.formState.touchedFields[name] && !!form.formState.errors[name]
  const { onBlur } = form.register(name, field.validation)
  const onChange = useCallback(
    (val: PathValue<Values, Path<Values>>) => {
      form.setValue(name, val, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
      field.trigger?.forEach((t) => form.trigger(t))
    },
    [name, form, field]
  )
  return {
    value,
    error,
    onBlur,
    onChange,
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
          .map(([key, e]) => `${fields[key].title}: ${e?.message}`)
          .join(', ')
      )
    },
    [fields]
  )
}
