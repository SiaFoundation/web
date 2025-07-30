import {
  Dialog,
  triggerErrorToast,
  triggerSuccessToast,
  ConfigFields,
  useOnInvalid,
  FormSubmitButton,
  FieldText,
  useDialogFormHelpers,
} from '@siafoundation/design-system'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useObjectsRename } from '@siafoundation/renterd-react'
import { getFilename, isDirectory } from '../lib/paths'
import { getRenameFileRenameParams } from '../lib/rename'
import { useFilesDirectory } from '../contexts/filesDirectory'
import { useFilesFlat } from '../contexts/filesFlat'
import { useDialog } from '../contexts/dialog'

function getDefaultValues(currentName: string) {
  return {
    name: currentName,
  }
}

type Values = ReturnType<typeof getDefaultValues>

function getFields({
  currentName,
}: {
  currentName: string
}): ConfigFields<Values, never> {
  return {
    name: {
      type: 'text',
      title: 'Name',
      placeholder: currentName,
      validation: {
        required: 'required',
        validate: {
          noSlash: (val) => {
            if (val.includes('/')) {
              return 'Name cannot contain slashes'
            }
            return true
          },
        },
      },
    },
  }
}

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

// Renames a file or directory.
export function FileRenameDialog({ trigger, open, onOpenChange }: Props) {
  const { id: originalPath } = useDialog()
  const { refresh: refreshDirectory } = useFilesDirectory()
  const { refresh: refreshFlat } = useFilesFlat()

  const name = useMemo(() => {
    const name = getFilename(originalPath || '')
    return name.endsWith('/') ? name.slice(0, -1) : name
  }, [originalPath])
  const defaultValues = useMemo(() => getDefaultValues(name), [name])

  const objectRename = useObjectsRename()
  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const { handleOpenChange, closeAndReset } = useDialogFormHelpers({
    form,
    onOpenChange,
    defaultValues,
    initKey: [name],
  })

  const onValid = useCallback(
    async (values: Values) => {
      if (!originalPath) {
        return
      }
      const { bucket, to, from, mode } = getRenameFileRenameParams(
        originalPath,
        values.name,
      )
      const response = await objectRename.post({
        payload: {
          bucket,
          to,
          from,
          mode,
          force: false,
        },
      })
      if (response.error) {
        triggerErrorToast({
          title: isDirectory(originalPath)
            ? 'Error renaming directory'
            : 'Error renaming file',
          body: response.error,
        })
      } else {
        refreshDirectory()
        refreshFlat()
        closeAndReset()
        triggerSuccessToast({
          title: isDirectory(originalPath)
            ? 'Directory renamed'
            : 'File renamed',
        })
      }
    },
    [originalPath, refreshDirectory, refreshFlat, objectRename, closeAndReset],
  )

  const fields = useMemo(() => getFields({ currentName: name }), [name])

  const onInvalid = useOnInvalid(fields)

  return (
    <Dialog
      title="Rename file"
      trigger={trigger}
      open={open}
      onOpenChange={handleOpenChange}
      contentVariants={{
        className: 'w-[400px]',
      }}
      onSubmit={form.handleSubmit(onValid, onInvalid)}
    >
      <div className="flex flex-col gap-4">
        <FieldText name="name" form={form} fields={fields} autoComplete="off" />
        <FormSubmitButton form={form}>Save</FormSubmitButton>
      </div>
    </Dialog>
  )
}
