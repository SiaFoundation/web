import {
  Paragraph,
  Text,
  FormFieldFormik,
  FormSubmitButtonFormik,
  Dialog,
  bytesToGB,
  GBToBytes,
  GBToSectors,
  triggerErrorToast,
  triggerSuccessToast,
  Tooltip,
  FieldLabelAndErrorFormik,
} from '@siafoundation/design-system'
import { useSystemDirectory, useVolumeCreate } from '@siafoundation/react-hostd'
import { humanBytes } from '@siafoundation/sia-js'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { DirectorySelectMenu } from '../components/DirectorySelectMenu'
import { useDialog } from '../contexts/dialog'
import { VolumeSizeDiff } from './VolumeSizeDiff'

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

const minSizeGB = 10

function buildInitialValues(size?: number, name?: string, path?: string) {
  return {
    size,
    name,
    path,
  }
}

function buildValidationSchema(maxSizeGB: number) {
  let error = `Must be between ${humanBytes(
    GBToBytes(minSizeGB)
  )} and ${humanBytes(GBToBytes(maxSizeGB), { fixed: 3 })}`
  if (maxSizeGB < minSizeGB) {
    error = 'Not enough space in directory'
  }

  return Yup.object().shape({
    name: Yup.string().required('required'),
    path: Yup.string().required('required'),
    size: Yup.number()
      .required(error)
      .min(minSizeGB, error)
      .max(maxSizeGB, error),
  })
}

export function VolumeAddDialog({ trigger, open, onOpenChange }: Props) {
  const { closeDialog } = useDialog()
  const volumeAdd = useVolumeCreate()

  const form = useFormik({
    initialValues: buildInitialValues(),
    validationSchema: () =>
      Yup.lazy(() => {
        return buildValidationSchema(
          bytesToGB(selectedDir.data?.freeBytes || 0).toNumber()
        )
      }),
    onSubmit: async (values) => {
      const response = await volumeAdd.post({
        payload: {
          localPath: getFullPath(values),
          maxSectors: GBToSectors(values.size).toNumber(),
        },
      })
      if (response.error) {
        triggerErrorToast(response.error)
      } else {
        triggerSuccessToast('New volume created.')
        closeDialog()
      }
    },
  })

  const selectedDir = useSystemDirectory({
    disabled: !form.values.path,
    params: {
      path: form.values.path?.slice(1).split('/').slice(0, -1).join('/'),
    },
  })

  const newSizeGB = form.values.size || 0
  const freeSizeGB = selectedDir.data
    ? bytesToGB(selectedDir.data.freeBytes).toNumber()
    : 0

  const fullPath = getFullPath(form.values)

  return (
    <Dialog
      title="Create Volume"
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
            Create a new volume. Select a system directory and specific the size
            of the volume.
          </Paragraph>
          <FormFieldFormik
            formik={form}
            title="Name"
            name="name"
            placeholder="data.dat"
          />
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <FieldLabelAndErrorFormik
                formik={form}
                title="Location"
                name="path"
              />
              <div className="flex justify-between gap-1">
                {form.values.path ? (
                  <Text size="14" font="mono" ellipsis>
                    {fullPath}
                  </Text>
                ) : (
                  <Text size="14" color="verySubtle" ellipsis>
                    Select a directory below
                  </Text>
                )}
                <Tooltip content="Available space">
                  <Text size="14" color="verySubtle" noWrap>
                    {humanBytes(GBToBytes(freeSizeGB))}
                  </Text>
                </Tooltip>
              </div>
            </div>
            <DirectorySelectMenu
              onChange={(path) => form.setFieldValue('path', path)}
            />
          </div>
          <FormFieldFormik
            formik={form}
            title="Size"
            name="size"
            type="number"
            decimalsLimit={0}
            units="GB"
            placeholder="1,000"
          />
          <VolumeSizeDiff
            newSizeGB={newSizeGB}
            currentSizeGB={0}
            maxSizeGB={freeSizeGB}
          />
          <FormSubmitButtonFormik formik={form}>Create</FormSubmitButtonFormik>
        </div>
      </form>
    </Dialog>
  )
}

function getFullPath({ name, path }: { name: string; path: string }): string {
  return path === '/' ? `/${name}` : `${path}${name ? `/${name}` : ''}`
}
