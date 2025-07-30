import {
  Paragraph,
  Button,
  Dialog,
  ConfigFields,
  FieldText,
  triggerErrorToast,
  FormSubmitButton,
  FieldTextArea,
} from '@siafoundation/design-system'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { WalletMetadata } from '@siafoundation/walletd-types'
import { useWalletAdd } from '@siafoundation/walletd-react'
import { useDialog } from '../../contexts/dialog'
import { useWallets } from '../../contexts/wallets'
import { walletAddTypes } from '../../config/walletTypes'

const defaultValues = {
  name: '',
  description: '',
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

export type WalletAddWatchDialogParams = void

type Props = {
  params?: WalletAddWatchDialogParams
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function WalletAddWatchDialog({ trigger, open, onOpenChange }: Props) {
  const { openDialog } = useDialog()
  const walletAdd = useWalletAdd()
  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const { dataset } = useWallets()
  const walletNames = dataset?.map((w) => w.name) || []

  const fields = getFields({ walletNames })

  const onSubmit = useCallback(
    async (values: Values) => {
      const metadata: WalletMetadata = {
        type: 'watch',
      }
      const response = await walletAdd.post({
        payload: {
          name: values.name,
          description: values.description,
          metadata,
        },
      })
      if (response.error) {
        triggerErrorToast({
          title: 'Error adding wallet',
          body: response.error,
        })
      } else {
        openDialog('walletAddressesAdd', {
          walletId: response.data.id,
        })
        form.reset(defaultValues)
      }
    },
    [form, openDialog, walletAdd],
  )

  return (
    <Dialog
      title={walletAddTypes.walletAddWatch.title}
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      contentVariants={{
        className: 'w-[400px]',
      }}
      onSubmit={form.handleSubmit(onSubmit)}
      controls={
        <div className="flex gap-2 px-1">
          <Button
            size="medium"
            onClick={() => {
              openDialog('walletAddType')
            }}
          >
            back
          </Button>
          <div className="flex-1" />
          <FormSubmitButton size="medium" form={form}>
            Add wallet
          </FormSubmitButton>
        </div>
      }
    >
      <div className="flex flex-col gap-4 mb-2">
        <Paragraph size="14" color="subtle">
          {walletAddTypes.walletAddWatch.description}
        </Paragraph>
        <FieldText name="name" form={form} fields={fields} />
        <FieldTextArea name="description" form={form} fields={fields} />
      </div>
    </Dialog>
  )
}
