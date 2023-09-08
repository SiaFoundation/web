'use client'

import { Dialog } from '../core/Dialog'
import { FormSubmitButton } from '../components/Form'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

export type ConfirmDialogParams = {
  title: React.ReactNode
  action: React.ReactNode
  variant: 'red' | 'accent'
  body: React.ReactNode
  onConfirm: () => void
}

type Props = {
  open: boolean
  params?: ConfirmDialogParams
  trigger?: React.ReactNode
  onOpenChange: (val: boolean) => void
}

export function ConfirmDialog({ open, params, trigger, onOpenChange }: Props) {
  const { body, title, variant, action, onConfirm } = params || {}
  const form = useForm()

  const onValid = useCallback(() => {
    if (onConfirm) {
      onConfirm()
    }
    onOpenChange(false)
  }, [onConfirm, onOpenChange])

  return (
    <Dialog
      title={title}
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      contentVariants={{
        className: 'w-[400px]',
      }}
    >
      <form onSubmit={form.handleSubmit(onValid)}>
        <div className="flex flex-col gap-4">
          {body}
          <div className="flex gap-1 justify-end">
            <FormSubmitButton variant={variant} form={form} size="small">
              {action}
            </FormSubmitButton>
          </div>
        </div>
      </form>
    </Dialog>
  )
}
