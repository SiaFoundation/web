import {
  Paragraph,
  Dialog,
  triggerErrorToast,
  triggerSuccessToast,
  ConfigFields,
  useOnInvalid,
  FormSubmitButton,
  FieldText,
} from '@siafoundation/design-system'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useDialog } from '../contexts/dialog'
import { useBucketCreate } from '@siafoundation/renterd-react'

const defaultValues = {
  name: '',
}

function getFields(): ConfigFields<typeof defaultValues, never> {
  return {
    name: {
      type: 'text',
      title: 'Name',
      placeholder: 'photos, backups, etc',
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

export function FilesBucketCreateDialog({
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { closeDialog } = useDialog()

  const bucketCreate = useBucketCreate()
  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const onSubmit = useCallback(
    async (values: typeof defaultValues) => {
      const response = await bucketCreate.post({
        payload: {
          name: values.name,
        },
      })
      if (response.error) {
        triggerErrorToast({
          title: 'Error creating bucket',
          body: response.error,
        })
      } else {
        triggerSuccessToast({ title: 'Bucket created' })
        form.reset()
        closeDialog()
      }
    },
    [form, bucketCreate, closeDialog]
  )

  const fields = useMemo(() => getFields(), [])

  const onInvalid = useOnInvalid(fields)

  return (
    <Dialog
      title="Create Bucket"
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
          A bucket is an isolated collection of files.
        </Paragraph>
        <FieldText name="name" form={form} fields={fields} autoComplete="off" />
        <FormSubmitButton form={form}>Create bucket</FormSubmitButton>
      </div>
    </Dialog>
  )
}
