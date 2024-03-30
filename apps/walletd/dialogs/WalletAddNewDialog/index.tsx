/* eslint-disable react/no-unescaped-entities */
import {
  Paragraph,
  Button,
  Dialog,
  ConfigFields,
  FieldText,
  triggerErrorToast,
  FormSubmitButton,
  FieldTextArea,
  copyToClipboard,
} from '@siafoundation/design-system'
import { Redo16, Copy16 } from '@siafoundation/react-icons'
import { MouseEvent, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { WalletMetadata, useWalletAdd } from '@siafoundation/react-walletd'
import { useDialog } from '../../contexts/dialog'
import { useWallets } from '../../contexts/wallets'
import { walletAddTypes } from '../../config/walletTypes'
import { blake2bHex } from 'blakejs'
import { SeedLayout } from '../SeedLayout'
import { SeedIcon } from '@siafoundation/react-icons'
import { getSDK } from '@siafoundation/sdk'

const defaultValues = {
  name: '',
  description: '',
  mnemonic: '',
  hasCopied: false,
}

type Values = typeof defaultValues

function getFields({
  walletNames,
  copySeed,
}: {
  walletNames: string[]
  copySeed: () => void
}): ConfigFields<Values, never> {
  return {
    name: {
      type: 'text',
      title: 'Name',
      placeholder: 'name',
      validation: {
        validate: {
          unique: (value: string) =>
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
      onClick: (e) => {
        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        ;(e as MouseEvent<HTMLTextAreaElement>).currentTarget.select()
        copySeed()
      },
      readOnly: true,
      placeholder: '',
      validation: {
        required: 'required',
        validate: {
          valid: (value: string) => {
            const { error } = getSDK().wallet.keyPairFromSeedPhrase(value, 0)
            return !error || 'seed should be 12 word BIP39 mnemonic'
          },
          copied: (_, values) => values.hasCopied || 'Copy seed to continue',
        },
      },
    },
    hasCopied: {
      type: 'boolean',
      title: '',
      validation: {},
    },
  }
}

export type WalletAddNewDialogParams = void

type Props = {
  params?: WalletAddNewDialogParams
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function WalletAddNewDialog({ trigger, open, onOpenChange }: Props) {
  const { openDialog } = useDialog()
  const walletAdd = useWalletAdd()
  const form = useForm({
    mode: 'all',
    defaultValues,
  })
  const mnemonic = form.watch('mnemonic')

  const copySeed = useCallback(() => {
    copyToClipboard(mnemonic, 'seed')
    form.setValue('hasCopied', true, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
    form.clearErrors(['mnemonic'])
  }, [mnemonic, form])

  const regenerateMnemonic = useCallback(async () => {
    const { phrase } = getSDK().wallet.generateSeedPhrase()
    form.setValue('hasCopied', false)
    form.setValue('mnemonic', phrase)
    form.clearErrors(['hasCopied', 'mnemonic'])
  }, [form])

  useEffect(() => {
    if (open) {
      regenerateMnemonic()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const { dataset } = useWallets()
  const walletNames = dataset?.map((w) => w.name) || []

  const fields = getFields({ walletNames, copySeed })

  const onSubmit = useCallback(
    async (values: Values) => {
      const mnemonic = values.mnemonic.trim()
      const mnemonicHash = blake2bHex(mnemonic)
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
          title: 'Error creating wallet',
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
      title={walletAddTypes.walletAddNew.title}
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
          {walletAddTypes.walletAddNew.description}
        </Paragraph>
        <FieldText name="name" form={form} fields={fields} />
        <FieldTextArea name="description" form={form} fields={fields} />
        <SeedLayout
          icon={<SeedIcon />}
          description={
            <>
              This is the wallet's seed mnemonic. Make sure to save it somewhere
              secure.
            </>
          }
        >
          <div className="flex flex-col gap-2">
            <FieldTextArea form={form} fields={fields} name="mnemonic" />
            <div className="flex gap-2">
              <Button className="flex-1" onClick={regenerateMnemonic}>
                <Redo16 />
                Regenerate
              </Button>
              <Button className="flex-1" onClick={copySeed}>
                <Copy16 />
                Copy to clipboard
              </Button>
            </div>
          </div>
        </SeedLayout>
      </div>
    </Dialog>
  )
}
