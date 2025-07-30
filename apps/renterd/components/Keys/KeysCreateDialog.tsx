import {
  Dialog,
  triggerErrorToast,
  triggerSuccessToast,
  FieldText,
  FormSubmitButton,
  ConfigFields,
  useOnInvalid,
  Button,
} from '@siafoundation/design-system'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useDialog } from '../../contexts/dialog'
import {
  useSettingsS3,
  useSettingsS3Update,
} from '@siafoundation/renterd-react'
import { Reset16 } from '@siafoundation/react-icons'

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
          minLength: (value: string) =>
            value?.length >= 16 || 'must be at least 16 characters',
          maxLength: (value: string) =>
            value?.length <= 128 || 'must be at most 128 characters',
          unique: (value: string) =>
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
  const settingsS3 = useSettingsS3()
  const settingsS3Update = useSettingsS3Update()

  const form = useForm({
    mode: 'all',
    defaultValues: getDefaultValues(),
  })

  const onSubmit = useCallback(
    async (values: Values) => {
      if (!settingsS3.data) {
        triggerErrorToast({ title: 'Error creating key' })
        return
      }
      const v4Keypairs = {
        ...settingsS3.data?.authentication.v4Keypairs,
        [values.name]: values.secret,
      }
      const response = await settingsS3Update.put({
        payload: {
          ...settingsS3.data,
          authentication: {
            ...settingsS3.data.authentication,
            v4Keypairs,
          },
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
    [form, closeDialog, settingsS3Update, settingsS3.data],
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
          settingsS3.data?.authentication.v4Keypairs || {},
        ),
      }),
    [settingsS3.data, form],
  )

  const onInvalid = useOnInvalid(fields)

  return (
    <Dialog
      title="Create S3 keypair"
      description="Create a new S3 authentication keypair."
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
