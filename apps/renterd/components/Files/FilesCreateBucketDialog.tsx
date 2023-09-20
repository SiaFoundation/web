import {
  Dialog,
  FormFieldFormik,
  FormSubmitButtonFormik,
  triggerErrorToast,
  triggerToast,
} from '@siafoundation/design-system'
import { useBucketCreate } from '@siafoundation/react-renterd'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const initialValues = {
  name: '',
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
})

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function FilesCreateBucketDialog({
  trigger,
  open,
  onOpenChange,
}: Props) {
  const bucketCreate = useBucketCreate()

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      const response = await bucketCreate.post({
        payload: {
          name: values.name,
        },
      })
      if (response.error) {
        triggerErrorToast(response.error)
      } else {
        triggerToast('Directory created.')
        actions.resetForm()
        onOpenChange(false)
      }
    },
  })

  return (
    <Dialog
      trigger={trigger}
      title="New bucket"
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
    >
      <div className="flex flex-col gap-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-4">
            <FormFieldFormik
              formik={formik}
              title="Name"
              name="name"
              placeholder="photos, backups, etc"
              autoComplete="off"
              type="text"
              variants={{
                size: 'medium',
              }}
            />
            <FormSubmitButtonFormik formik={formik} size="medium">
              Create
            </FormSubmitButtonFormik>
          </div>
        </form>
      </div>
    </Dialog>
  )
}
