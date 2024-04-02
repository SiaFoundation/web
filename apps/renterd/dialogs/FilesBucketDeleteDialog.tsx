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
} from '@siafoundation/design-system'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useDialog } from '../contexts/dialog'
import { useBucketDelete } from '@siafoundation/react-renterd'

const defaultValues = {
  name: '',
}

function getFields(name: string): ConfigFields<typeof defaultValues, never> {
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
  const { id: name, closeDialog } = useDialog()

  const bucketDelete = useBucketDelete()
  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const onSubmit = useCallback(
    async (values: typeof defaultValues) => {
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
        form.reset()
        closeDialog()
      }
    },
    [form, bucketDelete, closeDialog]
  )

  const fields = useMemo(() => getFields(name), [name])

  const onInvalid = useOnInvalid(fields)

  return (
    <Dialog
      title="Delete Bucket"
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
