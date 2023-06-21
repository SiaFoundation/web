import {
  Paragraph,
  Dialog,
  triggerSuccessToast,
  ConfigFields,
  useOnInvalid,
  FormSubmitButton,
  FieldText,
  Code,
} from '@siafoundation/design-system'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useDialog } from '../contexts/dialog'

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

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function WalletRemoveDialog({ trigger, open, onOpenChange }: Props) {
  const { id: name, closeDialog } = useDialog()

  // const volumeDelete = useVolumeDelete()

  const form = useForm({
    defaultValues,
  })

  const onSubmit = useCallback(
    async (values: typeof defaultValues) => {
      // const response = await volumeDelete.delete({
      //   params: {
      //     id: volume.data?.ID,
      //     force: values.force,
      //   },
      // })
      // if (response.error) {
      //   triggerErrorToast(response.error)
      // } else {
      triggerSuccessToast('Wallet permanently removed.')
      form.reset()
      closeDialog()
      // }
    },
    [form, closeDialog]
  )

  const fields = useMemo(() => getFields(name), [name])

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
          <Code>{name}</Code>?
        </Paragraph>
        <Paragraph size="14">
          Enter the wallet name to confirm the removal.
        </Paragraph>
        <FieldText name="name" form={form} field={fields.name} />
        <FormSubmitButton variant="red" form={form}>
          Remove
        </FormSubmitButton>
      </div>
    </Dialog>
  )
}
