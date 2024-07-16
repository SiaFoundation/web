'use client'

import type { FieldValues, UseFormReturn } from 'react-hook-form'

type Props<DataForm extends FieldValues> = {
  form: UseFormReturn<DataForm>
}

export function useFormChangeCount<DataForm extends FieldValues>({
  form,
}: Props<DataForm>) {
  const changeCount = Object.entries(form.formState.dirtyFields).filter(
    ([_, val]) => !!val,
  ).length

  return {
    changeCount,
  }
}
