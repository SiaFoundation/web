import {
  Code,
  type ConfigFields,
  Dialog,
  FieldText,
  FormSubmitButton,
  Paragraph,
  triggerErrorToast,
  triggerSuccessToast,
  useOnInvalid,
} from '@siafoundation/design-system'
import { useWalletDelete } from '@siafoundation/walletd-react'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { routes } from '../config/routes'
import { useDialog } from '../contexts/dialog'
import { useWallets } from '../contexts/wallets'

const defaultValues = {
  name: '',
}

function getFields(name: string): ConfigFields<typeof defaultValues, never> {
  return {
    name: {
      type: 'text',
      title: 'Name',
      placeholder: name,
      validation: {
        required: 'required',
        validate: {
          equals: (value) => value === name || 'name does not match',
        },
      },
    },
  }
}

export type WalletRemoveDialogParams = {
  walletId: string
}

type Props = {
  params?: WalletRemoveDialogParams
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function WalletRemoveDialog({
  params,
  trigger,
  open,
  onOpenChange,
}: Props) {
  const router = useRouter()
  const { walletId } = params || {}
  const { closeDialog } = useDialog()
  const { dataset } = useWallets()
  const wallet = dataset?.find((w) => w.id === walletId)

  const walletDelete = useWalletDelete()

  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const onSubmit = useCallback(async () => {
    const response = await walletDelete.delete({
      params: {
        id: walletId,
      },
    })
    if (response.error) {
      triggerErrorToast({
        title: 'Error removing wallet',
        body: response.error,
      })
    } else {
      triggerSuccessToast({ title: 'Wallet permanently removed' })
      form.reset()
      closeDialog()
      router.push(routes.home)
    }
  }, [form, walletId, walletDelete, closeDialog, router])

  const fields = useMemo(() => getFields(wallet?.name), [wallet])

  const onInvalid = useOnInvalid(fields)

  return (
    <Dialog
      title="Remove wallet"
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
          Are you sure you would like to permanently remove the wallet{' '}
          <Code>{wallet?.name}</Code>?
        </Paragraph>
        <Paragraph size="14">
          Enter the wallet name to confirm the removal.
        </Paragraph>
        <FieldText name="name" form={form} fields={fields} />
        <FormSubmitButton variant="red" form={form}>
          Remove
        </FormSubmitButton>
      </div>
    </Dialog>
  )
}
