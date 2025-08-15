import {
  Paragraph,
  Dialog,
  triggerSuccessToast,
  ConfigFields,
  useOnInvalid,
  FormSubmitButton,
  FieldText,
  triggerErrorToast,
  FieldNumber,
} from '@siafoundation/design-system'
import { useAdminConnectKeyAdd } from '@siafoundation/indexd-react'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useDialog } from '../contexts/dialog'
import { useKeysParams } from '../components/Data/Keys/useKeysParams'
import { GBToBytes } from '@siafoundation/units'
import { Maybe } from '@siafoundation/types'
import BigNumber from 'bignumber.js'
import { useMutate } from '@siafoundation/react-core'
import { adminConnectKeysRoute } from '@siafoundation/indexd-types'

const defaultValues = {
  description: '',
  maxPinnedData: new BigNumber(1000),
  remainingUses: new BigNumber(1000),
}

type Values = typeof defaultValues

function getFields(): ConfigFields<typeof defaultValues, never> {
  return {
    description: {
      type: 'text',
      title: 'Description',
      placeholder: 'Description',
      validation: {
        required: 'required',
      },
    },
    maxPinnedData: {
      type: 'number',
      title: 'Max pinned data',
      placeholder: 'Max pinned data',
      units: 'GB',
      validation: {
        required: 'required',
        validate: {
          max: (value: Maybe<BigNumber>) => {
            if (value && value.gt(10_000)) {
              return 'Max value is 10,000 GB'
            }
            return true
          },
          min: (value: Maybe<BigNumber>) => {
            if (value && value.lt(10)) {
              return 'Min value is 10 GB'
            }
            return true
          },
        },
      },
    },
    remainingUses: {
      type: 'number',
      title: 'Remaining uses',
      placeholder: 'Remaining uses',
      validation: {
        required: 'required',
        validate: {
          max: (value: Maybe<BigNumber>) => {
            if (value && value.gt(1_000)) {
              return 'Max value is 1,000'
            }
            return true
          },
          min: (value: Maybe<BigNumber>) => {
            if (value && value.lt(1)) {
              return 'Min value is 1'
            }
            return true
          },
        },
      },
    },
  }
}

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function ConnectKeyCreateDialog({ trigger, open, onOpenChange }: Props) {
  const { closeDialog } = useDialog()
  const { setPanelId } = useKeysParams()
  const keyAdd = useAdminConnectKeyAdd()

  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const mutate = useMutate()
  const onSubmit = useCallback(
    async (values: Values) => {
      const response = await keyAdd.post({
        payload: {
          description: values.description,
          maxPinnedData: GBToBytes(values.maxPinnedData).toNumber(),
          remainingUses: values.remainingUses.toNumber(),
        },
      })
      if (response.error) {
        triggerErrorToast({
          title: 'Error creating connect key',
          body: response.error,
        })
      } else {
        triggerSuccessToast({ title: 'Connect key created' })
        mutate((key) => key.startsWith(adminConnectKeysRoute))
        form.reset()
        closeDialog()
        setPanelId(response.data?.key ?? undefined)
      }
    },
    [form, keyAdd, closeDialog, setPanelId, mutate],
  )

  const fields = useMemo(() => getFields(), [])

  const onInvalid = useOnInvalid(fields)

  return (
    <Dialog
      title="Create connect key"
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
        <Paragraph size="14">Create a new connect key.</Paragraph>
        <FieldText name="description" form={form} fields={fields} />
        <FieldNumber name="maxPinnedData" form={form} fields={fields} />
        <FieldNumber name="remainingUses" form={form} fields={fields} />
        <FormSubmitButton form={form}>Create connect key</FormSubmitButton>
      </div>
    </Dialog>
  )
}
