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
import { v4 as uuidv4 } from 'uuid'
import { useWalletAdd } from '@siafoundation/react-walletd'
import * as bip39 from 'bip39'
import { blake2bHex } from 'blakejs'
import { SeedLayout } from '../SeedLayout'
import { SeedIcon } from '../SeedIcon'
import { walletAddTypes } from '../../config/walletTypes'

const defaultValues = {
  name: '',
  description: '',
  mnemonic: '',
}

function getFields({
  walletNames,
}: {
  walletNames: string[]
}): ConfigFields<typeof defaultValues, never> {
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
          valid: (value: string) =>
            bip39.validateMnemonic(value) ||
            'seed should be 12 word BIP39 mnemonic',
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
    async (values) => {
      const id = uuidv4()
      const seed = bip39.mnemonicToSeedSync(values.mnemonic)
      const seedHash = blake2bHex(seed)
      const response = await walletAdd.put({
        params: {
          id,
        },
        payload: {
          type: 'seed',
          seedHash,
          name: values.name,
          description: values.description,
        },
      })
      if (response.error) {
        triggerErrorToast(response.error)
      } else {
        openDialog('walletAddressesGenerate', {
          walletId: id,
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
        <FieldText name="name" form={form} field={fields.name} />
        <FieldTextArea
          name="description"
          form={form}
          field={fields.description}
        />
        <SeedLayout
          icon={<SeedIcon />}
          description={
            <>Enter the seed mnemonic for the wallet you are recovering.</>
          }
        >
          <div className="flex flex-col gap-2 py-2">
            <FieldTextArea
              form={form}
              field={fields.mnemonic}
              name="mnemonic"
            />
          </div>
        </SeedLayout>
      </div>
    </Dialog>
  )
}
