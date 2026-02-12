import {
  Paragraph,
  Dialog,
  triggerSuccessToast,
  useOnInvalid,
  FormSubmitButton,
  FieldText,
  FieldNumber,
  triggerErrorToast,
  ConfigFields,
} from '@siafoundation/design-system'
import { useAdminQuotaUpdate } from '@siafoundation/indexd-react'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useDialog } from '../contexts/dialog'
import { useQuotasParams } from '../components/Data/Quotas/useQuotasParams'
import { useMutate } from '@siafoundation/react-core'
import { adminQuotasRoute } from '@siafoundation/indexd-types'
import BigNumber from 'bignumber.js'

const defaultValues = {
  key: '',
  description: '',
  maxPinnedDataGB: undefined as undefined | BigNumber,
  totalUses: undefined as undefined | BigNumber,
}

type CreateValues = typeof defaultValues

function getCreateFields(): ConfigFields<CreateValues, never> {
  return {
    key: {
      type: 'text',
      title: 'Key',
      placeholder: 'my-quota',
      validation: {
        required: 'required',
      },
    },
    description: {
      type: 'text',
      title: 'Description',
      placeholder: 'Description',
      validation: {
        required: 'required',
      },
    },
    maxPinnedDataGB: {
      type: 'number',
      title: 'Max pinned data',
      units: 'GB',
      decimalsLimit: 2,
      placeholder: '100',
      validation: {
        required: 'required',
      },
    },
    totalUses: {
      type: 'number',
      title: 'Total uses',
      decimalsLimit: 0,
      placeholder: '1000',
      validation: {
        required: 'required',
      },
    },
  }
}

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function QuotaCreateDialog({ trigger, open, onOpenChange }: Props) {
  const { closeDialog } = useDialog()
  const { setPanelId } = useQuotasParams()
  const quotaUpdate = useAdminQuotaUpdate()
  const fields = useMemo(() => getCreateFields(), [])

  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const mutate = useMutate()
  const onSubmit = useCallback(
    async (values: CreateValues) => {
      const response = await quotaUpdate.put({
        params: {
          key: values.key,
        },
        payload: {
          description: values.description,
          maxPinnedData: values.maxPinnedDataGB
            ? values.maxPinnedDataGB.times(1e9).toNumber()
            : 0,
          totalUses: values.totalUses ? values.totalUses.toNumber() : 0,
        },
      })
      if (response.error) {
        triggerErrorToast({
          title: 'Error creating quota',
          body: response.error,
        })
      } else {
        triggerSuccessToast({ title: 'Quota created' })
        mutate((key) => key.startsWith(adminQuotasRoute))
        form.reset()
        closeDialog()
        setPanelId(values.key)
      }
    },
    [form, quotaUpdate, closeDialog, setPanelId, mutate],
  )

  const onInvalid = useOnInvalid(fields)

  return (
    <Dialog
      title="Create quota"
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
        <Paragraph size="14">Create a new quota.</Paragraph>
        <FieldText name="key" form={form} fields={fields} />
        <FieldText name="description" form={form} fields={fields} />
        <FieldNumber name="maxPinnedDataGB" form={form} fields={fields} />
        <FieldNumber name="totalUses" form={form} fields={fields} />
        <FormSubmitButton form={form}>Create quota</FormSubmitButton>
      </div>
    </Dialog>
  )
}
