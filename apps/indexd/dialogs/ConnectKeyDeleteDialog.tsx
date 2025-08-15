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
import { useAdminConnectKeyDelete } from '@siafoundation/indexd-react'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useDialog } from '../contexts/dialog'
import { useKeysParams } from '../components/Data/Keys/useKeysParams'
import { useMutate } from '@siafoundation/react-core'
import { adminConnectKeysRoute } from '@siafoundation/indexd-types'

const defaultValues = {
  name: '',
}

function getFields(): ConfigFields<typeof defaultValues, never> {
  return {
    name: {
      type: 'text',
      title: 'Confirmation',
      placeholder: 'delete the key',
      validation: {
        required: 'required',
        validate: {
          equals: (value) => value === 'delete the key' || 'does not match',
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

export function ConnectKeyDeleteDialog({
  id,
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { closeDialog } = useDialog()
  const { panelId, setPanelId } = useKeysParams()
  const keyDelete = useAdminConnectKeyDelete()

  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const mutate = useMutate()
  const onSubmit = useCallback(async () => {
    if (!id) {
      return
    }
    const response = await keyDelete.delete({
      params: {
        key: id,
      },
    })
    if (response.error) {
      triggerErrorToast({
        title: 'Error deleting connect key',
        body: response.error,
      })
    } else {
      triggerSuccessToast({ title: 'Connect key permanently deleted' })
      mutate((key) => key.startsWith(adminConnectKeysRoute))
      form.reset()
      closeDialog()
      if (panelId === id) {
        setPanelId(undefined)
      }
    }
  }, [form, id, keyDelete, closeDialog, panelId, setPanelId, mutate])

  const fields = useMemo(() => getFields(), [])

  const onInvalid = useOnInvalid(fields)

  return (
    <Dialog
      title="Delete connect key"
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
          connect key?
        </Paragraph>
        <Code className="overflow-hidden">{id}</Code>
        <Paragraph size="14">
          {'Enter "delete the key" to confirm the removal.'}
        </Paragraph>
        <FieldText name="name" form={form} fields={fields} />
        <FormSubmitButton variant="red" form={form}>
          Delete connect key
        </FormSubmitButton>
      </div>
    </Dialog>
  )
}
