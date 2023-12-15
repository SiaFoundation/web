'use client'

import { useCallback, useEffect } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'

type Props<DataForm extends FieldValues> = {
  form: UseFormReturn<DataForm>
  remoteValues?: DataForm
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
    form.reset(remoteValues)
    for (const [key, value] of Object.entries(localValues)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      form.setValue(key as any, value, {
        shouldDirty: true,
      })
    }
  }, [form, remoteValues])

  useEffect(() => {
    syncRemoteDataWithUserChanges()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // if any of the remote data changes, trigger a sync
    remoteValues,
  ])
}
