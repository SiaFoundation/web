import {
  Paragraph,
  Dialog,
  bytesToGB,
  GBToBytes,
  GBToSectors,
  triggerErrorToast,
  triggerSuccessToast,
  FieldNumber,
  FieldText,
  FormSubmitButton,
  ConfigFields,
  useOnInvalid,
} from '@siafoundation/design-system'
import { useSystemDirectory, useVolumeCreate } from '@siafoundation/react-hostd'
import { humanBytes } from '@siafoundation/sia-js'
import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'
import { DirectorySelectMenu } from '../components/DirectorySelectMenu'
import { useDialog } from '../contexts/dialog'
import { useHostOSPathSeparator } from '../hooks/useHostOSPathSeparator'
import { joinPaths } from '../lib/system'
import { VolumeSizeDiff } from './VolumeSizeDiff'

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

const minSizeGB = 10

const defaultValues = {
  size: undefined as BigNumber | undefined,
  name: '',
  path: '~',
  immediatePath: '~',
}

function getFields(
  minSizeGB: number,
  maxSizeGB: number
): ConfigFields<typeof defaultValues, never> {
  return {
    name: {
      type: 'text',
      title: 'Name',
      placeholder: 'data.dat',
      validation: {
        required: 'required',
      },
    },
    immediatePath: {
      type: 'text',
      title: 'Location',
      placeholder: 'Enter a directory or select one below',
      validation: {
        required: 'required',
        validate: {},
      },
    },
    path: {
      type: 'text',
      title: 'Location',
      validation: {
        required: 'required',
        validate: {
          req: (value) => value !== '\\' || 'directory within a drive required',
        },
      },
    },
    size: {
      type: 'number',
      title: 'Size',
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
          nospace: () =>
            maxSizeGB > minSizeGB || 'not enough space in directory',
        },
      },
    },
  }
}

export function VolumeCreateDialog({ trigger, open, onOpenChange }: Props) {
  const { closeDialog } = useDialog()
  const volumeAdd = useVolumeCreate()
  const separator = useHostOSPathSeparator()

  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const path = form.watch('path')
  const immediatePath = form.watch('immediatePath')
  const name = form.watch('name')
  const size = form.watch('size')

  // after typing stops update path to immediate path value
  const syncPath = useDebouncedCallback(() => {
    if (path !== immediatePath) {
      form.setValue('path', immediatePath)
    }
  }, 500)

  useEffect(() => {
    syncPath()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediatePath])

  // when path changes instantly update immediate path
  useEffect(() => {
    if (path !== immediatePath) {
      form.setValue('immediatePath', path)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])

  const onSubmit = useCallback(
    async (values) => {
      const response = await volumeAdd.post({
        payload: {
          localPath: joinPaths(path, name, separator),
          maxSectors: GBToSectors(values.size).toNumber(),
        },
      })
      if (response.error) {
        triggerErrorToast(response.error)
      } else {
        triggerSuccessToast('New volume created.')
        form.reset(defaultValues)
        closeDialog()
      }
    },
    [form, volumeAdd, closeDialog, name, path, separator]
  )

  const selectedDir = useSystemDirectory({
    disabled: !open,
    params: {
      path: path === '' ? separator : path,
    },
    config: {
      swr: {
        // do not retry because 404 simply means directory does not exist
        shouldRetryOnError: false,
      },
    },
  })

  useEffect(() => {
    if (selectedDir.error) {
      form.setError('immediatePath', {
        message: 'Directory does not exist',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDir.error])

  // Redirect ~ to the absolute path
  useEffect(() => {
    if (!selectedDir.data) {
      return
    }
    if (selectedDir.data.path !== path) {
      form.setValue('path', selectedDir.data.path)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDir.data])

  const newSizeGB = size?.toNumber() || 0
  const freeSizeGB = selectedDir.data
    ? bytesToGB(selectedDir.data.freeBytes).toNumber()
    : 0

  const maxSizeGB = bytesToGB(selectedDir.data?.freeBytes || 0).toNumber()

  const fields = useMemo(() => getFields(minSizeGB, maxSizeGB), [maxSizeGB])

  const onInvalid = useOnInvalid(fields)

  form.register('path', fields.path.validation)

  return (
    <Dialog
      title="Create Volume"
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
      controls={
        <div className="flex flex-col gap-1">
          <FormSubmitButton form={form}>Create</FormSubmitButton>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <Paragraph size="14">
          Create a new volume. Select a system directory and specific the size
          of the volume.
        </Paragraph>
        <FieldText name="name" form={form} fields={fields} />
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <FieldText name="immediatePath" form={form} fields={fields} />
          </div>
          <DirectorySelectMenu
            path={path}
            dir={selectedDir}
            onChange={(path) =>
              form.setValue('path', path, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              })
            }
          />
        </div>
        <FieldNumber name="size" form={form} fields={fields} />
        <VolumeSizeDiff
          newSizeGB={newSizeGB}
          currentSizeGB={0}
          maxSizeGB={freeSizeGB}
        />
      </div>
    </Dialog>
  )
}
