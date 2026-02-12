import {
  Paragraph,
  Dialog,
  triggerSuccessToast,
  useOnInvalid,
  FormSubmitButton,
  FieldText,
  triggerErrorToast,
  FieldSelect,
} from '@siafoundation/design-system'
import {
  useAdminConnectKeyAdd,
  useAdminQuotas,
} from '@siafoundation/indexd-react'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useDialog } from '../contexts/dialog'
import { useKeysParams } from '../components/Data/Keys/useKeysParams'
import { useMutate } from '@siafoundation/react-core'
import { adminConnectKeysRoute } from '@siafoundation/indexd-types'
import {
  defaultValues,
  Values,
  getFields,
  transformUpForm,
} from '../lib/connectKey'

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function ConnectKeyCreateDialog({ trigger, open, onOpenChange }: Props) {
  const { closeDialog } = useDialog()
  const { setPanelId } = useKeysParams()
  const keyAdd = useAdminConnectKeyAdd()
  const quotas = useAdminQuotas()
  const fields = useMemo(() => getFields(quotas.data), [quotas.data])

  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const mutate = useMutate()
  const onSubmit = useCallback(
    async (values: Values) => {
      const response = await keyAdd.post({
        payload: transformUpForm(values),
      })
      if (response.error) {
        triggerErrorToast({
          title: 'Error creating connect key',
          body: response.error,
        })
      } else {
        triggerSuccessToast({ title: 'Connect key created' })
        mutate((key) => key.startsWith(adminConnectKeysRoute))
        form.reset()
        closeDialog()
        setPanelId(response.data?.key ?? undefined)
      }
    },
    [form, keyAdd, closeDialog, setPanelId, mutate],
  )

  const onInvalid = useOnInvalid(fields)

  return (
    <Dialog
      title="Create connect key"
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
        <Paragraph size="14">Create a new connect key.</Paragraph>
        <FieldText name="description" form={form} fields={fields} />
        <FieldSelect name="quota" form={form} fields={fields} />
        <FormSubmitButton form={form}>Create connect key</FormSubmitButton>
      </div>
    </Dialog>
  )
}
