'use client'

import { triggerErrorToast, triggerSuccessToast } from '../lib/toast'
import { Response } from '@siafoundation/react-core'
import { Dialog } from '../core/Dialog'
import { ConfigFields } from '../form/configurationFields'
import { useDialogFormHelpers } from '../form/useDialogFormHelpers'
import { useForm } from 'react-hook-form'
import { useCallback } from 'react'
import { FormSubmitButton } from '../components/Form'
import { FieldText } from '../form/FieldText'

function getDefaultValues() {
  return {
    address: '',
  }
}

type Values = ReturnType<typeof getDefaultValues>

function getFields(): ConfigFields<Values, never> {
  return {
    address: {
      type: 'text',
      title: 'Address',
      placeholder: 'host.acme.com:9981 or 127.0.0.1:9981',
      autoComplete: 'off',
      validation: {
        required: 'required',
      },
    },
  }
}

const defaultValues = getDefaultValues()
const fields = getFields()

export type SyncerConnectPeerDialogParams = void

type Props = {
  params?: SyncerConnectPeerDialogParams
  trigger?: React.ReactNode
  open: boolean
  connect: (address: string) => Promise<Response<void>>
  onOpenChange: (val: boolean) => void
}

export function SyncerConnectPeerDialog({
  trigger,
  open,
  connect,
  onOpenChange,
}: Props) {
  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const { handleOpenChange, closeAndReset } = useDialogFormHelpers({
    form,
    onOpenChange,
    defaultValues,
  })

  const onSubmit = useCallback(
    async (values: Values) => {
      const response = await connect(values.address)
      if (response.error) {
        triggerErrorToast({ title: response.error })
      } else {
        triggerSuccessToast({ title: 'Connected to peer' })
        closeAndReset()
      }
    },
    [closeAndReset, connect],
  )

  return (
    <Dialog
      trigger={trigger}
      title="Connect peer"
      description="Connect to a peer by IP address."
      open={open}
      onOpenChange={handleOpenChange}
      contentVariants={{
        className: 'w-[400px]',
      }}
      onSubmit={form.handleSubmit(onSubmit)}
      controls={
        <div className="px-1">
          <FormSubmitButton form={form} size="medium" className="w-full">
            Connect
          </FormSubmitButton>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <FieldText form={form} fields={fields} name="address" size="medium" />
      </div>
    </Dialog>
  )
}
