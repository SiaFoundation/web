/* eslint-disable react/no-unescaped-entities */
import {
  ConfigFields,
  Dialog,
  FormSubmitButton,
  useDialogFormHelpers,
  useOnInvalid,
} from '@siafoundation/design-system'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getWalletWasm } from '../lib/wasm'
import { useWallets } from '../contexts/wallets'
import { getFieldMnemonic, MnemonicFieldType } from '../lib/fieldMnemonic'
import { FieldMnemonic } from './FieldMnemonic'

export type WalletUnlockDialogParams = {
  walletId: string
}

type Props = {
  params?: WalletUnlockDialogParams
  trigger?: React.ReactNode
  open: boolean
  onOpenChange: (val: boolean) => void
}

function getDefaultValues() {
  return {
    mnemonic: '',
  }
}

function getFields({
  seedHash,
  mnemonicFieldType,
  setMnemonicFieldType,
}: {
  seedHash?: string
  mnemonicFieldType: MnemonicFieldType
  setMnemonicFieldType: (type: MnemonicFieldType) => void
}): ConfigFields<ReturnType<typeof getDefaultValues>, never> {
  return {
    mnemonic: getFieldMnemonic({
      seedHash,
      setMnemonicFieldType,
      mnemonicFieldType,
    }),
  }
}

export function WalletUnlockDialog({
  params,
  trigger,
  open,
  onOpenChange,
}: Props) {
  const { walletId } = params || {}
  const { dataset, saveWalletSeed } = useWallets()
  const wallet = dataset?.find((w) => w.id === walletId)
  const defaultValues = getDefaultValues()
  const [mnemonicFieldType, setMnemonicFieldType] =
    useState<MnemonicFieldType>('password')
  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const { handleOpenChange, closeAndReset } = useDialogFormHelpers({
    form,
    onOpenChange,
    defaultValues,
  })

  const fields = getFields({
    seedHash: wallet?.seedHash,
    mnemonicFieldType,
    setMnemonicFieldType,
  })

  const onValid = useCallback(
    (values: typeof defaultValues) => {
      const { seed } = getWalletWasm().seedFromPhrase(values.mnemonic)
      saveWalletSeed(walletId, seed)
      closeAndReset()
    },
    [walletId, saveWalletSeed, closeAndReset]
  )

  const onInvalid = useOnInvalid(fields)

  return (
    <Dialog
      title={`Unlock wallet: ${wallet?.name}`}
      trigger={trigger}
      open={open}
      onOpenChange={handleOpenChange}
      contentVariants={{
        className: 'w-[500px]',
      }}
      onSubmit={form.handleSubmit(onValid, onInvalid)}
      controls={
        <div className="flex justify-end">
          <FormSubmitButton form={form} variant="accent" size="medium">
            Continue
          </FormSubmitButton>
        </div>
      }
    >
      <FieldMnemonic
        walletId={wallet?.id}
        form={form}
        fields={fields}
        name="mnemonic"
      />
    </Dialog>
  )
}
