import {
  Text,
  Paragraph,
  Switch,
  InfoTip,
  FormField,
  FormSubmitButton,
  Dialog,
} from '@siafoundation/design-system'
import { humanBytes } from '@siafoundation/sia-js'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDialog } from '../contexts/dialog'

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function StorageFolderRemoveDialog({
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { closeDialog } = useDialog()

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
    <Dialog
      title="Delete Folder"
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      contentVariants={{
        className: 'max-w-[400px]',
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-4">
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
          <div className="flex gap-1">
            <Switch size="medium">Force</Switch>
            <InfoTip>
              <div className="flex gap-1 max-w-[200px]">
                <Paragraph size="14">
                  Force deleting a folder will remove the folder even if the
                  data can not be relocated - this will result in severe data
                  loss and contract failure. Be extremely careful using this
                  option.
                </Paragraph>
              </div>
            </InfoTip>
          </div>
          <FormSubmitButton formik={formik}>Delete</FormSubmitButton>
        </div>
      </form>
    </Dialog>
  )
}
