import {
  Dialog,
  FormFieldFormik,
  FormSubmitButtonFormik,
  ServerFilterItem,
} from '@siafoundation/design-system'
import { useContracts } from '../contexts/contracts'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDialog } from '../contexts/dialog'

export function filterContractId(contractId: string): ServerFilterItem {
  return {
    id: 'filterContractId',
    value: contractId,
    label: `contract ID is ${contractId}`,
  }
}

const initialValues = {
  contractId: '',
}

const validationSchema = Yup.object().shape({
  contractId: Yup.string().required('Required'),
})

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function ContractsFilterContractIdDialog({
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { closeDialog } = useDialog()
  const { setFilter } = useContracts()
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setFilter(filterContractId(values.contractId))
      formik.resetForm()
      closeDialog()
    },
  })

  return (
    <Dialog
      trigger={trigger}
      title="Filter by contract ID"
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          formik.resetForm()
        }
        onOpenChange(open)
      }}
      contentVariants={{
        className: 'w-[400px]',
      }}
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <FormFieldFormik
            formik={formik}
            title="Contract ID"
            name="contractId"
            placeholder="Exact match for contract ID"
            autoComplete="off"
            type="text"
            variants={{
              size: 'medium',
            }}
          />
          <FormSubmitButtonFormik formik={formik} size="medium">
            Filter
          </FormSubmitButtonFormik>
        </div>
      </div>
    </Dialog>
  )
}
