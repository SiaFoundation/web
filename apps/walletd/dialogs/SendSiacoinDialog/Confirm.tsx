import BigNumber from 'bignumber.js'
import { WalletSendSiacoinReceipt } from './Receipt'
import { useForm } from 'react-hook-form'
import { useCallback, useMemo, useState } from 'react'
import {
  ConfigFields,
  FieldText,
  triggerErrorToast,
  useOnInvalid,
} from '@siafoundation/design-system'
import { getFieldMnemonic, MnemonicFieldType } from '../../lib/fieldMnemonic'

const defaultValues = {
  mnemonic: '',
}

type SendData = {
  seedHash: string
  address: string
  siacoin: BigNumber
  includeFee: boolean
}

type Props = {
  send: (params: {
    mnemonic: string
    address: string
    siacoin: BigNumber
  }) => Promise<{ transactionId?: string; error?: string }>
  data: SendData
  fee: BigNumber
  onConfirm: (params: { transactionId?: string }) => void
}

function getFields({
  seedHash,
  mnemonicFieldType,
  setMnemonicFieldType,
}: {
  seedHash?: string
  mnemonicFieldType: MnemonicFieldType
  setMnemonicFieldType: (type: MnemonicFieldType) => void
}): ConfigFields<typeof defaultValues, never> {
  return {
    mnemonic: getFieldMnemonic({
      seedHash,
      setMnemonicFieldType,
      mnemonicFieldType,
    }),
  }
}

export function useSendSiacoinConfirmForm({
  send,
  data,
  fee,
  onConfirm,
}: Props) {
  const { seedHash, address, siacoin, includeFee } = data || {}
  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const [mnemonicFieldType, setMnemonicFieldType] =
    useState<MnemonicFieldType>('password')
  const fields = getFields({
    mnemonicFieldType,
    setMnemonicFieldType,
    seedHash,
  })

  const onValid = useCallback(
    async (values: typeof defaultValues) => {
      const { transactionId, error } = await send({
        mnemonic: values.mnemonic,
        address,
        siacoin,
      })

      if (error) {
        triggerErrorToast(error)
        return
      }

      onConfirm({
        transactionId,
      })
    },
    [send, onConfirm, address, siacoin]
  )

  const onInvalid = useOnInvalid(fields)

  const handleSubmit = useMemo(
    () => form.handleSubmit(onValid, onInvalid),
    [form, onValid, onInvalid]
  )

  const el = (
    <div className="flex flex-col gap-4">
      <FieldText form={form} field={fields.mnemonic} name="mnemonic" />
      <WalletSendSiacoinReceipt
        address={address}
        siacoin={siacoin}
        fee={fee}
        includeFee={includeFee}
      />
    </div>
  )

  return {
    form,
    el,
    handleSubmit,
    reset: () => form.reset(defaultValues),
  }
}
