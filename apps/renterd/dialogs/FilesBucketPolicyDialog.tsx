import {
  Paragraph,
  Dialog,
  triggerErrorToast,
  triggerSuccessToast,
  ConfigFields,
  useOnInvalid,
  FormSubmitButton,
  FieldSelect,
} from '@siafoundation/design-system'
import { useCallback, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useDialog } from '../contexts/dialog'
import { useBucket, useBucketPolicyUpdate } from '@siafoundation/react-renterd'

const defaultValues = {
  visibility: 'public',
}

function getFields(name: string): ConfigFields<typeof defaultValues, never> {
  return {
    visibility: {
      type: 'text',
      title: 'Read Access',
      placeholder: name,
      validation: {
        required: 'required',
      },
      options: [
        {
          label: 'Public',
          value: 'public',
        },
        {
          label: 'Private',
          value: 'private',
        },
      ],
    },
  }
}

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function FilesBucketPolicyDialog({
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { id: name, closeDialog } = useDialog()
  const bucket = useBucket({
    disabled: !open,
    params: {
      name: name,
    },
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })

  const policyUpdate = useBucketPolicyUpdate()
  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  useEffect(() => {
    form.reset({
      visibility: bucket.data?.policy?.publicReadAccess ? 'public' : 'private',
    })
  }, [form, bucket.data])

  const onSubmit = useCallback(
    async (values: typeof defaultValues) => {
      const response = await policyUpdate.put({
        params: {
          name,
        },
        payload: {
          policy: {
            publicReadAccess: values.visibility === 'public',
          },
        },
      })
      if (response.error) {
        triggerErrorToast({
          title: 'Error updating bucket policy',
          body: response.error,
        })
      } else {
        triggerSuccessToast({ title: 'Bucket policy has been updated' })
        form.reset()
        closeDialog()
      }
    },
    [form, name, policyUpdate, closeDialog]
  )

  const fields = useMemo(() => getFields(name), [name])

  const onInvalid = useOnInvalid(fields)

  return (
    <Dialog
      title={`Change Policy: ${name}`}
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
          {`Update the bucket's policy to set read access to either private or public. Files in public read access buckets can be accessed without authentication via the S3 API.`}
        </Paragraph>
        <FieldSelect name="visibility" form={form} fields={fields} />
        <FormSubmitButton variant="accent" form={form}>
          Update policy
        </FormSubmitButton>
      </div>
    </Dialog>
  )
}
