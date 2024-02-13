import {
  Dialog,
  triggerErrorToast,
  triggerSuccessToast,
  ConfigFields,
  useOnInvalid,
  FormSubmitButton,
  FieldText,
} from '@siafoundation/design-system'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useDialog } from '../../contexts/dialog'
import { useObjectRename } from '@siafoundation/react-renterd'
import { getFilename, isDirectory } from '../../contexts/files/paths'
import { getRenameFileRenameParams } from '../../contexts/files/rename'
import { useFiles } from '../../contexts/files'

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
  id: string
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

// Renames a file or directory
export function FileRenameDialog({
  id: originalPath,
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { closeDialog } = useDialog()
  const { refresh } = useFiles()

  let name = getFilename(originalPath || '')
  name = name.endsWith('/') ? name.slice(0, -1) : name
  const defaultValues = getDefaultValues(name)

  const objectRename = useObjectRename()
  const form = useForm({
    mode: 'all',
    defaultValues,
  })
  // Reset the form when the name changes
  useEffect(() => {
    form.reset(getDefaultValues(name))
  }, [form, name])

  const onSubmit = useCallback(
    async (values: Values) => {
      const { bucket, to, from, mode } = getRenameFileRenameParams(
        originalPath,
        values.name
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
        triggerErrorToast(response.error)
      } else {
        refresh()
        form.reset()
        closeDialog()
        triggerSuccessToast(
          isDirectory(originalPath) ? 'Directory renamed.' : 'File renamed.'
        )
      }
    },
    [form, originalPath, refresh, objectRename, closeDialog]
  )

  const fields = useMemo(() => getFields({ currentName: name }), [name])

  const onInvalid = useOnInvalid(fields)

  return (
    <Dialog
      title="Rename file"
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
        <FieldText name="name" form={form} fields={fields} autoComplete="off" />
        <FormSubmitButton form={form}>Save</FormSubmitButton>
      </div>
    </Dialog>
  )
}
