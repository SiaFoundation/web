import BigNumber from 'bignumber.js'
import { WalletSendSiacoinReceipt } from './Receipt'
import { useForm } from 'react-hook-form'
import { useCallback, useMemo, useState } from 'react'
import {
  ConfigFields,
  triggerErrorToast,
  useOnInvalid,
} from '@siafoundation/design-system'
import { getFieldMnemonic, MnemonicFieldType } from '../../lib/fieldMnemonic'
import { FieldMnemonic } from '../FieldMnemonic'
import { useWalletCachedSeed } from '../../hooks/useWalletCachedSeed'

const defaultValues = {
  mnemonic: '',
}

type SendData = {
  seedHash: string
  address: string
  siacoin: BigNumber
}

type Props = {
  walletId: string
  send: (params: {
    seed: string
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
  isSeedCached,
}: {
  seedHash?: string
  mnemonicFieldType: MnemonicFieldType
  setMnemonicFieldType: (type: MnemonicFieldType) => void
  isSeedCached: boolean
}): ConfigFields<typeof defaultValues, never> {
  return {
    mnemonic: isSeedCached
      ? {
          title: 'Seed',
          type: 'text',
          validation: {},
        }
      : getFieldMnemonic({
          seedHash,
          setMnemonicFieldType,
          mnemonicFieldType,
        }),
  }
}

export function useSendSiacoinConfirmForm({
  walletId,
  send,
  data,
  fee,
  onConfirm,
}: Props) {
  const { isSeedCached, getSeedFromCacheOrForm } = useWalletCachedSeed(walletId)

  const { seedHash, address, siacoin } = data || {}
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
    isSeedCached,
  })

  const onValid = useCallback(
    async (values: typeof defaultValues) => {
      const seedResponse = getSeedFromCacheOrForm(values)
      if (seedResponse.error) {
        triggerErrorToast(seedResponse.error)
        return
      }

      const { transactionId, error } = await send({
        seed: seedResponse.seed,
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
    [getSeedFromCacheOrForm, send, address, siacoin, onConfirm]
  )

  const onInvalid = useOnInvalid(fields)

  const handleSubmit = useMemo(
    () => form.handleSubmit(onValid, onInvalid),
    [form, onValid, onInvalid]
  )

  const el = (
    <div className="flex flex-col gap-4">
      <FieldMnemonic
        walletId={walletId}
        name="mnemonic"
        form={form}
        field={fields.mnemonic}
        actionText="complete the transaction"
      />
      <WalletSendSiacoinReceipt address={address} siacoin={siacoin} fee={fee} />
    </div>
  )

  return {
    form,
    el,
    handleSubmit,
    reset: () => form.reset(defaultValues),
  }
}
