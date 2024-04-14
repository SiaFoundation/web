import {
  Text,
  Paragraph,
  InfoTip,
  Dialog,
  Code,
  sectorsToBytes,
  triggerErrorToast,
  triggerSuccessToast,
  ConfigFields,
  useOnInvalid,
  FormSubmitButton,
  FieldSwitch,
  FieldText,
} from '@siafoundation/design-system'
import { useVolume, useVolumeDelete } from '@siafoundation/hostd-react'
import { humanBytes } from '@siafoundation/units'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useDialog } from '../contexts/dialog'

const defaultValues = {
  path: '',
  force: false,
}

function getFields(path: string): ConfigFields<typeof defaultValues, never> {
  return {
    path: {
      type: 'text',
      title: 'Path',
      placeholder: path,
      validation: {
        required: 'required',
        validate: {
          equals: (value) => value === path || 'directory path does not match',
        },
      },
    },
    force: {
      type: 'boolean',
      title: 'Force',
      validation: {},
    },
  }
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
  const totalSize = sectorsToBytes(volume.data?.totalSectors)
  const usedSize = sectorsToBytes(volume.data?.usedSectors)
  const path = volume.data?.localPath

  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const onSubmit = useCallback(
    async (values: typeof defaultValues) => {
      const response = await volumeDelete.delete({
        params: {
          id: volume.data?.id,
          force: values.force,
        },
      })
      if (response.error) {
        triggerErrorToast({
          title: 'Error deleting volume',
          body: response.error,
        })
      } else {
        triggerSuccessToast({ title: 'Volume permanently deleted' })
        form.reset()
        closeDialog()
      }
    },
    [form, volume.data, volumeDelete, closeDialog]
  )

  const fields = useMemo(() => getFields(path), [path])

  const onInvalid = useOnInvalid(fields)

  return (
    <Dialog
      title="Delete Volume"
      trigger={trigger}
      open={open}
      onOpenChange={(val) => {
        if (!val) {
          form.reset(defaultValues)
        }
        onOpenChange(val)
      }}
      contentVariants={{
        className: 'w-[400px]',
      }}
      onSubmit={form.handleSubmit(onSubmit, onInvalid)}
    >
      <div className="flex flex-col gap-4">
        <Paragraph size="14">
          Are you sure you would like to delete the volume?
        </Paragraph>
        <Paragraph size="14">
          <Code>hostd</Code> will move{' '}
          <Text weight="semibold">{humanBytes(usedSize)}</Text> of stored data
          and will lose <Text weight="semibold">{humanBytes(totalSize)}</Text>{' '}
          of storage capacity. It is not recommended to remove or resize volumes
          when contracts are about to expire.
        </Paragraph>
        <Paragraph size="14">
          Enter the volume path to confirm the removal.
        </Paragraph>
        <FieldText name="path" form={form} fields={fields} />
        <div className="flex gap-1">
          <FieldSwitch name="force" size="medium" form={form} fields={fields} />
          <InfoTip>
            <div className="flex gap-1 max-w-[200px]">
              <Paragraph size="14">
                Force deleting a volume will remove the volume even if the data
                can NOT be relocated - this will result in severe data loss and
                contract failure. Be extremely careful when using this option.
              </Paragraph>
            </div>
          </InfoTip>
        </div>
        <FormSubmitButton variant="red" form={form}>
          Delete
        </FormSubmitButton>
      </div>
    </Dialog>
  )
}
