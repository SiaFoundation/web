import {
  Dialog,
  ConfigFields,
  triggerErrorToast,
  FormSubmitButton,
  FieldTextArea,
  truncate,
  WalletAddressCode,
  Button,
  useDialogFormHelpers,
} from '@siafoundation/design-system'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useWalletAddressAdd } from '@siafoundation/walletd-react'
import { useDialog } from '../../contexts/dialog'
import { useWalletAddresses } from '../../hooks/useWalletAddresses'

function getDefaultValues({ description }: { description?: string }) {
  return {
    description: description || '',
  }
}

type Values = ReturnType<typeof getDefaultValues>

function getFields(): ConfigFields<Values, never> {
  return {
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

export type AddressUpdateDialogParams = {
  walletId: string
  address: string
}

type Props = {
  params?: AddressUpdateDialogParams
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function AddressUpdateDialog({
  trigger,
  open,
  onOpenChange,
  params,
}: Props) {
  const { walletId, address: addr } = params || {}
  const { openDialog } = useDialog()
  const { dataset, datasetState } = useWalletAddresses({ id: walletId })
  const address = dataset?.find((d) => d.id === addr)
  const addressAdd = useWalletAddressAdd()
  const defaultValues = getDefaultValues({
    description: address?.description,
  })
  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const { handleOpenChange, closeAndReset } = useDialogFormHelpers({
    form,
    onOpenChange,
    defaultValues,
    // Resets form with latest default values after elements change and are
    // all thruthy
    // This is used because address data is async and can be intially undefined
    initKey: [params, datasetState === 'loaded'],
  })

  const fields = getFields()
  const onSubmit = useCallback(
    async (values: Values) => {
      const response = await addressAdd.put({
        params: {
          id: walletId,
        },
        payload: {
          ...address.raw,
          address: addr,
          description: values.description,
        },
      })
      if (response.error) {
        triggerErrorToast({
          title: 'Error updating address',
          body: response.error,
        })
      } else {
        closeAndReset()
      }
    },
    [walletId, addr, addressAdd, address, closeAndReset]
  )

  return (
    <Dialog
      title={truncate(addr, 20)}
      trigger={trigger}
      open={open}
      onOpenChange={handleOpenChange}
      contentVariants={{
        className: 'w-[400px]',
      }}
      onSubmit={form.handleSubmit(onSubmit)}
      controls={
        <div className="flex gap-2 px-1">
          <Button
            onClick={() =>
              openDialog('addressRemove', {
                walletId,
                address: addr,
              })
            }
          >
            Remove address
          </Button>
          <div className="flex-1" />
          <FormSubmitButton size="small" form={form}>
            Save changes
          </FormSubmitButton>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <WalletAddressCode address={address?.address || ''} />
        <FieldTextArea name="description" form={form} fields={fields} />
      </div>
    </Dialog>
  )
}
