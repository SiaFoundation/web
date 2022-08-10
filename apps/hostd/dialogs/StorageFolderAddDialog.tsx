import { Flex, DialogContent, Paragraph } from '@siafoundation/design-system'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FormField, FormSubmitButton } from '../components/Form'
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

export function StorageFolderAddDialog() {
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
    <DialogContent
      title="Add Folder"
      css={{
        maxWidth: '400px',
        overflow: 'hidden',
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Flex direction="column" gap="2">
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
        </Flex>
      </form>
    </DialogContent>
  )
}
