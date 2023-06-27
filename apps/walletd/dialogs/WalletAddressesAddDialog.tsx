/* eslint-disable react/no-unescaped-entities */
import {
  ConfigFields,
  Dialog,
  FieldTextArea,
  FormSubmitButton,
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { useWalletAddressAdd } from '@siafoundation/react-walletd'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useDialogFormHelpers } from '../hooks/useDialogFormHelpers'
import { useWallets } from '../contexts/wallets'

export type WalletAddressesAddDialogParams = {
  walletId: string
}

type Props = {
  params?: WalletAddressesAddDialogParams
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

const defaultValues = {
  addresses: '',
}

function getFields(): ConfigFields<typeof defaultValues, never> {
  return {
    addresses: {
      type: 'text',
      title: 'Addresses',
      placeholder: `
      addr1
      addr2`,
      validation: {
        required: 'required',
        validate: {
          valid: (value: string) =>
            value.split(' ').map((v) => v) || 'invalid addresses',
        },
      },
    },
  }
}

export function WalletAddressesAddDialog({
  params,
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { walletId } = params || {}
  const { dataset } = useWallets()
  const wallet = dataset?.find((w) => w.id === walletId)
  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const { handleOpenChange, closeAndReset } = useDialogFormHelpers({
    form,
    onOpenChange,
    defaultValues,
  })

  const fields = getFields()

  const addressAdd = useWalletAddressAdd()
  const addAllAddresses = useCallback(
    async (addresses: string) => {
      const addrs = addresses.split(' ')
      const count = addrs.length
      for (let i = 0; i < count; i++) {
        const addr = addrs[i]
        const response = await addressAdd.put({
          params: {
            id: walletId,
            addr,
          },
          payload: {},
        })
        if (response.error) {
          if (count === 1) {
            triggerErrorToast('Error saving address.')
          } else {
            triggerErrorToast(
              `Error saving addresses. ${
                i > 0 ? 'Not all addresses were saved.' : ''
              }`
            )
          }
          return
        }
      }
      if (count === 1) {
        triggerSuccessToast('Successfully generated 1 address.')
      } else {
        triggerSuccessToast(`Successfully generated ${count} addresses.`)
      }
      closeAndReset()
    },
    [walletId, addressAdd, closeAndReset]
  )

  const onSubmit = useCallback(
    (values: typeof defaultValues) => {
      return addAllAddresses(values.addresses)
    },
    [addAllAddresses]
  )

  return (
    <Dialog
      title={`Wallet ${wallet?.name}: add addresses`}
      trigger={trigger}
      open={open}
      onOpenChange={handleOpenChange}
      contentVariants={{
        className: 'w-[500px]',
      }}
      onSubmit={form.handleSubmit(onSubmit)}
      controls={
        <div className="flex justify-end">
          <FormSubmitButton form={form} variant="accent" size="medium">
            Add addresses
          </FormSubmitButton>
        </div>
      }
    >
      <div className="flex flex-col gap-2 py-2">
        <FieldTextArea form={form} field={fields.addresses} name="addresses" />
      </div>
    </Dialog>
  )
}
