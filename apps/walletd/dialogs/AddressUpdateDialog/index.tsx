import {
  Dialog,
  ConfigFields,
  triggerErrorToast,
  FormSubmitButton,
  FieldTextArea,
  truncate,
} from '@siafoundation/design-system'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useWalletAddressAdd } from '@siafoundation/react-walletd'
import { useDialog } from '../../contexts/dialog'
import { useAddresses } from '../../contexts/addresses'

const defaultValues = {
  description: '',
}

function getFields(): ConfigFields<typeof defaultValues, never> {
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

type Props = {
  title: React.ReactNode
  description: React.ReactNode

  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function AddressUpdateDialog({ trigger, open, onOpenChange }: Props) {
  const { id, params, closeDialog } = useDialog()
  const { dataset } = useAddresses()
  const address = dataset?.find((d) => d.id === params?.address)
  const addressAdd = useWalletAddressAdd()
  const form = useForm({
    mode: 'all',
    defaultValues,
  })
  useEffect(() => {
    form.reset(
      address
        ? {
            description: address.description,
          }
        : defaultValues
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const fields = getFields()
  const onSubmit = useCallback(
    async (values) => {
      const response = await addressAdd.put({
        params: {
          name: id,
          addr: params.address as string,
        },
        payload: {
          ...address,
          description: values.description,
        },
      })
      if (response.error) {
        triggerErrorToast(response.error)
      } else {
        closeDialog()
        form.reset(defaultValues)
      }
    },
    [id, params, form, addressAdd, address, closeDialog]
  )

  return (
    <Dialog
      title={truncate(params?.address as string, 20)}
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
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
        <FieldTextArea
          name="description"
          form={form}
          field={fields.description}
        />
      </div>
    </Dialog>
  )
}
