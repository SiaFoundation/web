import {
  Paragraph,
  FormField,
  FormSubmitButton,
  Dialog,
} from '@siafoundation/design-system'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDialog } from '../contexts/dialog'

const initialValues = {
  path: '',
  size: undefined,
}

const validationSchema = Yup.object().shape({
  path: Yup.string().required('Required'),
  size: Yup.number()
    .required('Required')
    .max(100_000_000, '100GB max')
    .min(100, '100KB min'),
})

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function StorageFolderAddDialog({ trigger, open, onOpenChange }: Props) {
  const { closeDialog } = useDialog()
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, actions) => {
      console.log(values)
      actions.resetForm()
      closeDialog()
    },
  })

  return (
    <Dialog
      title="Add Folder"
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      contentVariants={{
        className: 'max-w-[400px]',
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-4">
          <Paragraph size="14">Add a data storage location.</Paragraph>
          <FormField
            formik={formik}
            title="Path"
            name="path"
            placeholder="/usr/data/sia1"
          />
          <FormField
            formik={formik}
            title="Size"
            name="size"
            type="number"
            units="GB"
            placeholder="1,000"
          />
          <FormSubmitButton formik={formik}>Add</FormSubmitButton>
        </div>
      </form>
    </Dialog>
  )
}
