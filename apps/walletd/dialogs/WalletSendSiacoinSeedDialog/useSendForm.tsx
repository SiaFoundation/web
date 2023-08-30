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
import { useSend } from './useSend'
import { useWallets } from '../../contexts/wallets'

const defaultValues = {
  mnemonic: '',
}

type Props = {
  walletId: string
  data: {
    address: string
    siacoin: BigNumber
    fee: BigNumber
  }
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

export function useSendForm({ walletId, data, onConfirm }: Props) {
  const send = useSend()
  const { isSeedCached, getSeedFromCacheOrForm } = useWalletCachedSeed(walletId)
  const { dataset } = useWallets()
  const wallet = dataset?.find((w) => w.id === walletId)
  const seedHash = wallet?.seedHash

  const { address, siacoin, fee } = data || {}
  const form = useForm({
    mode: 'all',
    defaultValues,
  })

  const [mnemonicFieldType, setMnemonicFieldType] =
    useState<MnemonicFieldType>('password')
  const fields = useMemo(
    () =>
      getFields({
        mnemonicFieldType,
        setMnemonicFieldType,
        seedHash,
        isSeedCached,
      }),
    [mnemonicFieldType, setMnemonicFieldType, seedHash, isSeedCached]
  )

  const onValid = useCallback(
    async (values: typeof defaultValues) => {
      const seedResponse = getSeedFromCacheOrForm(values)
      if (seedResponse.error) {
        triggerErrorToast(seedResponse.error)
        return
      }

      const { error } = await send({
        seed: seedResponse.seed,
        address,
        siacoin,
        fee,
      })

      if (error) {
        triggerErrorToast(error)
        return
      }

      onConfirm({})
    },
    [getSeedFromCacheOrForm, send, address, fee, siacoin, onConfirm]
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
        fields={fields}
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
