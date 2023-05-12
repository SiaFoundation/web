import { Dialog } from '../core/Dialog'
import { FormSubmitButton } from '../components/Form'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  trigger?: React.ReactNode
  open: boolean
  variant: 'red' | 'accent'
  onOpenChange: (val: boolean) => void
  title: React.ReactNode
  action: React.ReactNode
  body: React.ReactNode
  onConfirm: () => void
}

export function ConfirmDialog({
  trigger,
  open,
  body,
  title,
  variant,
  action,
  onConfirm,
  onOpenChange,
}: Props) {
  const form = useForm()

  const onValid = useCallback(() => {
    onConfirm()
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
