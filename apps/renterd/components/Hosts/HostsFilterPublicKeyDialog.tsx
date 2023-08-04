import {
  Dialog,
  FormFieldFormik,
  FormSubmitButtonFormik,
} from '@siafoundation/design-system'
import { useHosts } from '../../contexts/hosts'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDialog } from '../../contexts/dialog'

export function filterPublicKeyEquals(publicKey: string) {
  return {
    id: 'publicKeyEquals',
    value: publicKey,
    label: `public key is ${publicKey}`,
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

export function HostsFilterPublicKeyDialog({
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { closeDialog } = useDialog()
  const { setFilter } = useHosts()
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setFilter(filterPublicKeyEquals(values.publicKey))
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
          <FormFieldFormik
            formik={formik}
            title="Public key"
            name="publicKey"
            placeholder="ed25519:b050c0c6..."
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
