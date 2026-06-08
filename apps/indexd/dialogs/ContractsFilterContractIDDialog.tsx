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
import { useContractsParams } from '../components/Data/Contracts/useContractsParams'

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

const defaultValues = {
  contractID: '',
}

type Values = typeof defaultValues

const fields: ConfigFields<Values, never> = {
  contractID: {
    type: 'text',
    title: 'Contract ID',
    placeholder: 'f0d3a8c1...',
    validation: {
      required: 'required',
    },
  },
}

export function ContractsFilterContractIDDialog({
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { addColumnFilter } = useContractsParams()

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
        id: 'contractid',
        value: values.contractID,
      })
      closeAndReset()
    },
    [addColumnFilter, closeAndReset],
  )

  const onInvalid = useOnInvalid(fields)

  return (
    <Dialog
      title="Filter contracts by contract ID"
      trigger={trigger}
      open={open}
      onOpenChange={handleOpenChange}
      contentVariants={{
        className: 'w-[400px]',
      }}
      onSubmit={form.handleSubmit(onSubmit, onInvalid)}
    >
      <div className="flex flex-col gap-4">
        <FieldText name="contractID" form={form} fields={fields} />
        <FormSubmitButton form={form}>Apply filter</FormSubmitButton>
      </div>
    </Dialog>
  )
}
