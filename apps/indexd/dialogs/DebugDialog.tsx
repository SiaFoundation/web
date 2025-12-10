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
  useAdminContracts,
  useAdminSettingsContracts,
  useAdminSettingsHosts,
  useAdminSettingsPricePinning,
} from '@siafoundation/indexd-react'
import { useCallback, useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

function getDefaultValues() {
  return {
    contracts: true,
    contractSettings: true,
    hostSettings: true,
    pricePinningSettings: true,
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
    contractSettings: {
      type: 'boolean',
      title: 'Contract Settings',
      validation: {},
    },
    hostSettings: {
      type: 'boolean',
      title: 'Host Settings',
      validation: {},
    },
    pricePinningSettings: {
      type: 'boolean',
      title: 'Price Pinning Settings',
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

  const contracts = useAdminContracts()
  const contractSettings = useAdminSettingsContracts()
  const hostSettings = useAdminSettingsHosts()
  const pricePinningSettings = useAdminSettingsPricePinning()

  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const { handleOpenChange } = useDialogFormHelpers({
    form,
    onOpenChange,
    defaultValues,
  })

  const onValid = useCallback(
    async (values: Values) => {
      const zip = new JSZip()

      // Add all the data to the zip file as JSON files.
      if (values.contractSettings) {
        zip.file(
          'contractSettings.json',
          JSON.stringify(contractSettings.data, null, 2),
        )
      }
      if (values.hostSettings) {
        zip.file(
          'hostSettings.json',
          JSON.stringify(hostSettings.data, null, 2),
        )
      }
      if (values.pricePinningSettings) {
        zip.file(
          'pricePinningSettings.json',
          JSON.stringify(pricePinningSettings.data, null, 2),
        )
      }
      if (values.contracts) {
        zip.file('contracts.json', JSON.stringify(contracts.data, null, 2))
      }

      // Generate the zip file.
      const blob = await zip.generateAsync({ type: 'blob' })

      // Trigger download.
      saveAs(blob, 'indexd-debug-report.zip')

      if (values.openGithub) {
        window.open(
          'https://github.com/SiaFoundation/indexd/issues/new?template=bug_report.yml',
          '_blank',
        )
      }
    },
    [
      contracts.data,
      contractSettings.data,
      hostSettings.data,
      pricePinningSettings.data,
    ],
  )

  const fields = useMemo(() => getFields(), [])

  const onInvalid = useOnInvalid(fields)

  const openGithub = useWatch({ control: form.control, name: 'openGithub' })

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
              name="contractSettings"
            />
            <FieldSwitch
              size="small"
              form={form}
              fields={fields}
              name="hostSettings"
            />
            <FieldSwitch
              size="small"
              form={form}
              fields={fields}
              name="pricePinningSettings"
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
