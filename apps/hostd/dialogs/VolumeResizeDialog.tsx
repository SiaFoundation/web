import {
  Paragraph,
  Text,
  Dialog,
  Code,
  Label,
  triggerErrorToast,
  triggerSuccessToast,
  FormSubmitButton,
  FieldNumber,
  ConfigFields,
  useOnInvalid,
  useDialogFormHelpers,
} from '@siafoundation/design-system'
import {
  useSystemDirectory,
  useVolume,
  useVolumeResize,
} from '@siafoundation/hostd-react'
import {
  bytesToGB,
  GBToBytes,
  humanBytes,
  sectorsToGB,
  GBToSectors,
} from '@siafoundation/units'
import BigNumber from 'bignumber.js'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useDialog } from '../contexts/dialog'
import { useHostOSPathSeparator } from '../hooks/useHostOSPathSeparator'
import { VolumeSizeDiff } from './VolumeSizeDiff'

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

const minSizeGB = new BigNumber(10)

function getDefaultValues(size: BigNumber) {
  return {
    size,
  }
}

type Values = ReturnType<typeof getDefaultValues>

function getFields(
  minSizeGB: number,
  maxSizeGB: number
): ConfigFields<Values, never> {
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
          between: (value?: BigNumber) => {
            const error = `Must be between ${humanBytes(
              GBToBytes(minSizeGB)
            )} and ${humanBytes(GBToBytes(maxSizeGB), { fixed: 3 })}`
            return (value?.lte(maxSizeGB) && value?.gte(minSizeGB)) || error
          },
        },
      },
    },
  }
}

export function VolumeResizeDialog({ trigger, open, onOpenChange }: Props) {
  const { id } = useDialog()
  const separator = useHostOSPathSeparator()
  const volume = useVolume({
    disabled: !open || !id,
    params: {
      id,
    },
  })
  const dir = useSystemDirectory({
    disabled: !open || !volume.data,
    params: {
      path: volume.data?.localPath
        .split(separator)
        .slice(0, -1)
        .join(separator),
    },
  })
  const volumeResize = useVolumeResize()

  const defaultValues = getDefaultValues(
    volume.data ? sectorsToGB(volume.data.totalSectors) : new BigNumber(0)
  )

  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const size = form.watch('size')

  const { closeAndReset, handleOpenChange } = useDialogFormHelpers({
    form,
    onOpenChange,
    defaultValues,
    initKey: [volume.isLoading],
  })

  const onSubmit = useCallback(
    async (values: Values) => {
      const response = await volumeResize.put({
        params: {
          id: Number(id),
        },
        payload: {
          maxSectors: GBToSectors(values.size).toNumber(),
        },
      })
      if (response.error) {
        triggerErrorToast({
          title: 'Error resizing volume',
          body: response.error,
        })
      } else {
        triggerSuccessToast({ title: 'Volume resizing initiated' })
        closeAndReset()
      }
    },
    [id, volumeResize, closeAndReset]
  )

  const newSizeGB = useMemo(() => size || new BigNumber(0), [size])
  const currentSizeGB = useMemo(
    () =>
      volume.data ? sectorsToGB(volume.data.totalSectors) : new BigNumber(0),
    [volume.data]
  )
  const freeSizeGB = useMemo(
    () => (dir.data ? bytesToGB(dir.data.freeBytes) : new BigNumber(0)),
    [dir.data]
  )
  const maxSizeGB = useMemo(
    () => currentSizeGB.plus(freeSizeGB),
    [currentSizeGB, freeSizeGB]
  )

  const isNewSizeBigger = currentSizeGB.lt(newSizeGB)
  const isNewSizeDifferent = currentSizeGB.minus(newSizeGB).abs().gte(1)

  const fields = useMemo(
    () => getFields(minSizeGB.toNumber(), maxSizeGB.toNumber()),
    [maxSizeGB]
  )

  const onInvalid = useOnInvalid(fields)

  return (
    <Dialog
      title="Resize Volume"
      trigger={trigger}
      open={open}
      onOpenChange={handleOpenChange}
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
        <FieldNumber name="size" form={form} fields={fields} />
        <VolumeSizeDiff
          currentSizeGB={currentSizeGB.toNumber()}
          newSizeGB={newSizeGB.toNumber()}
          maxSizeGB={maxSizeGB.toNumber()}
          label={
            isNewSizeDifferent ? (
              <Text size="12" color="subtle">
                {isNewSizeBigger
                  ? `Increase by ${humanBytes(
                      GBToBytes(newSizeGB.minus(currentSizeGB))
                    )}`
                  : `Decrease by ${humanBytes(
                      GBToBytes(currentSizeGB.minus(newSizeGB))
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
