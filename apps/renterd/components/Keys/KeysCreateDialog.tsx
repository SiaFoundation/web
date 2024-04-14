import {
  Dialog,
  triggerErrorToast,
  triggerSuccessToast,
  FieldText,
  FormSubmitButton,
  ConfigFields,
  useOnInvalid,
  Paragraph,
  Button,
} from '@siafoundation/design-system'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useDialog } from '../../contexts/dialog'
import { useS3AuthenticationSettings } from '../../hooks/useS3AuthenticationSettings'
import { useSettingUpdate } from '@siafoundation/renterd-react'
import { Reset16 } from '@carbon/icons-react'

type Props = {
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

function getDefaultValues() {
  return {
    name: generateAccessKeyId(),
    secret: generateSecretAccessKey(),
  }
}

type Values = ReturnType<typeof getDefaultValues>

function getFields({
  existingKeys,
  regenerateAccessKey,
  regenerateSecretKey,
}: {
  existingKeys: string[]
  regenerateAccessKey: () => void
  regenerateSecretKey: () => void
}): ConfigFields<Values, never> {
  return {
    name: {
      type: 'text',
      title: 'Access key ID',
      placeholder: 'my secure key',
      actions: (
        <Button
          onClick={regenerateAccessKey}
          tip="Regenerate access key ID"
          icon="contrast"
          variant="ghost"
          size="none"
          className="m-1"
        >
          <Reset16 />
        </Button>
      ),
      validation: {
        required: 'required',
        validate: {
          minLength: (value) =>
            value?.length >= 16 || 'must be at least 16 characters',
          maxLength: (value) =>
            value?.length <= 128 || 'must be at most 128 characters',
          unique: (value) =>
            !existingKeys.includes(value) || 'Name must be unique',
        },
      },
    },
    secret: {
      type: 'text',
      title: 'Secret access key',
      placeholder: '',
      actions: (
        <Button
          onClick={regenerateSecretKey}
          tip="Regenerate secret access key"
          icon="contrast"
          variant="ghost"
          size="none"
          className="m-1"
        >
          <Reset16 />
        </Button>
      ),
      validation: {
        required: 'required',
        validate: {
          exactLength: (value) =>
            value?.length === 40 || 'must be exactly 40 characters',
        },
      },
    },
  }
}

export function KeysCreateDialog({ trigger, open, onOpenChange }: Props) {
  const { closeDialog } = useDialog()
  const s3AuthenticationSettings = useS3AuthenticationSettings()
  const update = useSettingUpdate()

  const form = useForm({
    mode: 'all',
    defaultValues: getDefaultValues(),
  })

  const onSubmit = useCallback(
    async (values: Values) => {
      const v4Keypairs = {
        ...s3AuthenticationSettings.data?.v4Keypairs,
        [values.name]: values.secret,
      }
      const response = await update.put({
        params: {
          key: 's3authentication',
        },
        payload: {
          v4Keypairs,
        },
      })
      if (response.error) {
        triggerErrorToast({ title: 'Error creating key', body: response.error })
      } else {
        triggerSuccessToast({ title: 'New key created' })
        form.reset(getDefaultValues())
        closeDialog()
      }
    },
    [form, closeDialog, update, s3AuthenticationSettings.data]
  )

  const fields = useMemo(
    () =>
      getFields({
        regenerateAccessKey: () => {
          form.setValue('name', generateAccessKeyId())
        },
        regenerateSecretKey: () => {
          form.setValue('secret', generateSecretAccessKey())
        },
        existingKeys: Object.keys(
          s3AuthenticationSettings.data?.v4Keypairs || {}
        ),
      }),
    [s3AuthenticationSettings.data, form]
  )

  const onInvalid = useOnInvalid(fields)

  return (
    <Dialog
      title="Create S3 key"
      trigger={trigger}
      open={open}
      onOpenChange={(val) => {
        if (!val) {
          form.reset(getDefaultValues())
        }
        onOpenChange(val)
      }}
      contentVariants={{
        className: 'w-[400px]',
      }}
      onSubmit={form.handleSubmit(onSubmit, onInvalid)}
      controls={
        <div className="flex flex-col gap-1">
          <FormSubmitButton form={form}>Create</FormSubmitButton>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <Paragraph>Create a new S3 authentication key.</Paragraph>
        <div className="flex flex-col gap-2">
          <FieldText name="name" form={form} fields={fields} />
          <FieldText name="secret" form={form} fields={fields} />
        </div>
      </div>
    </Dialog>
  )
}

function generateAccessKeyId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 20; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

function generateSecretAccessKey() {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  let result = ''
  for (let i = 0; i < 40; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}
