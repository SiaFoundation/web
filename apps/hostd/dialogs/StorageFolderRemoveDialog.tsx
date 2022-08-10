import {
  Flex,
  Text,
  DialogContent,
  Paragraph,
  Switch,
  InfoTip,
} from '@siafoundation/design-system'
import { humanBytes } from '@siafoundation/sia-js'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FormField, FormSubmitButton } from '../components/Form'
import { useDialog } from '../contexts/dialog'

export function StorageFolderRemoveDialog() {
  const { id, closeDialog } = useDialog()

  // TODO: fetch current size
  const size = 50_000_000
  const path = '/usr/data/sia1'

  const formik = useFormik({
    initialValues: {
      path: '',
    },
    validationSchema: Yup.object().shape({
      path: Yup.string()
        .required('Required')
        .equals([path], 'Directory path does not match'),
    }),
    onSubmit: (values, actions) => {
      actions.resetForm()
      closeDialog()
    },
  })

  return (
    <DialogContent
      title="Delete Folder"
      css={{
        maxWidth: '400px',
        overflow: 'hidden',
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Flex direction="column" gap="2">
          <Paragraph size="14">
            Are you sure you would like to remove the folder? hostd will lose{' '}
            <Text weight="semibold">{humanBytes(size)}</Text> of storage
            capacity. On large folders or slow disks your host may become
            inaccessible during removal. It is not recommended to remove or
            resize folders when contracts are about to expire.
          </Paragraph>
          <Paragraph size="14">
            Enter the folder path to confirm the removal.
          </Paragraph>
          <FormField
            formik={formik}
            title="Path"
            name="path"
            placeholder={path}
          />
          <Flex>
            <Switch size="2">Force</Switch>
            <InfoTip>
              <Flex css={{ maxWidth: '200px' }}>
                <Paragraph size="14">
                  Force deleting a folder will remove the folder even if the
                  data can not be relocated - this will result in severe data
                  loss and contract failure. Be extremely careful using this
                  option.
                </Paragraph>
              </Flex>
            </InfoTip>
          </Flex>
          <FormSubmitButton formik={formik}>Delete</FormSubmitButton>
        </Flex>
      </form>
    </DialogContent>
  )
}
