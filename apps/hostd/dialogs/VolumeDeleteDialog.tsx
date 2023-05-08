import {
  Text,
  Paragraph,
  Switch,
  InfoTip,
  FormFieldFormik,
  FormSubmitButtonFormik,
  Dialog,
  Code,
  sectorsToBytes,
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { useVolume, useVolumeDelete } from '@siafoundation/react-hostd'
import { humanBytes } from '@siafoundation/sia-js'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDialog } from '../contexts/dialog'

const initialValues = {
  path: '',
  force: false,
}

function buildValidationSchema(path: string) {
  return Yup.object().shape({
    path: Yup.string()
      .required('Required')
      .equals([path], 'Directory path does not match'),
    force: Yup.bool().required('required'),
  })
}

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function VolumeDeleteDialog({ trigger, open, onOpenChange }: Props) {
  const { id, closeDialog } = useDialog()

  const volumeDelete = useVolumeDelete()
  const volume = useVolume({
    disabled: !id,
    params: {
      id,
    },
  })
  // TODO: fetch current size
  const totalSize = sectorsToBytes(volume.data?.totalSectors)
  const usedSize = sectorsToBytes(volume.data?.usedSectors)
  const path = volume.data?.localPath

  const form = useFormik({
    initialValues,
    validationSchema: () =>
      Yup.lazy(() => {
        return buildValidationSchema(path)
      }),
    onSubmit: async (values) => {
      const response = await volumeDelete.delete({
        params: {
          id: volume.data?.ID,
          force: values.force,
        },
      })
      if (response.error) {
        triggerErrorToast(response.error)
      } else {
        triggerSuccessToast('Volume permanently deleted.')
        closeDialog()
      }
    },
  })

  return (
    <Dialog
      title="Delete Volume"
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      contentVariants={{
        className: 'w-[400px]',
      }}
    >
      <form onSubmit={form.handleSubmit}>
        <div className="flex flex-col gap-4">
          <Paragraph size="14">
            Are you sure you would like to delete the volume?
          </Paragraph>
          <Paragraph size="14">
            <Code>hostd</Code> will move{' '}
            <Text weight="semibold">{humanBytes(usedSize)}</Text> of stored data
            and will lose <Text weight="semibold">{humanBytes(totalSize)}</Text>{' '}
            of storage capacity. It is not recommended to remove or resize
            volumes when contracts are about to expire.
          </Paragraph>
          <Paragraph size="14">
            Enter the volume path to confirm the removal.
          </Paragraph>
          <FormFieldFormik
            formik={form}
            title="Path"
            name="path"
            placeholder={path}
          />
          <div className="flex gap-1">
            <Switch
              size="medium"
              checked={form.values.force}
              onCheckedChange={(val) => form.setFieldValue('force', val)}
            >
              Force
            </Switch>
            <InfoTip>
              <div className="flex gap-1 max-w-[200px]">
                <Paragraph size="14">
                  Force deleting a volume will remove the volume even if the
                  data can NOT be relocated - this will result in severe data
                  loss and contract failure. Be extremely careful when using
                  this option.
                </Paragraph>
              </div>
            </InfoTip>
          </div>
          <FormSubmitButtonFormik variant="red" formik={form}>
            Delete
          </FormSubmitButtonFormik>
        </div>
      </form>
    </Dialog>
  )
}
