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
  stripPrefix,
} from '@siafoundation/design-system'
import { useWalletAddressDelete } from '@siafoundation/walletd-react'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useDialog } from '../contexts/dialog'

const defaultValues = {
  address: '',
}

function getFields(address: string): ConfigFields<typeof defaultValues, never> {
  return {
    address: {
      type: 'text',
      title: 'Address',
      placeholder: address,
      validation: {
        required: 'required',
        validate: {
          equals: (value) =>
            stripPrefix(value) === stripPrefix(address) ||
            'address does not match',
        },
      },
    },
  }
}

export type AddressRemoveDialogParams = {
  walletId: string
  address: string
}

type Props = {
  params?: AddressRemoveDialogParams
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function AddressRemoveDialog({
  params,
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { walletId, address } = params || {}
  const { closeDialog } = useDialog()

  const walletAddressDelete = useWalletAddressDelete()

  const form = useForm({
    defaultValues,
  })

  const onSubmit = useCallback(async () => {
    const response = await walletAddressDelete.delete({
      params: {
        id: walletId,
        addr: address,
      },
    })
    if (response.error) {
      triggerErrorToast({
        title: 'Error removing address',
        body: response.error,
      })
    } else {
      triggerSuccessToast({ title: 'Address permanently removed' })
      form.reset()
      closeDialog()
    }
  }, [form, walletId, address, walletAddressDelete, closeDialog])

  const fields = useMemo(() => getFields(address), [address])

  const onInvalid = useOnInvalid(fields)

  return (
    <Dialog
      title="Remove address"
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
          Are you sure you would like to permanently remove the address{' '}
          <Code>{stripPrefix(address).slice(0, 12)}...</Code>?
        </Paragraph>
        <Paragraph size="14">
          Enter the address name to confirm the removal.
        </Paragraph>
        <FieldText name="address" form={form} fields={fields} />
        <FormSubmitButton variant="red" form={form}>
          Remove
        </FormSubmitButton>
      </div>
    </Dialog>
  )
}
