import {
  Dialog,
  ConfigFields,
  useOnInvalid,
  FormSubmitButton,
  FieldTextArea,
  Paragraph,
  Badge,
  triggerSuccessToast,
  triggerErrorToast,
  useDialogFormHelpers,
} from '@siafoundation/design-system'
import { pluralize } from '@siafoundation/units'
import { useAdminHostsBlocklistUpdate } from '@siafoundation/indexd-react'
import { adminHostsRoute, adminHostRoute } from '@siafoundation/indexd-types'
import { useMutate } from '@siafoundation/react-core'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HostData } from '../components/Data/Hosts/types'
import { useDialog } from '../contexts/dialog'

const defaultValues = {
  reason: '',
}

const cannedReasons = [
  'insufficient funds',
  'failing proofs',
  'out of storage',
  'internal errors',
  'network issues',
  'poor uptime',
  'high prices',
]

function getFields(): ConfigFields<typeof defaultValues, never> {
  return {
    reason: {
      type: 'text',
      title: 'Custom (comma separated)',
      placeholder: 'e.g. bad version, poor location',
      validation: {},
    },
  }
}

type Props = {
  hosts: HostData[] | undefined
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function HostBlocklistAddDialog({ hosts, open, onOpenChange }: Props) {
  const { closeDialog } = useDialog()
  const blocklistUpdate = useAdminHostsBlocklistUpdate()
  const mutate = useMutate()
  const [selectedReasons, setSelectedReasons] = useState<string[]>([])

  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const fields = useMemo(() => getFields(), [])

  const onInvalid = useOnInvalid(fields)

  const hostCount = hosts?.length || 0

  const onSubmit = useCallback(async () => {
    if (!hosts?.length) {
      return
    }
    const { reason } = form.getValues()
    const parsedCustom = reason
      .split(',')
      .map((r) => r.trim())
      .filter(Boolean)
    const combinedReasons = [...selectedReasons, ...parsedCustom]
    const { error } = await blocklistUpdate.put({
      payload: {
        hostKeys: hosts.map((host) => host.publicKey),
        reasons: combinedReasons,
      },
    })
    if (error) {
      triggerErrorToast({
        title: 'Error blocking hosts',
        body: error,
      })
      return
    }
    triggerSuccessToast({
      title: `Blocked ${pluralize(hosts.length, 'host')}`,
    })
    await mutate((key) => key.startsWith(adminHostsRoute))
    await Promise.all(
      hosts.map((host) =>
        mutate((key) =>
          key.startsWith(adminHostRoute.replace(':hostkey', host.publicKey)),
        ),
      ),
    )
    form.reset(defaultValues)
    setSelectedReasons([])
    closeDialog()
  }, [blocklistUpdate, closeDialog, form, hosts, mutate, selectedReasons])

  const { handleOpenChange } = useDialogFormHelpers({
    form,
    onOpenChange,
    defaultValues,
    initKey: [hosts?.map((host) => host.id).join(',')],
  })

  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedReasons([])
    }
  }, [open])

  return (
    <Dialog
      title={hostCount === 1 ? 'Block host' : 'Block hosts'}
      open={open}
      onOpenChange={handleOpenChange}
      contentVariants={{
        className: 'w-[400px]',
      }}
      onSubmit={form.handleSubmit(onSubmit, onInvalid)}
    >
      <div className="flex flex-col gap-4">
        <Paragraph size="14">
          {hostCount === 1
            ? 'Why block this host? (optional)'
            : 'Why block these hosts? (optional)'}
        </Paragraph>
        <div className="flex flex-wrap gap-2">
          {cannedReasons.map((reasonOption) => {
            const isSelected = selectedReasons.includes(reasonOption)
            return (
              <Badge
                key={reasonOption}
                size="small"
                interactive
                variant={isSelected ? 'red' : 'gray'}
                className="cursor-pointer"
                onClick={() =>
                  setSelectedReasons((prev) =>
                    prev.includes(reasonOption)
                      ? prev.filter((r) => r !== reasonOption)
                      : [...prev, reasonOption],
                  )
                }
              >
                {reasonOption}
              </Badge>
            )
          })}
        </div>
        <FieldTextArea form={form} fields={fields} name="reason" />
        <FormSubmitButton variant="red" form={form}>
          {hostCount === 1 ? 'Block host' : `Block ${hostCount} hosts`}
        </FormSubmitButton>
      </div>
    </Dialog>
  )
}
