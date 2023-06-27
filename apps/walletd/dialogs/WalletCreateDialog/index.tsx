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
import { useWalletAdd } from '@siafoundation/react-walletd'
import { useDialog } from '../../contexts/dialog'
import { useWallets } from '../../contexts/wallets'
import { v4 as uuidv4 } from 'uuid'
import { Response, SWRError } from '@siafoundation/react-core'

const defaultValues = {
  name: '',
  description: '',
}

function getFields({
  walletNames,
}: {
  walletNames: string[]
}): ConfigFields<typeof defaultValues, never> {
  return {
    name: {
      type: 'text',
      title: 'Name',
      placeholder: 'name',
      validation: {
        validate: {
          unique: (value) =>
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

type Props = {
  title: React.ReactNode
  description: React.ReactNode
  create: (id: string, values: typeof defaultValues) => Promise<Response<void>>
  onCreateSuccess: (id: string, values: typeof defaultValues) => void
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function WalletCreateDialog({
  title,
  description,
  create,
  onCreateSuccess,
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { openDialog } = useDialog()
  const form = useForm({
    mode: 'all',
    defaultValues,
  })
  const { dataset } = useWallets()
  const walletNames = dataset?.map((w) => w.name) || []
  const fields = getFields({ walletNames })
  const onSubmit = useCallback(
    async (values) => {
      const id = uuidv4()
      const response = await create(id, values)
      if (response.error) {
        triggerErrorToast(response.error)
      } else {
        onCreateSuccess(id, values)
        form.reset(defaultValues)
      }
    },
    [form, create, onCreateSuccess]
  )

  return (
    <Dialog
      title={title}
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
          {description}
        </Paragraph>
        <FieldText name="name" form={form} field={fields.name} />
        <FieldTextArea
          name="description"
          form={form}
          field={fields.description}
        />
      </div>
    </Dialog>
  )
}
