import {
  Dialog,
  ConfigFields,
  useOnInvalid,
  FormSubmitButton,
  useDialogFormHelpers,
  FieldSwitch,
  Label,
  Paragraph,
  Separator,
} from '@siafoundation/design-system'
import {
  useAlerts,
  useAutopilotConfig,
  useContracts,
  useSettingsGouging,
  useSettingsPinned,
  useSettingsUpload,
} from '@siafoundation/renterd-react'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

function getDefaultValues() {
  return {
    contracts: true,
    alerts: true,
    autopilot: true,
    gouging: true,
    upload: true,
    pinned: true,
    openGithub: true,
  }
}

type Values = ReturnType<typeof getDefaultValues>

function getFields(): ConfigFields<Values, never> {
  return {
    contracts: {
      type: 'boolean',
      title: 'Contracts',
      validation: {},
    },
    alerts: {
      type: 'boolean',
      title: 'Alerts',
      validation: {},
    },
    autopilot: {
      type: 'boolean',
      title: 'Autopilot',
      validation: {},
    },
    gouging: {
      type: 'boolean',
      title: 'Gouging',
      validation: {},
    },
    upload: {
      type: 'boolean',
      title: 'Upload',
      validation: {},
    },
    pinned: {
      type: 'boolean',
      title: 'Pinned',
      validation: {},
    },
    openGithub: {
      type: 'boolean',
      title: 'Open GitHub bug report submission page',
      validation: {},
    },
  }
}

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function DebugDialog({ trigger, open, onOpenChange }: Props) {
  const defaultValues = useMemo(() => getDefaultValues(), [])

  const contracts = useContracts()
  const alerts = useAlerts({
    params: {
      limit: 1000,
    },
  })
  const autopilot = useAutopilotConfig()
  const gouging = useSettingsGouging()
  const upload = useSettingsUpload()
  const pinned = useSettingsPinned()

  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const { handleOpenChange } = useDialogFormHelpers({
    form,
    onOpenChange,
    defaultValues,
    initKey: [name],
  })

  const onValid = useCallback(
    async (values: Values) => {
      const zip = new JSZip()

      // Add all the data to the zip file as JSON files.
      if (values.alerts) {
        zip.file('alerts.json', JSON.stringify(alerts.data, null, 2))
      }
      if (values.contracts) {
        zip.file('contracts.json', JSON.stringify(contracts.data, null, 2))
      }
      if (values.autopilot) {
        zip.file('autopilot.json', JSON.stringify(autopilot.data, null, 2))
      }
      if (values.gouging) {
        zip.file('gouging.json', JSON.stringify(gouging.data, null, 2))
      }
      if (values.upload) {
        zip.file('upload.json', JSON.stringify(upload.data, null, 2))
      }
      if (values.pinned) {
        zip.file('pinned.json', JSON.stringify(pinned.data, null, 2))
      }

      // Generate the zip file.
      const blob = await zip.generateAsync({ type: 'blob' })

      // Trigger download.
      saveAs(blob, 'renterd-debug-report.zip')

      if (values.openGithub) {
        window.open(
          'https://github.com/SiaFoundation/renterd/issues/new?template=bug_report.yml',
          '_blank',
        )
      }
    },
    [
      contracts.data,
      alerts.data,
      autopilot.data,
      gouging.data,
      upload.data,
      pinned.data,
    ],
  )

  const fields = useMemo(() => getFields(), [])

  const onInvalid = useOnInvalid(fields)

  const openGithub = form.watch('openGithub')

  return (
    <Dialog
      title="Generate a bug report"
      descriptionVisuallyHidden
      description="Select which metadata files to include in the generated report."
      trigger={trigger}
      open={open}
      onOpenChange={handleOpenChange}
      contentVariants={{
        className: 'w-[400px]',
      }}
      onSubmit={form.handleSubmit(onValid, onInvalid)}
    >
      <div className="flex flex-col gap-4 pt-4">
        <Paragraph size="14">
          Select which metadata files to include in the debug report, generate
          the report file (ZIP), and attach it to a GitHub bug report.
        </Paragraph>
        <div className="flex flex-col gap-2">
          <Separator className="mb-2" />
          <Label size="14" color="subtle">
            General
          </Label>
          <div className="flex gap-4">
            <FieldSwitch
              size="small"
              form={form}
              fields={fields}
              name="contracts"
            />
            <FieldSwitch
              size="small"
              form={form}
              fields={fields}
              name="alerts"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label size="14" color="subtle">
            Configuration
          </Label>
          <div className="flex gap-4">
            <FieldSwitch
              size="small"
              form={form}
              fields={fields}
              name="autopilot"
            />
            <FieldSwitch
              size="small"
              form={form}
              fields={fields}
              name="gouging"
            />
            <FieldSwitch
              size="small"
              form={form}
              fields={fields}
              name="upload"
            />
            <FieldSwitch
              size="small"
              form={form}
              fields={fields}
              name="pinned"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Separator />
          <FieldSwitch
            size="small"
            form={form}
            fields={fields}
            name="openGithub"
          />
        </div>
        <FormSubmitButton form={form}>
          Generate {openGithub ? 'and open' : ''}
        </FormSubmitButton>
      </div>
    </Dialog>
  )
}
