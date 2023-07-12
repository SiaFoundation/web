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
import { blake2bHex } from 'blakejs'
import { SeedLayout } from '../SeedLayout'
import { SeedIcon } from '../SeedIcon'
import { walletAddTypes } from '../../config/walletTypes'
import { getWalletWasm } from '../../lib/wasm'

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
          valid: (value: string) => {
            const { error } = getWalletWasm().seedFromPhrase(value)
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
    async (values) => {
      const id = uuidv4()
      const { seed } = getWalletWasm().seedFromPhrase(values.mnemonic)
      const seedHash = blake2bHex(seed)
      const response = await walletAdd.put({
        params: {
          id,
        },
        payload: {
          type: 'seed',
          seedHash,
          name: values.name,
          createdAt: new Date().getTime(),
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
