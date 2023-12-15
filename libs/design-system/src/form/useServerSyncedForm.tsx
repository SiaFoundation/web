'use client'

import { useCallback, useEffect, useState } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'

type Props<DataForm extends FieldValues> = {
  form: UseFormReturn<DataForm>
  remoteValues?: DataForm
  revalidate: () => Promise<DataForm>
  mode?: 'simple' | 'advanced'
  // used to reset the init process
  initialized?: boolean
}

export function useServerSyncedForm<DataForm extends FieldValues>({
  form,
  remoteValues,
  revalidate,
  mode,
  initialized,
}: Props<DataForm>) {
  const changeCount = Object.entries(form.formState.dirtyFields).filter(
    ([_, val]) => !!val
  ).length

  const revalidateAndResetFormData = useCallback(async () => {
    const remoteData = await revalidate()
    if (remoteData) {
      form.reset(remoteData)
    }
  }, [form, revalidate])

  // init - when new config is fetched, set the form
  const [hasInit, setHasInit] = useState(false)
  useEffect(() => {
    if (!initialized) {
      setHasInit(false)
    }
  }, [initialized])

  useEffect(() => {
    if (!hasInit && remoteValues) {
      form.reset(remoteValues)
      setHasInit(true)
    }
    // Try to initialize whenever remoteData changes from null to a value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remoteValues])

  // Syncs updated remote data and re-applies user changes to the form.
  const syncRemoteDataWithUserChanges = useCallback(() => {
    if (!hasInit || form.formState.isSubmitting || !remoteValues) {
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
  }, [form, hasInit, remoteValues])

  useEffect(() => {
    syncRemoteDataWithUserChanges()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // if form mode is toggled reset
    mode,
    // if any of the remote data changes, trigger a sync
    remoteValues,
  ])

  return {
    changeCount,
    revalidateAndResetFormData,
  }
}
