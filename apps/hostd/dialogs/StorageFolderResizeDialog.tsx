import {
  Flex,
  DialogContent,
  Paragraph,
  Box,
  Text,
} from '@siafoundation/design-system'
import { humanBytes } from '@siafoundation/sia-js'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FormField, FormSubmitButton } from '../components/Form'
import { useDialog } from '../contexts/dialog'

const gb = 1_000_000_000

export function StorageFolderResizeDialog() {
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
    <DialogContent
      title={'Resize Folder'}
      css={{
        maxWidth: '400px',
        overflow: 'hidden',
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Flex direction="column" gap="2">
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
          <Box
            css={{
              position: 'relative',
              width: '100%',
              height: '$0-5',
              borderRadius: '$pill',
              backgroundColor: '$slate4',
              overflow: 'hidden',
            }}
          >
            <Box
              css={{
                zIndex: currentSize < newSize ? 1 : 0,
                position: 'absolute',
                width: `${(currentSize / maxSize) * 100}%`,
                height: '$0-5',
                borderRadius: '$pill 0 0 $pill',
                backgroundColor: currentSize > newSize ? '$red9' : '$gray9',
              }}
            />
            <Box
              css={{
                zIndex: currentSize > newSize ? 1 : 0,
                position: 'absolute',
                width: `${(Number(newSize || 0) / maxSize) * 100}%`,
                height: '$0-5',
                borderRadius: '$pill 0 0 $pill',
                backgroundColor: currentSize < newSize ? '$green9' : '$gray9',
              }}
            />
          </Box>
          <Text>
            {currentSize < newSize
              ? `Increase by ${humanBytes((newSize - currentSize) * gb)}`
              : `Decrease by ${humanBytes((currentSize - newSize) * gb)}`}
          </Text>
          <FormSubmitButton formik={formik}>Resize</FormSubmitButton>
        </Flex>
      </form>
    </DialogContent>
  )
}
