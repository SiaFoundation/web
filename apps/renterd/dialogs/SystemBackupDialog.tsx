import {
  Dialog,
  ConfigFields,
  useOnInvalid,
  FormSubmitButton,
  useDialogFormHelpers,
  FieldText,
  FieldSwitch,
  Paragraph,
  triggerErrorToast,
  triggerSuccessToast,
  Label,
  Separator,
  Text,
} from '@siafoundation/design-system'
import { useSystemBackup } from '@siafoundation/renterd-react'
import { useCallback, useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import useLocalStorageState from 'use-local-storage-state'

function getDefaultValues(
  savedMainDirectory: string | undefined,
  savedMetricsDirectory: string | undefined,
) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const mainDirectory = savedMainDirectory || '/backups'
  const metricsDirectory = savedMetricsDirectory || '/backups'
  return {
    backupMain: true,
    backupMetrics: true,
    mainPath: `${mainDirectory}/renterd-main-${timestamp}.bak`,
    metricsPath: `${metricsDirectory}/renterd-metrics-${timestamp}.bak`,
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

function getFields(
  backupMain: boolean,
  backupMetrics: boolean,
): ConfigFields<Values, never> {
  return {
    backupMain: {
      type: 'boolean',
      title: 'Backup main database',
      validation: {},
    },
    backupMetrics: {
      type: 'boolean',
      title: 'Backup metrics database',
      validation: {},
    },
    mainPath: {
      type: 'text',
      title: 'Backup path',
      placeholder: '/backups/renterd-main-2024-01-01T00-00-00-000Z.bak',
      readOnly: !backupMain,
      validation: {
        validate: (value: string, values: Values) => {
          if (values.backupMain && !value) {
            return 'required'
          }
          return true
        },
      },
    },
    metricsPath: {
      type: 'text',
      title: 'Backup path',
      placeholder: '/backups/renterd-metrics-2024-01-01T00-00-00-000Z.bak',
      readOnly: !backupMetrics,
      validation: {
        validate: (value: string, values: Values) => {
          if (values.backupMetrics && !value) {
            return 'required'
          }
          return true
        },
      },
    },
  }
}

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SystemBackupDialog({ trigger, open, onOpenChange }: Props) {
  // After a successful backup, the directory is saved so we can use it as the default next time.
  const [savedMainDirectory, setSavedMainDirectory] =
    useLocalStorageState<string>('v0/renterd/backupMainDirectory', {
      defaultValue: '/backups',
    })
  const [savedMetricsDirectory, setSavedMetricsDirectory] =
    useLocalStorageState<string>('v0/renterd/backupMetricsDirectory', {
      defaultValue: '/backups',
    })

  const defaultValues = useMemo(
    () => getDefaultValues(savedMainDirectory, savedMetricsDirectory),
    [savedMainDirectory, savedMetricsDirectory],
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

  const backupMain = useWatch({ control: form.control, name: 'backupMain' })
  const backupMetrics = useWatch({
    control: form.control,
    name: 'backupMetrics',
  })

  const fields = useMemo(
    () => getFields(backupMain, backupMetrics),
    [backupMain, backupMetrics],
  )

  const onValid = useCallback(
    async (values: Values) => {
      if (!values.backupMain && !values.backupMetrics) {
        triggerErrorToast({
          title: 'No database selected',
          body: 'Please select at least one database to backup.',
        })
        return
      }

      const errors: string[] = []
      const successes: string[] = []

      if (values.backupMain) {
        const response = await backup.post({
          payload: {
            database: 'main',
            path: values.mainPath,
          },
        })

        if (response.error) {
          errors.push(`Main database: ${response.error}`)
        } else {
          const directory = extractDirectory(values.mainPath)
          setSavedMainDirectory(directory)
          successes.push(`Main database saved to ${values.mainPath}`)
        }
      }

      if (values.backupMetrics) {
        const response = await backup.post({
          payload: {
            database: 'metrics',
            path: values.metricsPath,
          },
        })

        if (response.error) {
          errors.push(`Metrics database: ${response.error}`)
        } else {
          const directory = extractDirectory(values.metricsPath)
          setSavedMetricsDirectory(directory)
          successes.push(`Metrics database saved to ${values.metricsPath}`)
        }
      }

      if (errors.length > 0 && successes.length > 0) {
        triggerErrorToast({
          title: 'Partial backup failure',
          body: (
            <div className="flex flex-col gap-1">
              {errors.map((error, i) => (
                <Text key={i} size="14">
                  {error}
                </Text>
              ))}
              {successes.map((success, i) => (
                <Text key={`success-${i}`} size="14">
                  {success}
                </Text>
              ))}
            </div>
          ),
        })
      } else if (errors.length > 0) {
        triggerErrorToast({
          title: 'Error creating backup',
          body: (
            <div className="flex flex-col gap-1">
              {errors.map((error, i) => (
                <Text key={i} size="14">
                  {error}
                </Text>
              ))}
            </div>
          ),
        })
      } else if (successes.length > 0) {
        triggerSuccessToast({
          title: 'Backup created',
          body: (
            <div className="flex flex-col gap-1">
              {successes.map((success, i) => (
                <Text key={i} size="14">
                  {success}
                </Text>
              ))}
            </div>
          ),
        })
        closeAndReset()
      }
    },
    [backup, closeAndReset, setSavedMainDirectory, setSavedMetricsDirectory],
  )

  const onInvalid = useOnInvalid(useMemo(() => getFields(true, true), []))

  return (
    <Dialog
      title="Backup databases"
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
          Create backups of the databases. The backups will be saved to the
          specified paths on the server.
        </Paragraph>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <FieldSwitch
                name="backupMain"
                form={form}
                fields={fields}
                size="small"
                group={false}
              />
              <Label>Main database</Label>
            </div>
            <FieldText
              name="mainPath"
              form={form}
              fields={fields}
              autoComplete="off"
            />
          </div>
          <Separator />
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <FieldSwitch
                name="backupMetrics"
                form={form}
                fields={fields}
                size="small"
                group={false}
              />
              <Label>Metrics database</Label>
            </div>
            <FieldText
              name="metricsPath"
              form={form}
              fields={fields}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </Dialog>
  )
}
