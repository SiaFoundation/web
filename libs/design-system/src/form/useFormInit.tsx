'use client'

import { useAppSettings } from '@siafoundation/react-core'
import { useEffect, useState } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'

type Props<DataForm extends FieldValues> = {
  form: UseFormReturn<DataForm>
  remoteValues?: DataForm
}

// initializes form when the rmoteValues first become available
// and resets init when the user locks the app
export function useFormInit<DataForm extends FieldValues>({
  form,
  remoteValues,
}: Props<DataForm>) {
  const [init, setInit] = useState(false)

  // reset init when the user locks the app
  const { isUnlockedAndAuthedRoute } = useAppSettings()
  useEffect(() => {
    if (!isUnlockedAndAuthedRoute) {
      setInit(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUnlockedAndAuthedRoute])

  // reset form when needs init and the remoteValues become available
  useEffect(() => {
    if (!init && remoteValues) {
      setInit(true)
      form.reset(remoteValues)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remoteValues])
}
