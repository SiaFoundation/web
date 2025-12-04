import {
  Dialog,
  ConfigFields,
  useOnInvalid,
  FormSubmitButton,
  useDialogFormHelpers,
  FieldText,
  Paragraph,
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { useSystemBackup } from '@siafoundation/hostd-react'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import useLocalStorageState from 'use-local-storage-state'

function getDefaultValues(savedDirectory: string | undefined) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const directory = savedDirectory || '/backups'
  return {
    path: `${directory}/hostd-${timestamp}.bak`,
  }
}

function extractDirectory(path: string): string {
  const lastSlashIndex = path.lastIndexOf('/')
  if (lastSlashIndex === -1) {
    return '/backups'
  }
  return path.substring(0, lastSlashIndex) || '/backups'
}

type Values = ReturnType<typeof getDefaultValues>

function getFields(): ConfigFields<Values, never> {
  return {
    path: {
      type: 'text',
      title: 'Backup path',
      placeholder: '/backups/hostd-2024-01-01T00-00-00-000Z.bak',
      validation: {
        required: 'required',
      },
    },
  } as const
}

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SystemBackupDialog({ trigger, open, onOpenChange }: Props) {
  // After a successful backup, the directory is saved so we can use it as the default next time.
  const [savedDirectory, setSavedDirectory] = useLocalStorageState<string>(
    'v0/hostd/backupDirectory',
    {
      defaultValue: '/backups',
    },
  )

  const defaultValues = useMemo(
    () => getDefaultValues(savedDirectory),
    [savedDirectory],
  )
  const backup = useSystemBackup()

  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const { handleOpenChange, closeAndReset } = useDialogFormHelpers({
    form,
    onOpenChange,
    defaultValues,
  })

  const fields = useMemo(() => getFields(), [])

  const onValid = useCallback(
    async (values: Values) => {
      const response = await backup.post({
        payload: {
          database: 'main',
          path: values.path,
        },
      })

      if (response.error) {
        triggerErrorToast({
          title: 'Error creating backup',
          body: response.error,
        })
      } else {
        const directory = extractDirectory(values.path)
        setSavedDirectory(directory)
        triggerSuccessToast({
          title: 'Backup created',
          body: `Database saved to ${values.path}`,
        })
        closeAndReset()
      }
    },
    [backup, closeAndReset, setSavedDirectory],
  )

  const onInvalid = useOnInvalid(fields)

  return (
    <Dialog
      title="Backup database"
      trigger={trigger}
      open={open}
      onOpenChange={handleOpenChange}
      contentVariants={{
        className: 'w-[500px]',
      }}
      onSubmit={form.handleSubmit(onValid, onInvalid)}
      controls={
        <div className="flex justify-end">
          <FormSubmitButton form={form} variant="accent" size="medium">
            Create backup
          </FormSubmitButton>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <Paragraph size="14">
          Create a backup of the database. The backup will be saved to the
          specified path on the server.
        </Paragraph>
        <FieldText name="path" form={form} fields={fields} autoComplete="off" />
      </div>
    </Dialog>
  )
}
