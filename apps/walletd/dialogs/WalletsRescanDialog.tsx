import {
  ConfigFields,
  Dialog,
  FieldNumber,
  FormSubmitButton,
  Paragraph,
  useDialogFormHelpers,
} from '@siafoundation/design-system'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import {
  useTriggerRescan,
  getRescanFields,
  getDefaultRescanValues,
  RescanCalloutWarningExpensive,
  RescanCalloutWarningStartHeight,
} from './FieldRescan'
import { useSyncStatus } from '../hooks/useSyncStatus'

export type WalletsRescanDialogParams = void

type Props = {
  params?: WalletsRescanDialogParams
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

function getDefaultValues({
  rescanStartHeight,
}: {
  rescanStartHeight: number
}) {
  return {
    ...getDefaultRescanValues({ rescanStartHeight }),
    shouldRescan: true,
  }
}

type Values = ReturnType<typeof getDefaultValues>

function getFields(): ConfigFields<Values, never> {
  return {
    ...getRescanFields(),
  }
}

export function WalletsRescanDialog({ trigger, open, onOpenChange }: Props) {
  const syncStatus = useSyncStatus()
  const defaultValues = getDefaultValues({
    rescanStartHeight: syncStatus.nodeBlockHeight,
  })
  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const { handleOpenChange, closeAndReset } = useDialogFormHelpers({
    form,
    onOpenChange,
    defaultValues,
  })

  const fields = getFields()

  const triggerRescan = useTriggerRescan()
  const onSubmit = useCallback(
    async (values: Values) => {
      triggerRescan(values)
      closeAndReset()
    },
    [closeAndReset, triggerRescan],
  )

  return (
    <Dialog
      title="Rescan the blockchain"
      trigger={trigger}
      open={open}
      onOpenChange={handleOpenChange}
      contentVariants={{
        className: 'w-[500px]',
      }}
      onSubmit={form.handleSubmit(onSubmit)}
      controls={
        <div className="flex justify-end">
          <FormSubmitButton form={form} variant="red" size="medium">
            Rescan
          </FormSubmitButton>
        </div>
      }
    >
      <div className="flex flex-col gap-2 py-2">
        <Paragraph size="14">
          Rescan the blockchain from the specified start height to find any
          missing transaction activity across all wallets.
        </Paragraph>
        <div className="w-[100px]">
          <FieldNumber form={form} fields={fields} name="rescanStartHeight" />
        </div>
        <div className="pt-2 flex flex-col gap-2">
          <RescanCalloutWarningExpensive />
          <RescanCalloutWarningStartHeight />
        </div>
      </div>
    </Dialog>
  )
}
