import {
  Dialog,
  useOnInvalid,
  FormSubmitButton,
  FieldText,
  ConfigFields,
  useDialogFormHelpers,
} from '@siafoundation/design-system'
import { useGetFunc } from '@siafoundation/react-core'
import {
  adminObjectBlocklistEntryRoute,
  type AdminObjectBlocklistEntryParams,
  type AdminObjectBlocklistEntryResponse,
} from '@siafoundation/indexd-types'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useBlockedObjectsParams } from '../components/Data/BlockedObjects/useBlockedObjectsParams'
import { normalizeObjectKey, objectKeyValidation } from '../lib/objectKey'

const defaultValues = {
  objectKey: '',
}

type Values = typeof defaultValues

const fields: ConfigFields<Values, never> = {
  objectKey: {
    type: 'text',
    title: 'Object key',
    placeholder: '64 character hex key',
    validation: objectKeyValidation,
  },
}

type Props = {
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function ObjectFindDialog({ open, onOpenChange }: Props) {
  const { setPanelId } = useBlockedObjectsParams()
  const blocklistEntry = useGetFunc<
    AdminObjectBlocklistEntryParams,
    AdminObjectBlocklistEntryResponse
  >({ route: adminObjectBlocklistEntryRoute })

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
      const objectKey = normalizeObjectKey(values.objectKey)
      // The blocklist list route has no search, so look the key up directly.
      // It returns 404 when the key is not blocked.
      const response = await blocklistEntry.get({
        params: { objectkey: objectKey },
      })
      if (response.status === 404) {
        form.setError('objectKey', { message: 'this key is not blocked' })
        return
      }
      if (response.error) {
        form.setError('objectKey', { message: String(response.error) })
        return
      }
      setPanelId(objectKey)
      closeAndReset()
    },
    [form, blocklistEntry, setPanelId, closeAndReset],
  )

  const onInvalid = useOnInvalid(fields)

  return (
    <Dialog
      title="Find blocked object"
      open={open}
      onOpenChange={handleOpenChange}
      contentVariants={{
        className: 'w-[400px]',
      }}
      onSubmit={form.handleSubmit(onSubmit, onInvalid)}
    >
      <div className="flex flex-col gap-4">
        <FieldText name="objectKey" form={form} fields={fields} />
        <FormSubmitButton form={form}>Find</FormSubmitButton>
      </div>
    </Dialog>
  )
}
