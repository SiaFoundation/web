import { SendReceipt } from '../_sharedWalletSend/SendReceipt'
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
import { useSignAndBroadcast } from './useSignAndBroadcast'
import { useWallets } from '../../contexts/wallets'
import { SendParams } from '../_sharedWalletSend/types'

type Props = {
  walletId: string
  params: SendParams
  onConfirm: (params: { transactionId?: string }) => void
}

const defaultValues = {
  mnemonic: '',
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

export function useSendForm({ walletId, params, onConfirm }: Props) {
  const signAndBroadcast = useSignAndBroadcast()
  const { isSeedCached, getSeedFromCacheOrForm } = useWalletCachedSeed(walletId)
  const { dataset } = useWallets()
  const wallet = dataset?.find((w) => w.id === walletId)
  const seedHash = wallet?.metadata.seedHash

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

      const { error } = await signAndBroadcast({
        seed: seedResponse.seed,
        params,
      })

      if (error) {
        triggerErrorToast(error)
        return
      }

      onConfirm({})
    },
    [getSeedFromCacheOrForm, signAndBroadcast, params, onConfirm]
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
      <SendReceipt params={params} />
    </div>
  )

  return {
    form,
    el,
    handleSubmit,
    reset: () => form.reset(defaultValues),
  }
}
