import {
  Dialog,
  FormField,
  FormSubmitButton,
  truncate,
} from '@siafoundation/design-system'
import { useContracts } from '../../contexts/contracts'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDialog } from '../../contexts/dialog'
import { ContractData } from '../../contexts/contracts/types'

export function publicKeyContainsFilter(publicKey: string) {
  return {
    id: 'publicKeyContains',
    value: publicKey,
    label: `public key contains ${truncate(publicKey, 20)}`,
    fn: (d: ContractData) => {
      return d.hostKey.includes(publicKey)
    },
  }
}

const initialValues = {
  publicKey: '',
}

const validationSchema = Yup.object().shape({
  publicKey: Yup.string().required('Required'),
})

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function ContractsFilterPublicKeyDialog({
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
      setFilter(publicKeyContainsFilter(values.publicKey))
      formik.resetForm()
      closeDialog()
    },
  })

  return (
    <Dialog
      trigger={trigger}
      title="Filter by public key"
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
          <FormField
            formik={formik}
            title="Public key"
            name="publicKey"
            placeholder="ed25519:02aabd26e627fd..."
            autoComplete="off"
            type="text"
            variants={{
              size: 'medium',
            }}
          />
          <FormSubmitButton formik={formik} size="medium">
            Filter
          </FormSubmitButton>
        </div>
      </div>
    </Dialog>
  )
}
