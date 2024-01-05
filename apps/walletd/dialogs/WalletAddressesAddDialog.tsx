/* eslint-disable react/no-unescaped-entities */
import {
  ConfigFields,
  Dialog,
  FieldTextArea,
  FormSubmitButton,
  Paragraph,
  triggerErrorToast,
  triggerSuccessToast,
  useDialogFormHelpers,
} from '@siafoundation/design-system'
import { useWalletAddressAdd } from '@siafoundation/react-walletd'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useWallets } from '../contexts/wallets'
import { isValidAddress } from '@siafoundation/units'
import { uniq } from '@technically/lodash'

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

const placeholder = `91acbc0feb9e20d538db1f8a509d508362d1b1f3d725d9b6639306531d770c1ef9eb637b4903
b58849e347356878bb0098908191550ff3e46cc35ed166d0c571fe184d2f17b835747991c266
b811a04859809fe081884c10d50ca069f1429112ba4a8dc9181c95de41f7eca01416923daa6d
03442c5643c1deb15c60104ca6ad80fa9563c67c8334f0bbe968b01cb9b8f81c8103a7a202c0
`

function formatAddresses(value: string) {
  return uniq(
    value
      .trim()
      .split(/[^0-9a-fA-F]+/)
      .map((v) => v)
      .filter((v) => !!v)
  )
}

function isCorrectLength(addr: string) {
  return addr.length === 76
}

function getFields(): ConfigFields<typeof defaultValues, never> {
  return {
    addresses: {
      type: 'text',
      title: 'Addresses',
      placeholder,
      validation: {
        required: 'required',
        validate: {
          valid: (value: string) => {
            const addresses = formatAddresses(value || '')

            for (let i = 0; i < addresses.length; i++) {
              if (!isCorrectLength(addresses[i])) {
                return `address ${i + 1} is not 76 charaters`
              }
              if (!isValidAddress(addresses[i])) {
                return `address ${i + 1} is invalid`
              }
            }
            return true
          },
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
      const addrs = formatAddresses(addresses)
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
        triggerSuccessToast('Successfully added 1 address.')
      } else {
        triggerSuccessToast(`Successfully added ${count} addresses.`)
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

  const addressesText = form.watch('addresses')
  const addressCount = formatAddresses(addressesText).length

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
            {addressCount === 0
              ? 'Add addresses'
              : addressCount === 1
              ? 'Add 1 address'
              : `Add ${addressCount.toLocaleString()} addresses`}
          </FormSubmitButton>
        </div>
      }
    >
      <div className="flex flex-col gap-2 py-2">
        <Paragraph size="14">
          Enter multiple addresses separated by spaces or commas.
        </Paragraph>
        <FieldTextArea form={form} fields={fields} name="addresses" />
      </div>
    </Dialog>
  )
}
