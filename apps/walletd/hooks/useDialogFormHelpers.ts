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

  const resetAndClose = useCallback(() => {
    form.reset(defaultValues)
    onOpenChange(false)
  }, [form, onOpenChange, defaultValues])

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        resetAndClose()
      }
    },
    [resetAndClose]
  )
  return {
    reset,
    resetAndClose,
    handleOpenChange,
  }
}
