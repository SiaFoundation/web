import {
  Paragraph,
  Dialog,
  triggerSuccessToast,
  ConfigFields,
  useOnInvalid,
  FormSubmitButton,
  FieldText,
  Code,
  triggerErrorToast,
} from '@siafoundation/design-system'
import { useAdminQuotaDelete } from '@siafoundation/indexd-react'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useDialog } from '../contexts/dialog'
import { useQuotasParams } from '../components/Data/Quotas/useQuotasParams'
import { useMutate } from '@siafoundation/react-core'
import { adminQuotasRoute } from '@siafoundation/indexd-types'

const defaultValues = {
  name: '',
}

function getFields(): ConfigFields<typeof defaultValues, never> {
  return {
    name: {
      type: 'text',
      title: 'Confirmation',
      placeholder: 'delete the quota',
      validation: {
        required: 'required',
        validate: {
          equals: (value) =>
            value === 'delete the quota' || 'does not match',
        },
      },
    },
  }
}

type Props = {
  id: string | undefined
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function QuotaDeleteDialog({
  id,
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { closeDialog } = useDialog()
  const { panelId, setPanelId } = useQuotasParams()
  const quotaDelete = useAdminQuotaDelete()

  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const mutate = useMutate()
  const onSubmit = useCallback(async () => {
    if (!id) {
      return
    }
    const response = await quotaDelete.delete({
      params: {
        key: id,
      },
    })
    if (response.error) {
      triggerErrorToast({
        title: 'Error deleting quota',
        body: response.error,
      })
    } else {
      triggerSuccessToast({ title: 'Quota permanently deleted' })
      mutate((key) => key.startsWith(adminQuotasRoute))
      form.reset()
      closeDialog()
      if (panelId === id) {
        setPanelId(undefined)
      }
    }
  }, [form, id, quotaDelete, closeDialog, panelId, setPanelId, mutate])

  const fields = useMemo(() => getFields(), [])

  const onInvalid = useOnInvalid(fields)

  return (
    <Dialog
      title="Delete quota"
      trigger={trigger}
      open={open}
      onOpenChange={(val) => {
        if (!val) {
          form.reset(defaultValues)
        }
        onOpenChange(val)
      }}
      contentVariants={{
        className: 'w-[400px]',
      }}
      onSubmit={form.handleSubmit(onSubmit, onInvalid)}
    >
      <div className="flex flex-col gap-4">
        <Paragraph size="14">
          Are you sure you would like to permanently delete the following
          quota?
        </Paragraph>
        <Code className="overflow-hidden">{id}</Code>
        <Paragraph size="14">
          {'Enter "delete the quota" to confirm the removal.'}
        </Paragraph>
        <FieldText name="name" form={form} fields={fields} />
        <FormSubmitButton variant="red" form={form}>
          Delete quota
        </FormSubmitButton>
      </div>
    </Dialog>
  )
}
