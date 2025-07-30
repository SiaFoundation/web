import { useCallback } from 'react'
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { ConfigFields } from './configurationFields'

export function useFormSetField<
  Values extends FieldValues,
  Categories extends string,
>({
  form,
  fields,
  name,
}: {
  form: UseFormReturn<Values>
  fields: ConfigFields<Values, Categories>
  name: Path<Values>
}) {
  return useCallback(
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
      formSetField({ form, fields, name, value: val, options })
    },
    [name, form, fields],
  )
}

export function formSetField<
  Values extends FieldValues,
  Categories extends string,
>({
  form,
  fields,
  name,
  value,
  options,
}: {
  form: UseFormReturn<Values>
  fields: ConfigFields<Values, Categories>
  name: Path<Values>
  value: PathValue<Values, Path<Values>>
  options?:
    | boolean
    | {
        shouldValidate: boolean
        shouldDirty: boolean
        shouldTouch: boolean
      }
}) {
  form.setValue(
    name,
    value,
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
  fields[name].trigger?.forEach((t) => form.trigger(t))
}

export function formSetFields<
  Values extends FieldValues,
  Categories extends string,
>({
  form,
  fields,
  values,
  options,
}: {
  form: UseFormReturn<Values>
  fields: ConfigFields<Values, Categories>
  values: Partial<Values>
  options?:
    | boolean
    | {
        shouldValidate: boolean
        shouldDirty: boolean
        shouldTouch: boolean
      }
}) {
  for (const [key, value] of Object.entries(values)) {
    formSetField<Values, Categories>({
      form,
      fields,
      name: key as Path<Values>,
      value: value,
      options,
    })
  }
}
