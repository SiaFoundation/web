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
  Alert,
  Text,
} from '@siafoundation/design-system'
import { useAccountDelete } from '@siafoundation/indexd-react'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useDialog } from '../contexts/dialog'
import { Warning16 } from '@siafoundation/react-icons'
import { useAccountsParams } from '../components/Data/Accounts/useAccountsParams'

const defaultValues = {
  name: '',
}

function getFields(): ConfigFields<typeof defaultValues, never> {
  return {
    name: {
      type: 'text',
      title: 'Confirmation',
      placeholder: 'delete the account and all its data',
      validation: {
        required: 'required',
        validate: {
          equals: (value) =>
            value === 'delete the account and all its data' || 'does not match',
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

export function AccountDeleteDialog({
  id,
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { closeDialog } = useDialog()
  const { panelId, setPanelId } = useAccountsParams()
  const accountDelete = useAccountDelete()

  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const onSubmit = useCallback(async () => {
    if (!id) {
      return
    }
    const response = await accountDelete.delete({
      params: {
        accountkey: id,
      },
    })
    if (response.error) {
      triggerErrorToast({
        title: 'Error deleting account',
        body: response.error,
      })
    } else {
      triggerSuccessToast({ title: 'Account permanently deleted' })
      form.reset()
      closeDialog()
      if (panelId === id) {
        setPanelId(undefined)
      }
    }
  }, [form, id, accountDelete, closeDialog, panelId, setPanelId])

  const fields = useMemo(() => getFields(), [])

  const onInvalid = useOnInvalid(fields)

  return (
    <Dialog
      title="Delete account"
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
          account?
        </Paragraph>
        <Code className="overflow-hidden">{id}</Code>
        <Alert className="!p-2">
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <Text color="red">
                <Warning16 />
              </Text>
              <Text weight="medium">Warning</Text>
            </div>
            <Text size="14" color="subtle">
              This action cannot be undone. All data associated with the account
              will be permanently deleted.
            </Text>
          </div>
        </Alert>
        <Paragraph size="14">
          {
            'Enter "delete the account and all its data" to confirm the removal.'
          }
        </Paragraph>
        <FieldText name="name" form={form} fields={fields} />
        <FormSubmitButton variant="red" form={form}>
          Delete account
        </FormSubmitButton>
      </div>
    </Dialog>
  )
}
