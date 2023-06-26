import {
  Dialog,
  ConfigFields,
  triggerErrorToast,
  FormSubmitButton,
  FieldTextArea,
} from '@siafoundation/design-system'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useWalletAdd } from '@siafoundation/react-walletd'
import { useDialog } from '../../contexts/dialog'
import { useWallets } from '../../contexts/wallets'

const defaultValues = {
  name: '',
  description: '',
}

function getFields(): ConfigFields<typeof defaultValues, never> {
  return {
    name: {
      type: 'text',
      title: 'Name',
      placeholder: 'name',
      validation: {
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

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function WalletUpdateDialog({ trigger, open, onOpenChange }: Props) {
  const { id } = useDialog()
  const { dataset } = useWallets()
  const wallet = dataset?.find((d) => d.id === id)
  const walletAdd = useWalletAdd()
  const form = useForm({
    mode: 'all',
    defaultValues,
  })
  useEffect(() => {
    form.reset(
      wallet
        ? {
            name: wallet.name,
            description: wallet.description,
          }
        : defaultValues
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const fields = getFields()
  const onSubmit = useCallback(
    async (values) => {
      const response = await walletAdd.put({
        params: {
          name: id,
        },
        payload: {
          ...wallet,
          description: values.description,
        },
      })
      if (response.error) {
        triggerErrorToast(response.error)
      } else {
        form.reset(defaultValues)
      }
    },
    [id, form, walletAdd, wallet]
  )

  return (
    <Dialog
      title={`${wallet?.name}`}
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
        {/* <FieldText name="name" form={form} field={fields.name} /> */}
        <FieldTextArea
          name="description"
          form={form}
          field={fields.description}
        />
      </div>
    </Dialog>
  )
}
