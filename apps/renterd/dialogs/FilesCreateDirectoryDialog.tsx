import {
  Dialog,
  FormFieldFormik,
  FormSubmitButtonFormik,
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { useObjectUpload } from '@siafoundation/renterd-react'
import { useFilesManager } from '../contexts/filesManager'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { bucketAndKeyParamsFromPath } from '../lib/paths'

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
  const { activeDirectoryPath } = useFilesManager()
  const upload = useObjectUpload()

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, actions) => {
      const response = await upload.put({
        params: bucketAndKeyParamsFromPath(
          activeDirectoryPath + values.name + '/'
        ),
        payload: null,
      })
      if (response.error) {
        triggerErrorToast({
          title: 'Error creating directory',
          body: response.error,
        })
      } else {
        triggerSuccessToast({ title: 'Directory created' })
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
