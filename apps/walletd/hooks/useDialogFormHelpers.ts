import { useCallback } from 'react'
import { UseFormReturn } from 'react-hook-form'

type Props<Values> = {
  form: UseFormReturn<Values>
  onOpenChange: (open: boolean) => void
  defaultValues: Values
}

export function useDialogFormHelpers<Values>({
  form,
  onOpenChange,
  defaultValues,
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
      }
    },
    [closeAndReset]
  )
  return {
    reset,
    closeAndReset,
    handleOpenChange,
  }
}
