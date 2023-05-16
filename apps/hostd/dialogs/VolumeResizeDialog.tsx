import {
  Paragraph,
  Text,
  Dialog,
  Code,
  bytesToGB,
  GBToBytes,
  sectorsToGB,
  Label,
  GBToSectors,
  triggerErrorToast,
  triggerSuccessToast,
  FormSubmitButton,
  FieldNumber,
  ConfigFields,
  useOnInvalid,
} from '@siafoundation/design-system'
import {
  useSystemDirectory,
  useVolume,
  useVolumeResize,
} from '@siafoundation/react-hostd'
import { humanBytes } from '@siafoundation/sia-js'
import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useDialog } from '../contexts/dialog'
import { useHostOSPathSeparator } from '../hooks/useHostOSPathSeparator'
import { VolumeSizeDiff } from './VolumeSizeDiff'

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

const minSizeGB = 10

const defaultValues = {
  size: undefined as BigNumber | undefined,
}

function getFields(
  minSizeGB: number,
  maxSizeGB: number
): ConfigFields<typeof defaultValues, never> {
  return {
    size: {
      type: 'number',
      title: 'New size',
      decimalsLimit: 0,
      units: 'GB',
      placeholder: '1,000',
      validation: {
        required: 'required',
        validate: {
          between: (value) => {
            const error = `Must be between ${humanBytes(
              GBToBytes(minSizeGB)
            )} and ${humanBytes(GBToBytes(maxSizeGB), { fixed: 3 })}`
            return (value <= maxSizeGB && value >= minSizeGB) || error
          },
        },
      },
    },
  }
}

export function VolumeResizeDialog({ trigger, open, onOpenChange }: Props) {
  const { id, closeDialog } = useDialog()
  const separator = useHostOSPathSeparator()
  const volume = useVolume({
    disabled: !id,
    params: {
      id,
    },
  })
  const dir = useSystemDirectory({
    disabled: !volume.data,
    params: {
      path: volume.data?.localPath
        .split(separator)
        .slice(0, -1)
        .join(separator),
    },
  })
  const volumeResize = useVolumeResize()

  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const size = form.watch('size')

  const onSubmit = useCallback(
    async (values) => {
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
        form.reset(defaultValues)
        closeDialog()
      }
    },
    [form, id, volumeResize, closeDialog]
  )

  useEffect(() => {
    if (!volume.data) {
      return
    }
    form.reset(defaultValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume.data])

  const newSizeGB = size?.toNumber()
  const currentSizeGB = volume.data
    ? sectorsToGB(volume.data.totalSectors).toNumber()
    : 0

  const maxSizeGB = dir.data ? bytesToGB(dir.data.totalBytes).toNumber() : 0

  const isNewSizeBigger = currentSizeGB < newSizeGB
  const isNewSizeDifferent = Math.abs(currentSizeGB - newSizeGB) >= 1

  const fields = useMemo(() => getFields(minSizeGB, maxSizeGB), [maxSizeGB])

  const onInvalid = useOnInvalid(fields)

  return (
    <Dialog
      title="Resize Volume"
      trigger={trigger}
      open={open}
      onOpenChange={(val) => {
        if (!val) {
          form.reset(defaultValues)
        }
        onOpenChange(val)
      }}
      contentVariants={{
        className: 'max-w-[400px]',
      }}
      onSubmit={form.handleSubmit(onSubmit, onInvalid)}
      controls={
        <div className="flex flex-col gap-1">
          <FormSubmitButton form={form}>Resize</FormSubmitButton>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <Paragraph size="14">
          Grow or shrink the volume. When growing a volume, make sure to check
          that there is enough space on-disk. When shrinking a volume, any data
          that needs to be moved will be placed into other volumes, meaning that
          no data will be lost. If <Code>hostd</Code> is unable to migrate the
          data, an error will be returned and the operation will be stopped.
        </Paragraph>
        <div className="flex flex-col gap-1">
          <Label>Volume</Label>
          <Text font="mono" ellipsis>
            {volume.data?.localPath}
          </Text>
        </div>
        <FieldNumber name="size" form={form} field={fields.size} />
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
      </div>
    </Dialog>
  )
}
