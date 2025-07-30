'use client'

import { useCallback, useEffect, useState } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'

type Props<Values extends FieldValues> = {
  form: UseFormReturn<Values>
  onOpenChange: (open: boolean) => void
  defaultValues: Values
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initKey?: any[]
}

export function useDialogFormHelpers<Values extends FieldValues>({
  form,
  onOpenChange,
  defaultValues,
  initKey,
}: Props<Values>) {
  const reset = useCallback(() => {
    form.reset(defaultValues)
  }, [form, defaultValues])

  const closeAndReset = useCallback(() => {
    onOpenChange(false)
    form.reset(defaultValues)
  }, [form, onOpenChange, defaultValues])

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        closeAndReset()
      } else {
        onOpenChange(true)
        // Does not update the field valuse without setTimeout,
        // likely because the actual fields are not mounted yet
        setTimeout(() => {
          reset()
        }, 0)
      }
    },
    [closeAndReset, reset, onOpenChange],
  )

  // Use an internal key that is memoed on a shallow element comparison
  // in case the passed prop is not memoed and is a new array each time
  const internalInitKey = useArrayElementShallowCompare(initKey || [])

  // The init key allows the caller to trigger a delayed form reset
  // once values are ready, determined by passing an array with:
  // - a deep change of values
  // - all truthy values
  useEffect(() => {
    if (!internalInitKey || !internalInitKey.length) {
      return
    }

    // If the key has changed and all parts of key are thruthy,
    // we should reset the form
    if (internalInitKey.every((k) => !!k)) {
      reset()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalInitKey])

  return {
    reset,
    closeAndReset,
    handleOpenChange,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useArrayElementShallowCompare<T extends any[]>(externalVal: T): T {
  const [internalVal, setInternalVal] = useState<T>(externalVal)

  useEffect(() => {
    // if externalVal is empty on mount, do nothing
    if (!externalVal || !externalVal.length) {
      return
    }
    let didChange = false
    for (let i = 0; i < externalVal.length; i++) {
      if (externalVal[i] !== internalVal[i]) {
        didChange = true
        break
      }
    }
    if (didChange) {
      setInternalVal(externalVal)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalVal])

  return internalVal
}
