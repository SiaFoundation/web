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
import { useAccountsParams } from '../components/Data/Accounts/useAccountsParams'

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

const defaultValues = {
  connectKey: '',
}

type Values = typeof defaultValues

const fields: ConfigFields<Values, never> = {
  connectKey: {
    type: 'text',
    title: 'Connect key',
    placeholder: 'Enter connect key',
    validation: {
      required: 'required',
    },
  },
}

export function AccountFilterConnectKeyDialog({
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { addColumnFilter } = useAccountsParams()

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
        id: 'connectkey',
        value: values.connectKey,
      })
      closeAndReset()
    },
    [addColumnFilter, closeAndReset],
  )

  const onInvalid = useOnInvalid(fields)

  return (
    <Dialog
      title="Filter accounts by connect key"
      trigger={trigger}
      open={open}
      onOpenChange={handleOpenChange}
      contentVariants={{
        className: 'w-[400px]',
      }}
      onSubmit={form.handleSubmit(onSubmit, onInvalid)}
    >
      <div className="flex flex-col gap-4">
        <FieldText name="connectKey" form={form} fields={fields} />
        <FormSubmitButton form={form}>Apply filter</FormSubmitButton>
      </div>
    </Dialog>
  )
}
