import {
  Paragraph,
  Text,
  FormField,
  FormSubmitButton,
  Dialog,
} from '@siafoundation/design-system'
import { humanBytes } from '@siafoundation/sia-js'
import { cx } from 'class-variance-authority'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDialog } from '../contexts/dialog'

const gb = 1_000_000_000

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function StorageFolderResizeDialog({
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { id, closeDialog } = useDialog()

  // TODO: fetch current size
  const currentSize = 50
  const maxSize = 200
  const minSize = 1
  const rangeError = `Must be between ${humanBytes(
    minSize * gb
  )} and ${humanBytes(maxSize * gb)}`

  const formik = useFormik({
    initialValues: {
      path: id,
      size: currentSize,
    },
    validationSchema: Yup.object().shape({
      path: Yup.string().required('Required'),
      size: Yup.number()
        .required(rangeError)
        .max(maxSize, rangeError)
        .min(minSize, rangeError),
    }),
    onSubmit: (values, actions) => {
      actions.resetForm()
      closeDialog()
    },
  })
  const newSize = Number(formik.values.size || 0)

  return (
    <Dialog
      title="Resize Folder"
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
            Grow or shrink the storage folder. When growing a folder, make sure
            to check that there is enough space on-disk. When shrinking a
            storage folder, any data in the folder that needs to be moved will
            be placed into other storage folders, meaning that no data will be
            lost. If hostd is unable to migrate the data, an error will be
            returned and the operation will be stopped.
          </Paragraph>
          <FormField
            formik={formik}
            title="Path"
            name="path"
            placeholder="/usr/data/sia1"
            readOnly
            tabIndex={-1}
          />
          <FormField
            formik={formik}
            title="New size"
            name="size"
            type="number"
            units="GB"
            placeholder="1,000"
          />
          <div className="relative w-full h-1 rounded-lg bg-gray-300 dark:bg-graydark-300 overflow-hidden">
            <div
              className={cx(
                'absolute h-1 rounded-tl-lg rounded-bl-lg',
                currentSize > newSize
                  ? 'bg-red-800 dark:bg-red-700'
                  : 'bg-gray-800 dark:bg-graydark-800',
                currentSize < newSize ? 'z-10' : 'z-0'
              )}
              style={{
                width: `${(currentSize / maxSize) * 100}%`,
              }}
            />
            <div
              className={cx(
                'absolute h-1 rounded-tl-lg rounded-bl-lg',
                currentSize < newSize
                  ? 'bg-green-800 dark:bg-green-700'
                  : 'bg-gray-800 dark:bg-graydark-800',
                currentSize > newSize ? 'z-10' : 'z-0'
              )}
              style={{
                width: `${(Number(newSize || 0) / maxSize) * 100}%`,
              }}
            />
          </div>
          <Text>
            {currentSize < newSize
              ? `Increase by ${humanBytes((newSize - currentSize) * gb)}`
              : `Decrease by ${humanBytes((currentSize - newSize) * gb)}`}
          </Text>
          <FormSubmitButton formik={formik}>Resize</FormSubmitButton>
        </div>
      </form>
    </Dialog>
  )
}
