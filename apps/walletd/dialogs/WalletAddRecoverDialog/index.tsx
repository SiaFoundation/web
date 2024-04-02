import {
  Paragraph,
  Button,
  Dialog,
  ConfigFields,
  FieldText,
  triggerErrorToast,
  FormSubmitButton,
  FieldTextArea,
} from '@siafoundation/design-system'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useDialog } from '../../contexts/dialog'
import { useWallets } from '../../contexts/wallets'
import { WalletMetadata, useWalletAdd } from '@siafoundation/react-walletd'
import { blake2bHex } from 'blakejs'
import { SeedLayout } from '../SeedLayout'
import { SeedIcon } from '@siafoundation/react-icons'
import { walletAddTypes } from '../../config/walletTypes'
import { getSDK } from '@siafoundation/sdk'

const defaultValues = {
  name: '',
  description: '',
  mnemonic: '',
}

type Values = typeof defaultValues

function getFields({
  walletNames,
}: {
  walletNames: string[]
}): ConfigFields<Values, never> {
  return {
    name: {
      type: 'text',
      title: 'Name',
      placeholder: 'name',
      validation: {
        validate: {
          unique: (value) =>
            !walletNames.includes(value) || 'name is already in use',
        },
        required: 'required',
        maxLength: 30,
      },
    },
    description: {
      type: 'text',
      title: 'Description',
      placeholder: 'Optional description or notes about the wallet.',
      validation: {
        maxLength: 200,
      },
    },
    mnemonic: {
      type: 'text',
      title: 'Seed',
      placeholder:
        'island submit vague scrub exhibit cherry front spoon crop debate filter virus',
      validation: {
        required: 'required',
        validate: {
          valid: (value: string) => {
            const { error } = getSDK().wallet.keyPairFromSeedPhrase(value, 0)
            return !error || 'seed should be 12 word BIP39 mnemonic'
          },
        },
      },
    },
  }
}

export type WalletAddRecoverDialogParams = void

type Props = {
  params?: WalletAddRecoverDialogParams
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function WalletAddRecoverDialog({ trigger, open, onOpenChange }: Props) {
  const { openDialog } = useDialog()
  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const { dataset } = useWallets()
  const walletNames = dataset?.map((w) => w.name) || []
  const fields = getFields({ walletNames })
  const walletAdd = useWalletAdd()

  const onSubmit = useCallback(
    async (values: Values) => {
      const mnemonicHash = blake2bHex(values.mnemonic)
      const metadata: WalletMetadata = {
        type: 'seed',
        mnemonicHash,
      }
      const response = await walletAdd.post({
        payload: {
          name: values.name,
          description: values.description,
          metadata,
        },
      })
      if (response.error) {
        triggerErrorToast({
          title: 'Error adding wallet',
          body: response.error,
        })
      } else {
        openDialog('walletAddressesGenerate', {
          walletId: response.data.id,
        })
        form.reset(defaultValues)
      }
    },
    [form, openDialog, walletAdd]
  )

  return (
    <Dialog
      title={walletAddTypes.walletAddRecover.title}
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      contentVariants={{
        className: 'w-[400px]',
      }}
      onSubmit={form.handleSubmit(onSubmit)}
      controls={
        <div className="flex gap-2 px-1">
          <Button
            size="medium"
            onClick={() => {
              openDialog('walletAddType')
            }}
          >
            back
          </Button>
          <div className="flex-1" />
          <FormSubmitButton size="medium" form={form}>
            Add wallet
          </FormSubmitButton>
        </div>
      }
    >
      <div className="flex flex-col gap-4 mb-2">
        <Paragraph size="14" color="subtle">
          {walletAddTypes.walletAddRecover.description}
        </Paragraph>
        <FieldText name="name" form={form} fields={fields} />
        <FieldTextArea name="description" form={form} fields={fields} />
        <SeedLayout
          icon={<SeedIcon />}
          description={
            <>Enter the seed mnemonic for the wallet you are recovering.</>
          }
        >
          <FieldTextArea form={form} fields={fields} name="mnemonic" />
        </SeedLayout>
      </div>
    </Dialog>
  )
}
