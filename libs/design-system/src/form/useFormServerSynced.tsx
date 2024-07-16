'use client'

import { useCallback, useEffect } from 'react'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'

type Props<DataForm extends FieldValues> = {
  form: UseFormReturn<DataForm>
  remoteValues?: DataForm | null
}

export function useFormServerSynced<DataForm extends FieldValues>({
  form,
  remoteValues,
}: Props<DataForm>) {
  // Syncs updated remote data and re-applies user changes to the form.
  const syncRemoteDataWithUserChanges = useCallback(() => {
    if (form.formState.isSubmitting || !remoteValues) {
      return
    }
    const localValues = form.getValues()
    // Update each field from remote data, while keeping any local
    // dirty, error, or touched state.
    for (const [key, value] of Object.entries(remoteValues)) {
      form.resetField(key as Path<DataForm>, {
        defaultValue: value,
        keepDirty: true,
        keepError: true,
        keepTouched: true,
      })
    }
    // Retain any local values that the user actually changed but has not saved.
    // Fields that have not been changed will update to show the latest remote value.
    for (const [key, value] of Object.entries(localValues)) {
      if (form.getFieldState(key as Path<DataForm>).isDirty) {
        form.setValue(key as Path<DataForm>, value)
      }
    }
  }, [form, remoteValues])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    syncRemoteDataWithUserChanges()
  }, [
    // if any of the remote data changes, trigger a sync
    remoteValues,
  ])
}
