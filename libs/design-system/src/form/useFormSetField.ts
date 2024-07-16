import { useCallback } from 'react'
import type {
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from 'react-hook-form'
import type { ConfigField } from './configurationFields'

export function useFormSetField<
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
}
