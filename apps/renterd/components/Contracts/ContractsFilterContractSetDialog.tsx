import {
  type ConfigFields,
  Dialog,
  FieldSelect,
  FormSubmitButton,
  useDialogFormHelpers,
  useOnInvalid,
} from '@siafoundation/design-system'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useContracts } from '../../contexts/contracts'
import type { ContractData } from '../../contexts/contracts/types'

export function contractSetsIncludeFilter(contractSet: string) {
  return {
    id: 'contractSetsInclude',
    value: contractSet,
    label: `contract in set ${contractSet}`,
    fn: (d: ContractData) => {
      return !!d.contractSets?.includes(contractSet)
    },
  }
}

function getDefaultValues(defaultContractSet?: string) {
  return {
    contractSet: defaultContractSet,
  }
}

type Values = ReturnType<typeof getDefaultValues>

function getFields({
  contractSets,
}: {
  contractSets: string[]
}): ConfigFields<Values, never> {
  return {
    contractSet: {
      type: 'select',
      title: 'Contract set',
      options: contractSets.map((contractSet) => ({
        label: contractSet,
        value: contractSet,
      })),
      placeholder: 'autopilot',
      validation: {
        required: 'required',
      },
    },
  }
}

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function ContractsFilterContractSetDialog({
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { setFilter, contractSets } = useContracts()

  const defaultValues = getDefaultValues(contractSets.data?.[0])
  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const { handleOpenChange, closeAndReset } = useDialogFormHelpers({
    form,
    onOpenChange,
    defaultValues,
  })

  const fields = getFields({ contractSets: contractSets.data || [] })

  const onValid = useCallback(
    (values: Values) => {
      setFilter(contractSetsIncludeFilter(values.contractSet!))
      closeAndReset()
    },
    [setFilter, closeAndReset],
  )

  const onInvalid = useOnInvalid(fields)

  return (
    <Dialog
      trigger={trigger}
      title="Filter by contract set"
      open={open}
      onOpenChange={handleOpenChange}
      contentVariants={{
        className: 'w-[400px]',
      }}
      onSubmit={form.handleSubmit(onValid, onInvalid)}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <FieldSelect form={form} fields={fields} name="contractSet" />
          <FormSubmitButton form={form} size="medium">
            Filter
          </FormSubmitButton>
        </div>
      </div>
    </Dialog>
  )
}
