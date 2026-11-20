import {
  Dialog,
  ConfigFields,
  useOnInvalid,
  FormSubmitButton,
  FieldText,
  Paragraph,
  triggerSuccessToast,
  triggerErrorToast,
  useDialogFormHelpers,
} from '@siafoundation/design-system'
import { useAdminObjectBlocklistAdd } from '@siafoundation/indexd-react'
import { useGetFunc } from '@siafoundation/react-core'
import {
  adminObjectBlocklistEntryRoute,
  type AdminObjectBlocklistEntryParams,
  type AdminObjectBlocklistEntryResponse,
} from '@siafoundation/indexd-types'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { normalizeObjectKey, objectKeyValidation } from '../lib/objectKey'
import { useBlockedObjectsParams } from '../components/Data/BlockedObjects/useBlockedObjectsParams'

const defaultValues = {
  objectKey: '',
  reason: '',
}

type Values = typeof defaultValues

const fields: ConfigFields<Values, never> = {
  objectKey: {
    type: 'text',
    title: 'Object key',
    placeholder: '64 character hex key',
    validation: objectKeyValidation,
  },
  reason: {
    type: 'text',
    title: 'Reason (optional)',
    placeholder: 'e.g. dmca-1234',
    validation: {},
  },
}

type Props = {
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function ObjectBlockDialog({ open, onOpenChange }: Props) {
  const objectBlock = useAdminObjectBlocklistAdd()
  const blocklistEntry = useGetFunc<
    AdminObjectBlocklistEntryParams,
    AdminObjectBlocklistEntryResponse
  >({ route: adminObjectBlocklistEntryRoute })
  const { setPanelId } = useBlockedObjectsParams()

  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const { closeAndReset, handleOpenChange } = useDialogFormHelpers({
    form,
    onOpenChange,
    defaultValues,
  })

  const onSubmit = useCallback(
    async (values: Values) => {
      const key = normalizeObjectKey(values.objectKey)
      // Blocking a blocked key replaces its reason, so stop instead of
      // overwriting it.
      const existing = await blocklistEntry.get({
        params: { objectkey: key },
      })
      if (existing.data) {
        form.setError('objectKey', {
          message: existing.data.reason
            ? `already blocked: ${existing.data.reason}`
            : 'already blocked',
        })
        return
      }
      if (existing.status !== 404) {
        form.setError('objectKey', {
          message: String(existing.error),
        })
        return
      }
      const response = await objectBlock.put({
        params: {
          objectkey: key,
        },
        payload: {
          reason: values.reason.trim(),
        },
      })
      if (response.error) {
        triggerErrorToast({
          title: 'Error blocking object',
          body: response.error,
        })
        return
      }
      triggerSuccessToast({ title: 'Object blocked' })
      setPanelId(key)
      closeAndReset()
    },
    [form, blocklistEntry, objectBlock, setPanelId, closeAndReset],
  )

  const onInvalid = useOnInvalid(fields)

  return (
    <Dialog
      title="Block object"
      open={open}
      onOpenChange={handleOpenChange}
      contentVariants={{
        className: 'w-[400px]',
      }}
      onSubmit={form.handleSubmit(onSubmit, onInvalid)}
    >
      <div className="flex flex-col gap-4">
        <Paragraph size="14">
          A blocked object is hidden from every listing and can not be fetched,
          pinned or shared. Its data stays pinned, so unblocking it restores
          access.
        </Paragraph>
        <FieldText name="objectKey" form={form} fields={fields} />
        <FieldText name="reason" form={form} fields={fields} />
        <FormSubmitButton variant="red" form={form}>
          Block object
        </FormSubmitButton>
      </div>
    </Dialog>
  )
}
