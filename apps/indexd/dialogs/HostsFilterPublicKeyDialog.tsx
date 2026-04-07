import {
  Dialog,
  useOnInvalid,
  FormSubmitButton,
  FieldText,
  ConfigFields,
  useDialogFormHelpers,
} from '@siafoundation/design-system'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useHostsParams } from '../components/Data/Hosts/useHostsParams'

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

const defaultValues = {
  publicKey: '',
}

type Values = typeof defaultValues

const fields: ConfigFields<Values, never> = {
  publicKey: {
    type: 'text',
    title: 'Public key',
    placeholder: 'ed25519:b050c0c6...',
    validation: {
      required: 'required',
    },
  },
}

export function HostsFilterPublicKeyDialog({
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { addColumnFilter } = useHostsParams()

  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const { closeAndReset, handleOpenChange } = useDialogFormHelpers({
    form,
    onOpenChange,
    defaultValues,
  })

  const onSubmit = useCallback(
    async (values: Values) => {
      addColumnFilter({
        id: 'hostkey',
        value: values.publicKey,
      })
      closeAndReset()
    },
    [addColumnFilter, closeAndReset],
  )

  const onInvalid = useOnInvalid(fields)

  return (
    <Dialog
      title="Filter hosts by public key"
      trigger={trigger}
      open={open}
      onOpenChange={handleOpenChange}
      contentVariants={{
        className: 'w-[400px]',
      }}
      onSubmit={form.handleSubmit(onSubmit, onInvalid)}
    >
      <div className="flex flex-col gap-4">
        <FieldText name="publicKey" form={form} fields={fields} />
        <FormSubmitButton form={form}>Apply filter</FormSubmitButton>
      </div>
    </Dialog>
  )
}
