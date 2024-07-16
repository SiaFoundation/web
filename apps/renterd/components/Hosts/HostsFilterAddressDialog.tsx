import {
  Dialog,
  FormFieldFormik,
  FormSubmitButtonFormik,
} from '@siafoundation/design-system'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDialog } from '../../contexts/dialog'
import { useHosts } from '../../contexts/hosts'

export function filterAddressContains(address: string) {
  return {
    id: 'addressContains',
    value: address,
    label: `address contains ${address}`,
  }
}

const initialValues = {
  address: '',
}

const validationSchema = Yup.object().shape({
  address: Yup.string().required('Required'),
})

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function HostsFilterAddressDialog({
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
      setFilter(filterAddressContains(values.address))
      formik.resetForm()
      closeDialog()
    },
  })

  return (
    <Dialog
      trigger={trigger}
      title="Filter by address"
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
            title="Address"
            name="address"
            placeholder="Partial match against domain or IP"
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
