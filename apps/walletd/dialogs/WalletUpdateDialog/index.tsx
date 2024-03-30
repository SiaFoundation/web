import {
  Dialog,
  ConfigFields,
  triggerErrorToast,
  FormSubmitButton,
  FieldTextArea,
  FieldText,
  Badge,
  Label,
  useDialogFormHelpers,
} from '@siafoundation/design-system'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useWalletUpdate } from '@siafoundation/react-walletd'
import { useWallets } from '../../contexts/wallets'
import { WalletData } from '../../contexts/wallets/types'

const defaultValues = {
  name: '',
  description: '',
}

function getDefaultValues(wallet: WalletData) {
  return wallet
    ? {
        name: wallet.name,
        description: wallet.description,
      }
    : defaultValues
}

type Values = typeof defaultValues

function getFields({
  walletNames,
}: {
  walletNames: string[]
}): ConfigFields<Values, never> {
  return {
    name: {
      type: 'text',
      title: 'Name',
      placeholder: 'name',
      validation: {
        validate: {
          unique: (value: string) =>
            !walletNames.includes(value) || 'name is already in use',
        },
        required: 'required',
        maxLength: 30,
      },
    },
    description: {
      type: 'text',
      title: 'Description',
      placeholder: 'Optional description or notes about the wallet.',
      validation: {
        maxLength: 200,
      },
    },
  }
}

export type WalletUpdateDialogParams = {
  walletId: string
}

type Props = {
  params?: WalletUpdateDialogParams
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function WalletUpdateDialog({
  params,
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { walletId } = params || {}
  const { dataset } = useWallets()
  const wallet = dataset?.find((d) => d.id === walletId)
  const walletUpdate = useWalletUpdate()
  const defaultValues = getDefaultValues(wallet)
  const form = useForm({
    mode: 'all',
    defaultValues,
  })
  const { handleOpenChange, closeAndReset } = useDialogFormHelpers({
    form,
    onOpenChange,
    defaultValues,
  })

  const walletNames = useMemo(
    () =>
      dataset?.reduce((acc, w) => {
        if (w.name !== wallet?.name) {
          return acc.concat(w.name)
        }
        return acc
      }, []) || [],
    [dataset, wallet]
  )
  const fields = getFields({ walletNames })
  const onSubmit = useCallback(
    async (values: Values) => {
      const response = await walletUpdate.post({
        params: {
          id: walletId,
        },
        payload: {
          ...wallet.raw,
          name: values.name,
          description: values.description,
        },
      })
      if (response.error) {
        triggerErrorToast({
          title: 'Error updating wallet',
          body: response.error,
        })
      } else {
        closeAndReset()
      }
    },
    [walletId, walletUpdate, wallet, closeAndReset]
  )

  return (
    <Dialog
      title={`${wallet?.name}`}
      trigger={trigger}
      open={open}
      onOpenChange={handleOpenChange}
      contentVariants={{
        className: 'w-[400px]',
      }}
      onSubmit={form.handleSubmit(onSubmit)}
      controls={
        <div className="flex gap-2 px-1">
          <div className="flex-1" />
          <FormSubmitButton size="medium" form={form}>
            Save changes
          </FormSubmitButton>
        </div>
      }
    >
      <div className="flex flex-col gap-4 mb-2">
        <div className="flex flex-col gap-1">
          <Label>Type</Label>
          <div>
            <Badge>{wallet?.metadata.type}</Badge>
          </div>
        </div>
        <FieldText name="name" form={form} fields={fields} />
        <FieldTextArea name="description" form={form} fields={fields} />
      </div>
    </Dialog>
  )
}
