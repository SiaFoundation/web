import {
  Paragraph,
  Dialog,
  triggerErrorToast,
  triggerSuccessToast,
  ConfigFields,
  useOnInvalid,
  FormSubmitButton,
  FieldText,
  Code,
  useDialogFormHelpers,
} from '@siafoundation/design-system'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useDialog } from '../contexts/dialog'
import { useBucketDelete } from '@siafoundation/renterd-react'

const defaultValues = {
  name: '',
}

type Values = typeof defaultValues

function getFields(name: string): ConfigFields<Values, never> {
  return {
    name: {
      type: 'text',
      title: 'Name',
      placeholder: name,
      validation: {
        required: 'required',
        validate: {
          notDefault: () =>
            name !== 'default' || 'cannot delete default bucket',
          equals: (value) => value === name || 'bucket name does not match',
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

export function FilesBucketDeleteDialog({
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { id: name } = useDialog()

  const bucketDelete = useBucketDelete()
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
      const response = await bucketDelete.delete({
        params: {
          name: values.name,
        },
      })
      if (response.error) {
        triggerErrorToast({
          title: 'Error deleting bucket',
          body: response.error,
        })
      } else {
        triggerSuccessToast({ title: 'Bucket permanently deleted' })
        closeAndReset()
      }
    },
    [bucketDelete, closeAndReset]
  )

  const fields = useMemo(() => getFields(name), [name])

  const onInvalid = useOnInvalid(fields)

  return (
    <Dialog
      title="Delete Bucket"
      trigger={trigger}
      open={open}
      onOpenChange={handleOpenChange}
      contentVariants={{
        className: 'w-[400px]',
      }}
      onSubmit={form.handleSubmit(onSubmit, onInvalid)}
    >
      <div className="flex flex-col gap-4">
        <Paragraph size="14">
          Before you delete a bucket you must ensure that it is empty. Re-enter
          the bucket name to confirm the removal.
        </Paragraph>
        <div>
          <Code color="gray">{name}</Code>
        </div>
        <FieldText name="name" form={form} fields={fields} autoComplete="off" />
        <FormSubmitButton variant="red" form={form}>
          Delete
        </FormSubmitButton>
      </div>
    </Dialog>
  )
}
