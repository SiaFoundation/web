import {
  Paragraph,
  Dialog,
  triggerSuccessToast,
  triggerErrorToast,
  useOnInvalid,
  FormSubmitButton,
  FieldSelect,
  ConfigFields,
  handleBatchOperation,
} from '@siafoundation/design-system'
import {
  useAdminConnectKeyUpdate,
  useAdminQuotas,
} from '@siafoundation/indexd-react'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useDialog } from '../contexts/dialog'
import { useMutate } from '@siafoundation/react-core'
import { adminConnectKeysRoute } from '@siafoundation/indexd-types'
import { KeyData } from '../lib/connectKey'
import { pluralize } from '@siafoundation/units'

const defaultValues = {
  quota: '',
}

type Props = {
  keys: KeyData[] | undefined
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function KeyQuotaReassignDialog({
  keys,
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { closeDialog } = useDialog()
  const keyUpdate = useAdminConnectKeyUpdate()
  const quotas = useAdminQuotas()
  const mutate = useMutate()

  const fields = useMemo(
    (): ConfigFields<typeof defaultValues, never> => ({
      quota: {
        type: 'select',
        title: 'Quota',
        options: (quotas.data || []).map((q) => ({
          label: q.key,
          value: q.key,
        })),
        validation: {
          required: 'required',
        },
      },
    }),
    [quotas.data],
  )

  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const onSubmit = useCallback(
    async (values: typeof defaultValues) => {
      if (!keys?.length) {
        return
      }
      await handleBatchOperation(
        keys.map((k) =>
          keyUpdate.put({
            payload: {
              key: k.key,
              description: k.description,
              quota: values.quota,
            },
          }),
        ),
        {
          toastError: ({ successCount, errorCount, totalCount }) => ({
            title: `Reassigned ${pluralize(successCount, 'key')}`,
            body: `Error reassigning ${errorCount}/${totalCount} of total keys.`,
          }),
          toastSuccess: ({ totalCount }) => ({
            title: `Reassigned ${pluralize(totalCount, 'key')} to quota "${values.quota}"`,
          }),
          after: async () => {
            await mutate((key) => key.startsWith(adminConnectKeysRoute))
            form.reset()
            closeDialog()
          },
        },
      )
    },
    [keys, keyUpdate, mutate, form, closeDialog],
  )

  const onInvalid = useOnInvalid(fields)

  return (
    <Dialog
      title="Reassign quota"
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
        <Paragraph size="14">
          Reassign {keys?.length ?? 0} {keys?.length === 1 ? 'key' : 'keys'} to
          a new quota.
        </Paragraph>
        <FieldSelect name="quota" form={form} fields={fields} />
        <FormSubmitButton form={form}>Reassign quota</FormSubmitButton>
      </div>
    </Dialog>
  )
}
