import {
  Button,
  FormSubmitButton,
  Text,
  useOnInvalid,
} from '@siafoundation/design-system'
import {
  useFormInit,
  useFormServerSynced,
  useFormChangeCount,
  type ConfigFields,
} from '@siafoundation/design-system'
import { SidePanel } from './SidePanel'
import { useForm, type FieldValues, type UseFormReturn } from 'react-hook-form'
import { useCallback } from 'react'
import { Reset16, Save16 } from '@siafoundation/react-icons'

export type EditablePanelProps<Values extends FieldValues> = {
  heading: React.ReactNode
  onClose?: () => void
  remoteValues: Values | undefined
  fields: ConfigFields<Values, never>
  onSave: (values: Values) => Promise<void>
  actionsLeft?: React.ReactNode
  actionsRight?: React.ReactNode
  render: (
    form: UseFormReturn<Values>,
    fields: ConfigFields<Values, never>,
  ) => React.ReactNode
}

export function EditablePanel<Values extends FieldValues>({
  heading,
  onClose,
  remoteValues,
  fields,
  onSave,
  actionsLeft,
  actionsRight,
  render,
}: EditablePanelProps<Values>) {
  const form = useForm<Values>({ mode: 'all' })
  useFormInit({ form, remoteValues })
  useFormServerSynced({ form, remoteValues })
  const { changeCount } = useFormChangeCount({ form })
  const hasChanges = changeCount > 0

  const onSubmit = useCallback(
    async (values: Values) => {
      await onSave(values)
      form.reset(values)
    },
    [onSave, form],
  )

  const onInvalid = useOnInvalid(fields)

  return (
    <SidePanel
      onClose={onClose}
      heading={heading}
      onSubmit={form.handleSubmit(onSubmit, onInvalid)}
      actions={
        <div className="flex items-center justify-between gap-2 w-full">
          {actionsLeft}
          <div className="flex items-center gap-2">
            {hasChanges ? (
              <Text color="subtle" size="12">
                {changeCount} change{changeCount === 1 ? '' : 's'}
              </Text>
            ) : null}
            <Button
              onClick={() => form.reset(remoteValues)}
              variant="ghost"
              disabled={!hasChanges}
              tip="Reset all changes"
            >
              <Reset16 />
            </Button>
            <FormSubmitButton
              variant={form.formState.isDirty ? 'accent' : 'gray'}
              size="small"
              form={form}
              requireChanges
            >
              <Save16 />
            </FormSubmitButton>
          </div>
          {actionsRight}
        </div>
      }
    >
      {render(form, fields)}
    </SidePanel>
  )
}
