import {
  Dialog,
  FormField,
  FormSubmitButton,
  triggerErrorToast,
  triggerToast,
} from '@siafoundation/design-system'
import { useObjectUpload } from '@siafoundation/react-core'
import { useFiles } from '../../contexts/files'
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

export function FilesCreateDirectoryDialog({
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { activeDirectoryPath } = useFiles()
  const upload = useObjectUpload()

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      const response = await upload.put({
        params: {
          key: encodeURIComponent(
            activeDirectoryPath.slice(1) + values.name + '/'
          ),
        },
        payload: null,
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
      title="New directory"
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
            <FormField
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
            <FormSubmitButton formik={formik} size="medium">
              Create
            </FormSubmitButton>
          </div>
        </form>
      </div>
    </Dialog>
  )
}
