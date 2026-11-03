import {
  Paragraph,
  Dialog,
  triggerSuccessToast,
  useOnInvalid,
  FormSubmitButton,
  FieldNumber,
  triggerErrorToast,
  ConfigFields,
} from '@siafoundation/design-system'
import { useAdminAccountSlabsPrune } from '@siafoundation/indexd-react'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useDialog } from '../contexts/dialog'
import { useMutate } from '@siafoundation/react-core'
import {
  adminAccountRoute,
  adminAccountsRoute,
} from '@siafoundation/indexd-types'
import BigNumber from 'bignumber.js'

const maxAgeHours = 1_000_000

const defaultValues = {
  minAgeHours: undefined as undefined | BigNumber,
}

type Values = typeof defaultValues

function getFields(): ConfigFields<Values, never> {
  return {
    minAgeHours: {
      type: 'number',
      title: 'Pinned more than',
      units: 'hours ago',
      decimalsLimit: 0,
      placeholder: '72',
      validation: {
        validate: {
          // Negative ages put the cutoff in the future, and huge ones make
          // the cutoff an invalid date. Small ages are allowed but can prune
          // the slabs of an upload that is still in progress.
          range: (value) =>
            !value ||
            (value.gte(0) && value.lte(maxAgeHours)) ||
            'must be between 0 and 1,000,000',
        },
      },
    },
  }
}

type Props = {
  id: string | undefined
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function AccountSlabsPruneDialog({
  id,
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { closeDialog } = useDialog()
  const pruneSlabs = useAdminAccountSlabsPrune()
  const fields = useMemo(() => getFields(), [])
  const mutate = useMutate()

  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const onSubmit = useCallback(
    async (values: Values) => {
      if (!id) {
        return
      }
      // Leave out before when no age is set so indexd uses its default.
      const before = values.minAgeHours
        ? new Date(
            Date.now() - values.minAgeHours.times(60 * 60 * 1000).toNumber(),
          ).toISOString()
        : undefined
      const response = await pruneSlabs.post({
        params: {
          accountkey: id,
          ...(before ? { before } : {}),
        },
      })
      if (response.error) {
        triggerErrorToast({
          title: 'Failed to prune slabs',
          body: response.error,
        })
      } else {
        triggerSuccessToast({ title: 'Slabs pruned' })
        // Pruning lowers the account's pinned data.
        const accountRoute = adminAccountRoute.replace(':accountkey', id)
        mutate(
          (key) =>
            key.startsWith(adminAccountsRoute) || key.startsWith(accountRoute),
        )
        form.reset()
        closeDialog()
      }
    },
    [form, id, pruneSlabs, closeDialog, mutate],
  )

  const onInvalid = useOnInvalid(fields)

  return (
    <Dialog
      title="Prune orphaned slabs"
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
          Prune the account&apos;s pinned slabs that no object references. Only
          slabs pinned before the cutoff are pruned. Leave it empty to use the
          default of 72 hours.
        </Paragraph>
        <Paragraph size="14">
          A small value can prune the slabs of an upload that is still in
          progress.
        </Paragraph>
        <FieldNumber name="minAgeHours" form={form} fields={fields} />
        <FormSubmitButton form={form}>Prune slabs</FormSubmitButton>
      </div>
    </Dialog>
  )
}
