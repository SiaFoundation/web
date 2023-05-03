import {
  Paragraph,
  Text,
  FormField,
  FormSubmitButton,
  Dialog,
  Code,
  bytesToGB,
  GBToBytes,
  sectorsToGB,
  Label,
  GBToSectors,
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import {
  useSystemDirectory,
  useVolume,
  useVolumeResize,
} from '@siafoundation/react-hostd'
import { humanBytes } from '@siafoundation/sia-js'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import * as Yup from 'yup'
import { useDialog } from '../contexts/dialog'
import { VolumeSizeDiff } from './VolumeSizeDiff'

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

const minSizeGB = 10

function buildInitialValues(size: number) {
  return {
    size,
  }
}

function buildValidationSchema(maxSizeGB: number) {
  const rangeError = `Must be between ${humanBytes(
    GBToBytes(minSizeGB)
  )} and ${humanBytes(GBToBytes(maxSizeGB), { fixed: 3 })}`

  return Yup.object().shape({
    size: Yup.number()
      .required(rangeError)
      .min(minSizeGB, rangeError)
      .max(maxSizeGB, rangeError),
  })
}

export function VolumeResizeDialog({ trigger, open, onOpenChange }: Props) {
  const { id, closeDialog } = useDialog()
  const volume = useVolume({
    disabled: !id,
    params: {
      id,
    },
  })
  const dir = useSystemDirectory({
    disabled: !volume.data,
    params: {
      path: volume.data?.localPath.slice(1).split('/').slice(0, -1).join('/'),
    },
  })
  const volumeResize = useVolumeResize()

  const form = useFormik({
    initialValues: buildInitialValues(
      sectorsToGB(volume.data?.totalSectors || 0).toNumber()
    ),
    validationSchema: () =>
      Yup.lazy(() => {
        return buildValidationSchema(
          bytesToGB(dir.data?.totalBytes || 0).toNumber()
        )
      }),
    onSubmit: async (values) => {
      const response = await volumeResize.put({
        params: {
          id: Number(id),
        },
        payload: {
          maxSectors: GBToSectors(values.size).toNumber(),
        },
      })
      if (response.error) {
        triggerErrorToast(response.error)
      } else {
        triggerSuccessToast('Volume resizing initiated.')
        closeDialog()
      }
    },
  })
  useEffect(() => {
    const func = async () => {
      if (!volume.data) {
        return
      }
      try {
        // When new config is fetched, reset the form with the initial values
        await form.resetForm({
          values: buildInitialValues(
            sectorsToGB(volume.data.totalSectors || 0).toNumber()
          ),
        })
      } catch (e) {
        console.log(e)
      }
    }
    func()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume.data])

  const newSizeGB = form.values.size || 0
  const currentSizeGB = volume.data
    ? sectorsToGB(volume.data.totalSectors).toNumber()
    : 0
  const maxSizeGB = dir.data
    ? bytesToGB(dir.data.freeBytes).plus(currentSizeGB).toNumber()
    : 0

  const isNewSizeBigger = currentSizeGB < newSizeGB
  const isNewSizeDifferent = Math.abs(currentSizeGB - newSizeGB) >= 1

  return (
    <Dialog
      title="Resize Volume"
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      contentVariants={{
        className: 'max-w-[400px]',
      }}
    >
      <form onSubmit={form.handleSubmit}>
        <div className="flex flex-col gap-4">
          <Paragraph size="14">
            Grow or shrink the volume. When growing a volume, make sure to check
            that there is enough space on-disk. When shrinking a volume, any
            data that needs to be moved will be placed into other volumes,
            meaning that no data will be lost. If <Code>hostd</Code> is unable
            to migrate the data, an error will be returned and the operation
            will be stopped.
          </Paragraph>
          <div className="flex flex-col gap-1">
            <Label>Volume</Label>
            <Text font="mono" ellipsis>
              {volume.data?.localPath}
            </Text>
          </div>
          <FormField
            formik={form}
            title="New size"
            name="size"
            type="number"
            decimalsLimit={0}
            units="GB"
            placeholder="1,000"
          />
          <VolumeSizeDiff
            currentSizeGB={currentSizeGB}
            newSizeGB={newSizeGB}
            maxSizeGB={maxSizeGB}
            label={
              isNewSizeDifferent ? (
                <Text size="12" color="subtle">
                  {isNewSizeBigger
                    ? `Increase by ${humanBytes(
                        GBToBytes(newSizeGB - currentSizeGB)
                      )}`
                    : `Decrease by ${humanBytes(
                        GBToBytes(currentSizeGB - newSizeGB)
                      )}`}
                </Text>
              ) : (
                <Text size="12" color="subtle">
                  {`Current size is ${humanBytes(GBToBytes(currentSizeGB))}`}
                </Text>
              )
            }
          />
          <FormSubmitButton formik={form}>Resize</FormSubmitButton>
        </div>
      </form>
    </Dialog>
  )
}
