import { SendReceiptV1 } from '../../_sharedWalletSendV1/SendReceiptV1'
import { useForm } from 'react-hook-form'
import { useCallback, useMemo, useState } from 'react'
import {
  ConfigFields,
  triggerErrorToast,
  useOnInvalid,
} from '@siafoundation/design-system'
import { getFieldMnemonic, MnemonicFieldType } from '../../../lib/fieldMnemonic'
import { FieldMnemonic } from '../../FieldMnemonic'
import { useWalletCachedSeed } from '../../../hooks/useWalletCachedSeed'
import { useSignAndBroadcastV1 } from './useSignAndBroadcastV1'
import { useWallets } from '../../../contexts/wallets'
import { SendParamsV1 } from '../../_sharedWalletSendV1/typesV1'

type Props = {
  walletId: string
  params: SendParamsV1
  onConfirm: (params: { transactionId?: string }) => void
}

const defaultValues = {
  mnemonic: '',
}

type Values = typeof defaultValues

function getFields({
  mnemonicHash,
  mnemonicFieldType,
  setMnemonicFieldType,
  isSeedCached,
}: {
  mnemonicHash?: string
  mnemonicFieldType: MnemonicFieldType
  setMnemonicFieldType: (type: MnemonicFieldType) => void
  isSeedCached: boolean
}): ConfigFields<Values, never> {
  return {
    mnemonic: isSeedCached
      ? {
          title: 'Seed',
          type: 'text',
          validation: {},
        }
      : getFieldMnemonic({
          mnemonicHash,
          setMnemonicFieldType,
          mnemonicFieldType,
        }),
  }
}

export function useSendFormV1({ walletId, params, onConfirm }: Props) {
  const signAndBroadcast = useSignAndBroadcastV1()
  const { isSeedCached } = useWalletCachedSeed(walletId)
  const { dataset } = useWallets()
  const wallet = dataset?.find((w) => w.id === walletId)
  const mnemonicHash = wallet?.metadata.mnemonicHash

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
        mnemonicHash,
        isSeedCached,
      }),
    [mnemonicFieldType, setMnemonicFieldType, mnemonicHash, isSeedCached],
  )

  const onValid = useCallback(
    async (values: Values) => {
      const { error } = await signAndBroadcast({
        mnemonic: wallet.state.mnemonic || values.mnemonic,
        params,
      })

      if (error) {
        triggerErrorToast({ title: error })
        return
      }

      onConfirm({})
    },
    [signAndBroadcast, params, onConfirm, wallet],
  )

  const onInvalid = useOnInvalid(fields)

  const handleSubmit = useMemo(
    () => form.handleSubmit(onValid, onInvalid),
    [form, onValid, onInvalid],
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
      <SendReceiptV1 params={params} />
    </div>
  )

  return {
    form,
    el,
    handleSubmit,
    reset: () => form.reset(defaultValues),
  }
}
