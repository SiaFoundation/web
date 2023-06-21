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
  title: React.ReactNode
  description: React.ReactNode
  onCreate: (name: string) => void

  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function WalletCreateDialog({
  title,
  description,
  onCreate,
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { openDialog } = useDialog()
  const walletAdd = useWalletAdd()
  const form = useForm({
    mode: 'all',
    defaultValues,
  })
  const fields = getFields()
  const onSubmit = useCallback(
    async (values) => {
      const response = await walletAdd.put({
        params: {
          name: values.name,
        },
        payload: {
          type: 'seed',
          description: values.description,
        },
      })
      if (response.error) {
        triggerErrorToast(response.error)
      } else {
        onCreate(values.name)
        form.reset(defaultValues)
      }
    },
    [form, walletAdd, onCreate]
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
